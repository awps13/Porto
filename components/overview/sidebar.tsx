"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Content",
    items: [
      { label: "Experience", href: "/experience" },
      { label: "Projects", href: "/projects" },
      { label: "Certificates", href: "/certificates" },
    ],
  },
];

const OverviewSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:flex md:w-56 md:flex-col bg-surface-lowest border-r border-fg/15 transition-colors duration-500 ease-architect">
      <div className="px-5 py-8 border-b border-fg/15">
        <Link
          href="/"
          className="font-epilogue font-bold text-xl tracking-tighter"
        >
          PORTFOLIO
        </Link>
        <p className="text-label-caps text-fg-muted mt-2 uppercase">Overview</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-6 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <p className="text-label-caps text-fg-muted px-4 mb-3 uppercase">
              {s.title}
            </p>
            <ul className="space-y-1">
              {s.items.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-300 ease-architect ${
                        active
                          ? "bg-fg text-bg"
                          : "text-fg-muted hover:bg-surface-low hover:text-fg"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-fg/15 px-5 py-5">
        <Link
          href="/"
          className="text-label-caps uppercase text-fg-muted hover:text-fg transition-colors duration-300 ease-button active:scale-[0.98]"
        >
          Back to home →
        </Link>
      </div>
    </aside>
  );
};

export default OverviewSidebar;
