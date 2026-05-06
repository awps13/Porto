"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ContactType } from "@/lib/generated/prisma/enums";

function buildData(formData: FormData) {
  return {
    type: (formData.get("type")?.toString() as ContactType) ?? "OTHER",
    label: formData.get("label")?.toString().trim() ?? "",
    value: formData.get("value")?.toString().trim() ?? "",
    icon: formData.get("icon")?.toString().trim() || null,
    order: Number(formData.get("order") ?? 0) || 0,
    primary: formData.get("primary") === "on",
    active: formData.get("active") === "on",
  };
}

export async function createContact(formData: FormData) {
  await requireAuth();
  const data = buildData(formData);
  if (!data.label || !data.value) throw new Error("Label and value are required");
  await prisma.contact.create({ data });
  revalidatePath("/admin/contacts");
  redirect("/admin/contacts");
}

export async function updateContact(id: string, formData: FormData) {
  await requireAuth();
  await prisma.contact.update({ where: { id }, data: buildData(formData) });
  revalidatePath("/admin/contacts");
  redirect("/admin/contacts");
}

export async function deleteContact(formData: FormData) {
  await requireAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.contact.delete({ where: { id } });
  revalidatePath("/admin/contacts");
}
