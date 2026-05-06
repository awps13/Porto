"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slug";

function buildData(formData: FormData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  return {
    name,
    slug: formData.get("slug")?.toString().trim() || slugify(name),
    icon: formData.get("icon")?.toString().trim() || null,
    category: formData.get("category")?.toString().trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createTechnology(formData: FormData) {
  await requireAuth();
  const data = buildData(formData);
  if (!data.name) throw new Error("Name is required");
  await prisma.technology.create({ data });
  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

export async function updateTechnology(id: string, formData: FormData) {
  await requireAuth();
  await prisma.technology.update({ where: { id }, data: buildData(formData) });
  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}

export async function deleteTechnology(formData: FormData) {
  await requireAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.technology.delete({ where: { id } });
  revalidatePath("/admin/technologies");
}
