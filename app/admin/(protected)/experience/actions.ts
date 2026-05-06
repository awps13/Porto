"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ExperienceType } from "@/lib/generated/prisma/enums";

function parseList(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return value
    .toString()
    .split(/\n+/)
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

function buildData(formData: FormData) {
  const role = formData.get("role")?.toString().trim() ?? "";
  const organization = formData.get("organization")?.toString().trim() ?? "";
  const startDate = parseDate(formData.get("startDate"));
  if (!startDate) throw new Error("Start date is required");

  return {
    type: (formData.get("type")?.toString() as ExperienceType) ?? "WORK",
    role,
    organization,
    location: formData.get("location")?.toString().trim() || null,
    description: formData.get("description")?.toString().trim() || null,
    highlights: parseList(formData.get("highlights")),
    logo: formData.get("logo")?.toString().trim() || null,
    url: formData.get("url")?.toString().trim() || null,
    startDate,
    endDate: parseDate(formData.get("endDate")),
    current: formData.get("current") === "on",
    published: formData.get("published") === "on",
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createExperience(formData: FormData) {
  await requireAuth();
  await prisma.experience.create({ data: buildData(formData) });
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAuth();
  await prisma.experience.update({ where: { id }, data: buildData(formData) });
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(formData: FormData) {
  await requireAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/admin/experience");
}
