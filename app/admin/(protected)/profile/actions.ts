"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

function buildData(formData: FormData) {
  return {
    fullName: formData.get("fullName")?.toString().trim() ?? "",
    headline: formData.get("headline")?.toString().trim() || null,
    tagline: formData.get("tagline")?.toString().trim() || null,
    bio: formData.get("bio")?.toString().trim() || null,
    avatar: formData.get("avatar")?.toString().trim() || null,
    email: formData.get("email")?.toString().trim() || null,
    phone: formData.get("phone")?.toString().trim() || null,
    location: formData.get("location")?.toString().trim() || null,
    resumeUrl: formData.get("resumeUrl")?.toString().trim() || null,
    available: formData.get("available") === "on",
  };
}

export async function saveProfile(formData: FormData) {
  await requireAuth();
  const data = buildData(formData);
  if (!data.fullName) throw new Error("Full name is required");

  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({ data });
  }

  revalidatePath("/admin/profile");
  revalidatePath("/");
}
