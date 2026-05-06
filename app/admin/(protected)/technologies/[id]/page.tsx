import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import TechForm, { emptyTech } from "../_form";
import { updateTechnology, deleteTechnology } from "../actions";
import DeleteForm from "@/components/admin/delete-form";

export default async function EditTechPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tech = await prisma.technology.findUnique({ where: { id } });
  if (!tech) notFound();

  const initial = {
    ...emptyTech,
    name: tech.name,
    slug: tech.slug,
    icon: tech.icon ?? "",
    category: tech.category ?? "",
    order: tech.order,
  };

  const update = updateTechnology.bind(null, tech.id);

  return (
    <>
      <PageHeader eyebrow="Technologies" title={`Edit · ${tech.name}`}>
        <DeleteForm
          action={deleteTechnology}
          id={tech.id}
          confirm={`Delete technology "${tech.name}"? It will be removed from all projects.`}
        />
      </PageHeader>
      <TechForm action={update} initial={initial} submitLabel="Save changes" />
    </>
  );
}
