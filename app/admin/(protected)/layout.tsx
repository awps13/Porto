import { ReactNode } from "react";
import { requireAuth } from "@/lib/auth";
import Sidebar from "@/components/admin/sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar userEmail={session.user.email} />
      <div className="flex-1 min-w-0">
        <div className="md:hidden border-b border-white/15 px-6 py-4 bg-black sticky top-0 z-10 flex justify-between items-center">
          <a href="/admin" className="font-epilogue font-bold tracking-tighter">
            ARCHITECT
          </a>
          <form action="/admin/logout" method="post">
            <button className="text-label-caps uppercase text-fg-muted">
              Sign out
            </button>
          </form>
        </div>
        <main className="px-6 md:px-12 py-10 md:py-14 max-w-6xl">
          {children}
        </main>
      </div>
    </div>
  );
}
