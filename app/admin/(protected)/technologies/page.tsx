import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import EmptyState from "@/components/admin/empty-state";
import { DataTable, type Column } from "@/components/admin/data-table";
import DeleteForm from "@/components/admin/delete-form";
import { deleteTechnology } from "./actions";

type Row = {
  id: string;
  name: string;
  category: string | null;
  icon: string | null;
  order: number;
  _count: { projects: number };
};

export default async function TechnologiesPage() {
  const items = await prisma.technology.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      category: true,
      icon: true,
      order: true,
      _count: { select: { projects: true } },
    },
  });

  const columns: Column<Row>[] = [
    {
      header: "Name",
      cell: (r) => (
        <div className="flex items-center gap-3">
          {r.icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={r.icon} alt="" className="w-5 h-5 object-contain" />
          )}
          <span className="font-semibold">{r.name}</span>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (r) => <span className="text-fg-muted">{r.category ?? "—"}</span>,
    },
    {
      header: "Used in",
      cell: (r) => (
        <span className="text-fg-muted">{r._count.projects} project(s)</span>
      ),
    },
    {
      header: "Order",
      cell: (r) => <span className="font-mono">{r.order}</span>,
      className: "w-20",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Technologies"
        description="The tech stack you reference from projects (M:N relation)."
        action={{ label: "+ New technology", href: "/admin/technologies/new" }}
      />

      {items.length === 0 ? (
        <EmptyState
          title="No technologies yet"
          action={{
            label: "+ New technology",
            href: "/admin/technologies/new",
          }}
        />
      ) : (
        <div className="space-y-6">
          <DataTable
            rows={items}
            columns={columns}
            rowKey={(r) => r.id}
            rowHref={(r) => `/admin/technologies/${r.id}`}
          />
          <details className="border border-white/15 bg-surface-lowest">
            <summary className="px-5 py-3 cursor-pointer text-label-caps uppercase">
              Bulk delete
            </summary>
            <div className="p-5 space-y-3 border-t border-white/15">
              {items.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm">{t.name}</span>
                  <DeleteForm action={deleteTechnology} id={t.id} />
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </>
  );
}
