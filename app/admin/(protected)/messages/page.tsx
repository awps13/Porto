import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import EmptyState from "@/components/admin/empty-state";
import { DataTable, type Column } from "@/components/admin/data-table";
import { MessageStatus } from "@/lib/generated/prisma/enums";

type Row = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  status: MessageStatus;
  createdAt: Date;
};

const statusVariant: Record<MessageStatus, string> = {
  UNREAD: "bg-white text-black",
  READ: "border border-white/30 text-fg",
  REPLIED: "border border-white/30 text-fg",
  ARCHIVED: "border border-white/15 text-fg-muted",
  SPAM: "border border-red-300/40 text-red-300",
};

export default async function MessagesPage() {
  const items = await prisma.message.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      status: true,
      createdAt: true,
    },
  });

  const columns: Column<Row>[] = [
    {
      header: "From",
      cell: (r) => (
        <div>
          <p className="font-semibold">{r.name}</p>
          <p className="text-xs text-fg-muted mt-1">{r.email}</p>
        </div>
      ),
    },
    {
      header: "Subject",
      cell: (r) => (
        <span className={r.status === "UNREAD" ? "font-semibold" : "text-fg-muted"}>
          {r.subject ?? "(no subject)"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (r) => (
        <span
          className={`text-label-caps uppercase px-2 py-1 ${statusVariant[r.status]}`}
        >
          {r.status}
        </span>
      ),
    },
    {
      header: "Received",
      cell: (r) => (
        <span className="text-fg-muted">
          {r.createdAt.toISOString().slice(0, 10)}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Inbox"
        title="Messages"
        description="Submissions from the public contact form."
      />

      {items.length === 0 ? (
        <EmptyState title="Inbox empty" description="You're all caught up." />
      ) : (
        <DataTable
          rows={items}
          columns={columns}
          rowKey={(r) => r.id}
          rowHref={(r) => `/admin/messages/${r.id}`}
        />
      )}
    </>
  );
}
