import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import ExpForm, { emptyExp } from "../_form";
import { updateExperience, deleteExperience } from "../actions";
import DeleteForm from "@/components/admin/delete-form";

export default async function EditExpPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exp = await prisma.experience.findUnique({ where: { id } });
  if (!exp) notFound();

  const initial = {
    ...emptyExp,
    type: exp.type,
    role: exp.role,
    organization: exp.organization,
    location: exp.location ?? "",
    description: exp.description ?? "",
    highlights: exp.highlights,
    logo: exp.logo ?? "",
    url: exp.url ?? "",
    startDate: exp.startDate,
    endDate: exp.endDate,
    current: exp.current,
    published: exp.published,
    order: exp.order,
  };

  const update = updateExperience.bind(null, exp.id);

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title={`Edit · ${exp.role}`}
        description={exp.organization}
      >
        <DeleteForm
          action={deleteExperience}
          id={exp.id}
          confirm={`Delete "${exp.role} @ ${exp.organization}"?`}
        />
      </PageHeader>
      <ExpForm action={update} initial={initial} submitLabel="Save changes" />
    </>
  );
}
