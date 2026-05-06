"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slug";

const MAX_COVER_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (cloudName && apiKey && apiSecret) {
    return { cloudName, apiKey, apiSecret };
  }

  const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();
  if (!cloudinaryUrl) {
    throw new Error("CLOUDINARY_URL is not set");
  }

  const match = cloudinaryUrl.match(/^cloudinary:\/\/([^:]+):([^@]+)@([^/?#]+)/);
  if (!match) {
    throw new Error(
      "CLOUDINARY_URL must use cloudinary://<api_key>:<api_secret>@<cloud_name>"
    );
  }

  return {
    apiKey: decodeURIComponent(match[1]),
    apiSecret: decodeURIComponent(match[2]),
    cloudName: decodeURIComponent(match[3]),
  };
}

function signCloudinaryParams(
  params: Record<string, string | number>,
  apiSecret: string
) {
  const stringToSign = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1")
    .update(`${stringToSign}${apiSecret}`)
    .digest("hex");
}

function getCloudinaryPublicId(url: string | null) {
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (parsed.hostname !== "res.cloudinary.com") return null;

  const uploadPath = parsed.pathname.split("/image/upload/")[1];
  if (!uploadPath) return null;

  const parts = uploadPath.split("/");
  const versionIndex = parts.findIndex((part) => /^v\d+$/.test(part));
  const publicIdParts = parts.slice(versionIndex >= 0 ? versionIndex + 1 : 0);
  const publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "");

  return publicId || null;
}

async function deleteCloudinaryImage(url: string | null) {
  const publicId = getCloudinaryPublicId(url);
  if (!publicId) return;

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000).toString();
  const signature = signCloudinaryParams(
    { public_id: publicId, timestamp },
    apiSecret
  );

  const deleteData = new FormData();
  deleteData.append("public_id", publicId);
  deleteData.append("api_key", apiKey);
  deleteData.append("timestamp", timestamp);
  deleteData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      body: deleteData,
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Cloudinary delete failed: ${message}`);
  }
}

function parseList(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return value
    .toString()
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseDate(value: FormDataEntryValue | null): Date | null {
  if (!value) return null;
  const s = value.toString().trim();
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function getUploadedCover(formData: FormData) {
  const file = formData.get("coverFile");
  if (!(file instanceof File) || file.size === 0) return null;
  return file;
}

async function saveProjectCover(file: File, title: string) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Cover image must be a JPG, PNG, WEBP, or GIF file");
  }
  if (file.size > MAX_COVER_SIZE) {
    throw new Error("Cover image must be 5MB or smaller");
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000).toString();
  const folder = "portfolio/projects";
  const publicId = `${slugify(title) || "project"}-${Date.now()}`;
  const signature = signCloudinaryParams(
    { folder, public_id: publicId, timestamp },
    apiSecret
  );

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", apiKey);
  uploadData.append("timestamp", timestamp);
  uploadData.append("signature", signature);
  uploadData.append("folder", folder);
  uploadData.append("public_id", publicId);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: uploadData,
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Cloudinary upload failed: ${message}. Check that CLOUDINARY_URL uses the API secret, not the API key or cloud name.`
    );
  }

  const result = (await response.json()) as { secure_url?: string };
  if (!result.secure_url) {
    throw new Error("Cloudinary upload did not return a secure URL");
  }

  return result.secure_url;
}

async function buildData(formData: FormData) {
  const title = formData.get("title")?.toString().trim() ?? "";
  const slug =
    formData.get("slug")?.toString().trim() || slugify(title);
  const uploadedCover = getUploadedCover(formData);
  const cover =
    uploadedCover
      ? await saveProjectCover(uploadedCover, title)
      : formData.get("cover")?.toString().trim() || null;

  const technologyIds = formData.getAll("technologyIds").map((v) => v.toString());
  const tagIds = formData.getAll("tagIds").map((v) => v.toString());

  return {
    scalars: {
      title,
      slug,
      category: formData.get("category")?.toString().trim() || null,
      summary: formData.get("summary")?.toString().trim() || null,
      description: formData.get("description")?.toString().trim() || null,
      role: formData.get("role")?.toString().trim() || null,
      cover,
      gallery: parseList(formData.get("gallery")),
      linkCode: formData.get("linkCode")?.toString().trim() || null,
      linkWebsite: formData.get("linkWebsite")?.toString().trim() || null,
      linkDemo: formData.get("linkDemo")?.toString().trim() || null,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      order: Number(formData.get("order") ?? 0) || 0,
      startedAt: parseDate(formData.get("startedAt")),
      finishedAt: parseDate(formData.get("finishedAt")),
    },
    technologyIds,
    tagIds,
    uploadedCover: Boolean(uploadedCover),
  };
}

export async function createProject(formData: FormData) {
  await requireAuth();
  const { scalars, technologyIds, tagIds } = await buildData(formData);
  if (!scalars.title) throw new Error("Title is required");

  await prisma.project.create({
    data: {
      ...scalars,
      technologies: { connect: technologyIds.map((id) => ({ id })) },
      tags: { connect: tagIds.map((id) => ({ id })) },
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();
  const previousProject = await prisma.project.findUnique({
    where: { id },
    select: { cover: true },
  });
  const { scalars, technologyIds, tagIds, uploadedCover } = await buildData(formData);

  try {
    await prisma.project.update({
      where: { id },
      data: {
        ...scalars,
        technologies: { set: technologyIds.map((id) => ({ id })) },
        tags: { set: tagIds.map((id) => ({ id })) },
      },
    });
  } catch (error) {
    if (uploadedCover) {
      await deleteCloudinaryImage(scalars.cover);
    }
    throw error;
  }

  if (
    uploadedCover &&
    previousProject?.cover &&
    previousProject.cover !== scalars.cover
  ) {
    await deleteCloudinaryImage(previousProject.cover);
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  const project = await prisma.project.findUnique({
    where: { id },
    select: { cover: true },
  });
  await prisma.project.delete({ where: { id } });
  await deleteCloudinaryImage(project?.cover ?? null);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}
