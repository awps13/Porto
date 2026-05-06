import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import { updateMessageStatus, deleteMessage } from "../actions";
import DeleteForm from "@/components/admin/delete-form";
import { MessageStatus } from "@/lib/generated/prisma/enums";

const statuses: MessageStatus[] = [
  "UNREAD",
  "READ",
  "REPLIED",
  "ARCHIVED",
  "SPAM",
];

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const msg = await prisma.message.findUnique({ where: { id } });
  if (!msg) notFound();

  // Auto-mark UNREAD → READ on view
  if (msg.status === "UNREAD") {
    await prisma.message.update({
      where: { id },
      data: { status: "READ", readAt: new Date() },
    });
  }

  return (
    <>
      <PageHeader
        eyebrow="Inbox"
        title={msg.subject ?? "(no subject)"}
        description={`${msg.name} · ${msg.email}`}
      >
        <DeleteForm
          action={deleteMessage}
          id={msg.id}
          confirm="Delete this message permanently?"
        />
      </PageHeader>

      <div className="space-y-6">
        <div className="border border-white/15 p-6 bg-surface-lowest">
          <p className="text-label-caps uppercase text-fg-muted mb-3">
            Message
          </p>
          <p className="text-body-md whitespace-pre-wrap leading-relaxed">
            {msg.body}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-white/15 p-6 bg-surface-lowest">
            <p className="text-label-caps uppercase text-fg-muted mb-3">
              Meta
            </p>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">Received</dt>
                <dd>{msg.createdAt.toISOString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">Read at</dt>
                <dd>{msg.readAt ? msg.readAt.toISOString() : "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">IP</dt>
                <dd className="font-mono text-xs">{msg.ip ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-muted">User-Agent</dt>
                <dd className="font-mono text-xs truncate max-w-xs">
                  {msg.userAgent ?? "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-white/15 p-6 bg-surface-lowest">
            <p className="text-label-caps uppercase text-fg-muted mb-4">
              Set status
            </p>
            <form action={updateMessageStatus} className="flex flex-wrap gap-2">
              <input type="hidden" name="id" value={msg.id} />
              {statuses.map((s) => (
                <button
                  key={s}
                  type="submit"
                  name="status"
                  value={s}
                  className={`text-label-caps uppercase px-3 py-2 transition-all duration-300 ease-button active:scale-[0.98] ${
                    msg.status === s
                      ? "bg-white text-black"
                      : "border border-white/20 hover:border-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </form>

            <a
              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                msg.subject ?? ""
              )}`}
              className="text-label-caps uppercase mt-6 inline-block bg-white text-black border border-white px-6 py-3 hover:bg-black hover:text-white transition-all duration-300 ease-button active:scale-[0.98]"
            >
              Reply via mail →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
