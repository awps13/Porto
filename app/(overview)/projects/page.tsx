import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: {
      technologies: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-label-caps text-primary uppercase">
            Portfolio
          </span>
          <h1 className="text-headline-lg uppercase mt-3 mb-2">Projects</h1>
          <p className="text-body-md text-fg-muted max-w-2xl">
            A collection of selected web apps, business platforms, and AI
            experiments with concise context, stack, and visual previews.
          </p>
        </div>
        <p className="text-label-caps text-fg-muted uppercase">
          {projects.length} Projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="border border-white/15 bg-surface-low p-8">
            <p className="text-body-md text-fg-muted">No projects found</p>
          </div>
        ) : (
          projects.map((project) => (
            <article
              key={project.id}
              className="group border border-white/15 bg-surface-low overflow-hidden transition-colors hover:border-white/30"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                {project.cover ? (
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1536px) 33vw, (min-width: 1024px) 50vw, 100vw"
                    className="object-cover theme-grayscale transition-transform duration-700 ease-architect group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center">
                    <p className="text-label-caps text-fg-muted uppercase">
                      No preview image
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-label-caps text-primary uppercase">
                    {project.category || "Project"}
                  </p>
                  {project.featured && (
                    <p className="text-label-caps text-fg-muted uppercase">
                      Featured
                    </p>
                  )}
                </div>

                <h2 className="font-epilogue text-2xl font-medium leading-tight uppercase mb-3">
                  {project.title}
                </h2>
                <p className="text-body-md text-fg-muted">
                  {project.summary || project.description || "No description"}
                </p>

                {project.technologies.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech.id}
                        className="border border-white/15 bg-bg px-3 py-2 text-label-caps text-fg-muted uppercase"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}

                {(project.linkWebsite || project.linkDemo || project.linkCode) && (
                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.linkWebsite && (
                      <Link
                        href={project.linkWebsite}
                        target="_blank"
                        className="border border-fg px-4 py-3 text-label-caps uppercase text-fg transition-colors hover:bg-fg hover:text-bg"
                      >
                        Website
                      </Link>
                    )}
                    {project.linkDemo && (
                      <Link
                        href={project.linkDemo}
                        target="_blank"
                        className="border border-white/15 px-4 py-3 text-label-caps uppercase text-fg-muted transition-colors hover:border-fg hover:text-fg"
                      >
                        Demo
                      </Link>
                    )}
                    {project.linkCode && (
                      <Link
                        href={project.linkCode}
                        target="_blank"
                        className="border border-white/15 px-4 py-3 text-label-caps uppercase text-fg-muted transition-colors hover:border-fg hover:text-fg"
                      >
                        Code
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
