import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import EmptyState from "@/components/admin/empty-state";
import { DataTable, type Column } from "@/components/admin/data-table";
import DeleteForm from "@/components/admin/delete-form";
import { deleteSkill } from "./actions";

type Row = {
  id: string;
  name: string;
  category: string | null;
  level: number | null;
  order: number;
  published: boolean;
};

export default async function SkillsPage() {
  const items = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      category: true,
      level: true,
      order: true,
      published: true,
    },
  });

  const columns: Column<Row>[] = [
    {
      header: "Name",
      cell: (r) => <span className="font-semibold">{r.name}</span>,
    },
    {
      header: "Category",
      cell: (r) => (
        <span className="text-fg-muted">{r.category ?? "—"}</span>
      ),
    },
    {
      header: "Level",
      cell: (r) =>
        r.level ? (
          <span className="font-mono">{r.level} / 5</span>
        ) : (
          <span className="text-fg-muted">—</span>
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
        title="Skills"
        description="Self-assessed competencies grouped by category."
        action={{ label: "+ New skill", href: "/admin/skills/new" }}
      />

      {items.length === 0 ? (
        <EmptyState
          title="No skills yet"
          action={{ label: "+ New skill", href: "/admin/skills/new" }}
        />
      ) : (
        <div className="space-y-6">
          <DataTable
            rows={items}
            columns={columns}
            rowKey={(r) => r.id}
            rowHref={(r) => `/admin/skills/${r.id}`}
          />
          <details className="border border-white/15 bg-surface-lowest">
            <summary className="px-5 py-3 cursor-pointer text-label-caps uppercase">
              Bulk delete
            </summary>
            <div className="p-5 space-y-3 border-t border-white/15">
              {items.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm">{s.name}</span>
                  <DeleteForm action={deleteSkill} id={s.id} />
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </>
  );
}
