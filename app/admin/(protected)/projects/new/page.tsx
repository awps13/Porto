import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import ProjectForm, { emptyProject } from "../_form";
import { createProject } from "../actions";

export default async function NewProjectPage() {
  const [technologies, tags] = await Promise.all([
    prisma.technology.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.tag.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="New project"
        description="Fill in the details. You can leave optional fields blank and edit later."
      />
      <ProjectForm
        action={createProject}
        initial={emptyProject}
        technologies={technologies}
        tags={tags}
        submitLabel="Create project"
      />
    </>
  );
}
