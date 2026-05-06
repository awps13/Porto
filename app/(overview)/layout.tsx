import { ReactNode } from "react";
import Link from "next/link";
import OverviewSidebar from "@/components/overview/sidebar";
import OverviewThemeToggle from "@/components/overview/theme-toggle";

export default function OverviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg flex">
      <OverviewSidebar />
      <div className="flex-1 min-w-0 md:pl-56">
        <div className="fixed right-6 top-5 z-50">
          <OverviewThemeToggle />
        </div>
        <div className="md:hidden border-b border-fg/15 px-6 py-4 bg-surface-lowest sticky top-0 z-10 flex justify-between items-center transition-colors duration-500 ease-architect">
          <Link
            href="/"
            className="font-epilogue font-bold tracking-tighter"
          >
            OVERVIEW
          </Link>
        </div>
        <main className="w-full px-6 md:px-10 py-10 md:py-14">
          {children}
        </main>
      </div>
    </div>
  );
}
