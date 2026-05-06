"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slug";

function parseDate(value: FormDataEntryValue | null): Date | null {
  if (!value) return null;
  const s = value.toString().trim();
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function buildData(formData: FormData) {
  const title = formData.get("title")?.toString().trim() ?? "";
  return {
    title,
    slug: formData.get("slug")?.toString().trim() || slugify(title),
    subtitle: formData.get("subtitle")?.toString().trim() || null,
    issuer: formData.get("issuer")?.toString().trim() || null,
    description: formData.get("description")?.toString().trim() || null,
    image: formData.get("image")?.toString().trim() || null,
    certificateUrl: formData.get("certificateUrl")?.toString().trim() || null,
    credentialId: formData.get("credentialId")?.toString().trim() || null,
    issuedAt: parseDate(formData.get("issuedAt")),
    expiresAt: parseDate(formData.get("expiresAt")),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createCertificate(formData: FormData) {
  await requireAuth();
  const data = buildData(formData);
  if (!data.title) throw new Error("Title is required");
  await prisma.certificate.create({ data });
  revalidatePath("/admin/certificates");
  redirect("/admin/certificates");
}

export async function updateCertificate(id: string, formData: FormData) {
  await requireAuth();
  await prisma.certificate.update({ where: { id }, data: buildData(formData) });
  revalidatePath("/admin/certificates");
  redirect("/admin/certificates");
}

export async function deleteCertificate(formData: FormData) {
  await requireAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/admin/certificates");
}
