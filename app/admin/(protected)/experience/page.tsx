import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import EmptyState from "@/components/admin/empty-state";
import { DataTable, type Column } from "@/components/admin/data-table";
import DeleteForm from "@/components/admin/delete-form";
import { deleteExperience } from "./actions";
import { ExperienceType } from "@/lib/generated/prisma/enums";

type Row = {
  id: string;
  type: ExperienceType;
  role: string;
  organization: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  published: boolean;
  order: number;
};

export default async function ExperiencePage() {
  const items = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
    select: {
      id: true,
      type: true,
      role: true,
      organization: true,
      startDate: true,
      endDate: true,
      current: true,
      published: true,
      order: true,
    },
  });

  const columns: Column<Row>[] = [
    {
      header: "Role",
      cell: (r) => (
        <div>
          <p className="font-semibold">{r.role}</p>
          <p className="text-label-caps uppercase text-fg-muted mt-1">
            {r.organization}
          </p>
        </div>
      ),
    },
    {
      header: "Type",
      cell: (r) => (
        <span className="text-label-caps uppercase border border-white/15 px-2 py-1">
          {r.type}
        </span>
      ),
    },
    {
      header: "Period",
      cell: (r) => (
        <span className="text-fg-muted">
          {r.startDate.toISOString().slice(0, 7)} —{" "}
          {r.current
            ? "Present"
            : r.endDate
              ? r.endDate.toISOString().slice(0, 7)
              : "—"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (r) => (
        <span
          className={`text-label-caps uppercase px-2 py-1 ${r.published ? "bg-white text-black" : "border border-white/15 text-fg-muted"}`}
        >
          {r.published ? "Live" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Experience"
        description="Work, education, internships, volunteer, and freelance entries."
        action={{ label: "+ New entry", href: "/admin/experience/new" }}
      />

      {items.length === 0 ? (
        <EmptyState
          title="No experience yet"
          action={{ label: "+ New entry", href: "/admin/experience/new" }}
        />
      ) : (
        <div className="space-y-6">
          <DataTable
            rows={items}
            columns={columns}
            rowKey={(r) => r.id}
            rowHref={(r) => `/admin/experience/${r.id}`}
          />
          <details className="border border-white/15 bg-surface-lowest">
            <summary className="px-5 py-3 cursor-pointer text-label-caps uppercase">
              Bulk delete
            </summary>
            <div className="p-5 space-y-3 border-t border-white/15">
              {items.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm">
                    {e.role} — {e.organization}
                  </span>
                  <DeleteForm action={deleteExperience} id={e.id} />
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </>
  );
}
