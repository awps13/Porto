import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import EmptyState from "@/components/admin/empty-state";
import { DataTable, type Column } from "@/components/admin/data-table";
import DeleteForm from "@/components/admin/delete-form";
import { deleteProject } from "./actions";

type Row = {
  id: string;
  title: string;
  category: string | null;
  startedAt: Date | null;
  finishedAt: Date | null;
  featured: boolean;
  published: boolean;
  order: number;
  updatedAt: Date;
  _count: { technologies: number; tags: number };
};

function formatProjectDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatProjectDateRange(startedAt: Date | null, finishedAt: Date | null) {
  if (startedAt && finishedAt) {
    return `${formatProjectDate(startedAt)} - ${formatProjectDate(finishedAt)}`;
  }
  if (startedAt) return `${formatProjectDate(startedAt)} - Present`;
  if (finishedAt) return formatProjectDate(finishedAt);
  return "No date";
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      category: true,
      startedAt: true,
      finishedAt: true,
      featured: true,
      published: true,
      order: true,
      updatedAt: true,
      _count: { select: { technologies: true, tags: true } },
    },
  });

  const columns: Column<Row>[] = [
    {
      header: "Title",
      cell: (r) => (
        <div>
          <p className="font-semibold text-fg">{r.title}</p>
          {r.category && (
            <p className="text-label-caps uppercase text-fg-muted mt-1">
              {r.category}
            </p>
          )}
        </div>
      ),
    },
    {
      header: "Date",
      cell: (r) => (
        <span className="text-fg-muted">
          {formatProjectDateRange(r.startedAt, r.finishedAt)}
        </span>
      ),
    },
    {
      header: "Order",
      cell: (r) => <span className="font-mono">{r.order}</span>,
      className: "w-20",
    },
    {
      header: "Status",
      cell: (r) => (
        <div className="flex flex-wrap gap-2">
          {r.featured && (
            <span className="text-label-caps uppercase border border-white/30 px-2 py-1">
              Featured
            </span>
          )}
          <span
            className={`text-label-caps uppercase px-2 py-1 ${r.published ? "bg-white text-black" : "border border-white/15 text-fg-muted"}`}
          >
            {r.published ? "Published" : "Draft"}
          </span>
        </div>
      ),
    },
    {
      header: "Relations",
      cell: (r) => (
        <span className="text-fg-muted">
          {r._count.technologies} tech · {r._count.tags} tag
        </span>
      ),
    },
    {
      header: "Updated",
      cell: (r) => (
        <span className="text-fg-muted">
          {r.updatedAt.toISOString().slice(0, 10)}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Projects"
        description="The bento grid that anchors the portfolio. Order, feature, and edit your work."
        action={{ label: "+ New project", href: "/admin/projects/new" }}
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first project to start populating the curated section."
          action={{ label: "+ New project", href: "/admin/projects/new" }}
        />
      ) : (
        <div className="space-y-6">
          <DataTable
            rows={projects}
            columns={columns}
            rowKey={(r) => r.id}
            rowHref={(r) => `/admin/projects/${r.id}`}
          />
          <details className="border border-white/15 bg-surface-lowest">
            <summary className="px-5 py-3 cursor-pointer text-label-caps uppercase">
              Bulk delete
            </summary>
            <div className="p-5 space-y-3 border-t border-white/15">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm">{p.title}</span>
                  <DeleteForm action={deleteProject} id={p.id} />
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </>
  );
}
