import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import EmptyState from "@/components/admin/empty-state";
import { DataTable, type Column } from "@/components/admin/data-table";
import DeleteForm from "@/components/admin/delete-form";
import { deleteContact } from "./actions";
import { ContactType } from "@/lib/generated/prisma/enums";

type Row = {
  id: string;
  type: ContactType;
  label: string;
  value: string;
  primary: boolean;
  active: boolean;
  order: number;
};

export default async function ContactsPage() {
  const items = await prisma.contact.findMany({
    orderBy: [{ order: "asc" }, { label: "asc" }],
    select: {
      id: true,
      type: true,
      label: true,
      value: true,
      primary: true,
      active: true,
      order: true,
    },
  });

  const columns: Column<Row>[] = [
    {
      header: "Label",
      cell: (r) => (
        <div>
          <p className="font-semibold">{r.label}</p>
          <p className="text-xs text-fg-muted mt-1 truncate max-w-xs">
            {r.value}
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
      header: "Status",
      cell: (r) => (
        <div className="flex flex-wrap gap-2">
          {r.primary && (
            <span className="text-label-caps uppercase border border-white/30 px-2 py-1">
              Primary
            </span>
          )}
          <span
            className={`text-label-caps uppercase px-2 py-1 ${r.active ? "bg-white text-black" : "border border-white/15 text-fg-muted"}`}
          >
            {r.active ? "Active" : "Hidden"}
          </span>
        </div>
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
        title="Contacts"
        description="Social and contact channels surfaced in the public site."
        action={{ label: "+ New contact", href: "/admin/contacts/new" }}
      />

      {items.length === 0 ? (
        <EmptyState
          title="No contacts yet"
          action={{ label: "+ New contact", href: "/admin/contacts/new" }}
        />
      ) : (
        <div className="space-y-6">
          <DataTable
            rows={items}
            columns={columns}
            rowKey={(r) => r.id}
            rowHref={(r) => `/admin/contacts/${r.id}`}
          />
          <details className="border border-white/15 bg-surface-lowest">
            <summary className="px-5 py-3 cursor-pointer text-label-caps uppercase">
              Bulk delete
            </summary>
            <div className="p-5 space-y-3 border-t border-white/15">
              {items.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-sm">{c.label}</span>
                  <DeleteForm action={deleteContact} id={c.id} />
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </>
  );
}
