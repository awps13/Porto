import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import CertForm, { emptyCert } from "../_form";
import { updateCertificate, deleteCertificate } from "../actions";
import DeleteForm from "@/components/admin/delete-form";

export default async function EditCertPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = await prisma.certificate.findUnique({ where: { id } });
  if (!cert) notFound();

  const initial = {
    ...emptyCert,
    title: cert.title,
    slug: cert.slug,
    subtitle: cert.subtitle ?? "",
    issuer: cert.issuer ?? "",
    description: cert.description ?? "",
    image: cert.image ?? "",
    certificateUrl: cert.certificateUrl ?? "",
    credentialId: cert.credentialId ?? "",
    issuedAt: cert.issuedAt,
    expiresAt: cert.expiresAt,
    featured: cert.featured,
    published: cert.published,
    order: cert.order,
  };

  const update = updateCertificate.bind(null, cert.id);

  return (
    <>
      <PageHeader eyebrow="Certificates" title={`Edit · ${cert.title}`}>
        <DeleteForm
          action={deleteCertificate}
          id={cert.id}
          confirm={`Delete "${cert.title}"?`}
        />
      </PageHeader>
      <CertForm action={update} initial={initial} submitLabel="Save changes" />
    </>
  );
}
