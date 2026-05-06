"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slug";

const MAX_COVER_SIZE = 5 * 1024 * 1024;
const COVER_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "projects");
const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

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
  const extension = IMAGE_EXTENSIONS[file.type];
  if (!extension) {
    throw new Error("Cover image must be a JPG, PNG, WEBP, or GIF file");
  }
  if (file.size > MAX_COVER_SIZE) {
    throw new Error("Cover image must be 5MB or smaller");
  }

  await mkdir(COVER_UPLOAD_DIR, { recursive: true });

  const baseName = slugify(title) || "project";
  const filename = `${baseName}-${Date.now()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(COVER_UPLOAD_DIR, filename), bytes);

  return `/uploads/projects/${filename}`;
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
  const { scalars, technologyIds, tagIds } = await buildData(formData);

  await prisma.project.update({
    where: { id },
    data: {
      ...scalars,
      technologies: { set: technologyIds.map((id) => ({ id })) },
      tags: { set: tagIds.map((id) => ({ id })) },
    },
  });

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
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}
