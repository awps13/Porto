import PageHeader from "@/components/admin/page-header";
import CertForm, { emptyCert } from "../_form";
import { createCertificate } from "../actions";

export default function NewCertPage() {
  return (
    <>
      <PageHeader eyebrow="Certificates" title="New certificate" />
      <CertForm
        action={createCertificate}
        initial={emptyCert}
        submitLabel="Create certificate"
      />
    </>
  );
}
