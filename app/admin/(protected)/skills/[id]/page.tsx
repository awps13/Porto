import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import SkillForm, { emptySkill } from "../_form";
import { updateSkill, deleteSkill } from "../actions";
import DeleteForm from "@/components/admin/delete-form";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) notFound();

  const initial = {
    ...emptySkill,
    name: skill.name,
    slug: skill.slug,
    category: skill.category ?? "",
    level: skill.level,
    icon: skill.icon ?? "",
    order: skill.order,
    published: skill.published,
  };

  const update = updateSkill.bind(null, skill.id);

  return (
    <>
      <PageHeader eyebrow="Skills" title={`Edit · ${skill.name}`}>
        <DeleteForm
          action={deleteSkill}
          id={skill.id}
          confirm={`Delete skill "${skill.name}"?`}
        />
      </PageHeader>
      <SkillForm action={update} initial={initial} submitLabel="Save changes" />
    </>
  );
}
