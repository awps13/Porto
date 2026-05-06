import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import ProjectForm, { emptyProject } from "../_form";
import { updateProject, deleteProject } from "../actions";
import DeleteForm from "@/components/admin/delete-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, technologies, tags] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        technologies: { select: { id: true } },
        tags: { select: { id: true } },
      },
    }),
    prisma.technology.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.tag.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  if (!project) notFound();

  const initial = {
    ...emptyProject,
    id: project.id,
    title: project.title,
    slug: project.slug,
    category: project.category ?? "",
    summary: project.summary ?? "",
    description: project.description ?? "",
    role: project.role ?? "",
    cover: project.cover ?? "",
    gallery: project.gallery,
    linkCode: project.linkCode ?? "",
    linkWebsite: project.linkWebsite ?? "",
    linkDemo: project.linkDemo ?? "",
    featured: project.featured,
    published: project.published,
    order: project.order,
    startedAt: project.startedAt,
    finishedAt: project.finishedAt,
    technologyIds: project.technologies.map((t) => t.id),
    tagIds: project.tags.map((t) => t.id),
  };

  const update = updateProject.bind(null, project.id);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={`Edit · ${project.title}`}
        description="Update fields, then save. Or delete the project entirely."
      >
        <DeleteForm action={deleteProject} id={project.id} confirm={`Delete "${project.title}"?`} />
      </PageHeader>
      <ProjectForm
        action={update}
        initial={initial}
        technologies={technologies}
        tags={tags}
        submitLabel="Save changes"
      />
    </>
  );
}
