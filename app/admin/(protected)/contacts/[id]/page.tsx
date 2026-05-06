import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import ContactForm, { emptyContact } from "../_form";
import { updateContact, deleteContact } from "../actions";
import DeleteForm from "@/components/admin/delete-form";

export default async function EditContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) notFound();

  const initial = {
    ...emptyContact,
    type: contact.type,
    label: contact.label,
    value: contact.value,
    icon: contact.icon ?? "",
    order: contact.order,
    primary: contact.primary,
    active: contact.active,
  };

  const update = updateContact.bind(null, contact.id);

  return (
    <>
      <PageHeader eyebrow="Contacts" title={`Edit · ${contact.label}`}>
        <DeleteForm
          action={deleteContact}
          id={contact.id}
          confirm={`Delete contact "${contact.label}"?`}
        />
      </PageHeader>
      <ContactForm
        action={update}
        initial={initial}
        submitLabel="Save changes"
      />
    </>
  );
}
