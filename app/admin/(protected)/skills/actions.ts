"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slug";

function buildData(formData: FormData) {
  const name = formData.get("name")?.toString().trim() ?? "";
  const levelStr = formData.get("level")?.toString().trim();
  return {
    name,
    slug: formData.get("slug")?.toString().trim() || slugify(name),
    category: formData.get("category")?.toString().trim() || null,
    level: levelStr ? Math.min(5, Math.max(1, Number(levelStr) || 1)) : null,
    icon: formData.get("icon")?.toString().trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };
}

export async function createSkill(formData: FormData) {
  await requireAuth();
  const data = buildData(formData);
  if (!data.name) throw new Error("Name is required");
  await prisma.skill.create({ data });
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAuth();
  await prisma.skill.update({ where: { id }, data: buildData(formData) });
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  await requireAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
}
