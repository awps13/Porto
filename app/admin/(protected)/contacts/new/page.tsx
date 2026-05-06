import PageHeader from "@/components/admin/page-header";
import ContactForm, { emptyContact } from "../_form";
import { createContact } from "../actions";

export default function NewContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contacts" title="New contact" />
      <ContactForm
        action={createContact}
        initial={emptyContact}
        submitLabel="Create contact"
      />
    </>
  );
}
