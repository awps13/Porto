import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import EmptyState from "@/components/admin/empty-state";
import { DataTable, type Column } from "@/components/admin/data-table";
import DeleteForm from "@/components/admin/delete-form";
import { deleteCertificate } from "./actions";

type Row = {
  id: string;
  title: string;
  issuer: string | null;
  featured: boolean;
  published: boolean;
  order: number;
  issuedAt: Date | null;
};

export default async function CertificatesPage() {
  const items = await prisma.certificate.findMany({
    orderBy: [{ order: "asc" }, { issuedAt: "desc" }],
    select: {
      id: true,
      title: true,
      issuer: true,
      featured: true,
      published: true,
      order: true,
      issuedAt: true,
    },
  });

  const columns: Column<Row>[] = [
    {
      header: "Title",
      cell: (r) => (
        <div>
          <p className="font-semibold">{r.title}</p>
          {r.issuer && (
            <p className="text-label-caps uppercase text-fg-muted mt-1">
              {r.issuer}
            </p>
          )}
        </div>
      ),
    },
    {
      header: "Issued",
      cell: (r) => (
        <span className="text-fg-muted">
          {r.issuedAt ? r.issuedAt.toISOString().slice(0, 10) : "—"}
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
  ];

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Certificates"
        description="Awards, completed courses, and credentials."
        action={{ label: "+ New certificate", href: "/admin/certificates/new" }}
      />

      {items.length === 0 ? (
        <EmptyState
          title="No certificates yet"
          action={{
            label: "+ New certificate",
            href: "/admin/certificates/new",
          }}
        />
      ) : (
        <div className="space-y-6">
          <DataTable
            rows={items}
            columns={columns}
            rowKey={(r) => r.id}
            rowHref={(r) => `/admin/certificates/${r.id}`}
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
                  <span className="text-sm">{c.title}</span>
                  <DeleteForm action={deleteCertificate} id={c.id} />
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </>
  );
}
