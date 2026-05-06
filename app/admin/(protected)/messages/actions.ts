"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { MessageStatus } from "@/lib/generated/prisma/enums";

export async function updateMessageStatus(formData: FormData) {
  await requireAuth();
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString() as MessageStatus | undefined;
  if (!id || !status) return;
  await prisma.message.update({
    where: { id },
    data: {
      status,
      readAt: status !== "UNREAD" ? new Date() : null,
    },
  });
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
}

export async function deleteMessage(formData: FormData) {
  await requireAuth();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
