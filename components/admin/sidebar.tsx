"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections: { title: string; items: { label: string; href: string }[] }[] =
  [
    {
      title: "Overview",
      items: [{ label: "Dashboard", href: "/admin" }],
    },
    {
      title: "Content",
      items: [
        { label: "Profile", href: "/admin/profile" },
        { label: "Projects", href: "/admin/projects" },
        { label: "Certificates", href: "/admin/certificates" },
        { label: "Experience", href: "/admin/experience" },
        { label: "Skills", href: "/admin/skills" },
        { label: "Technologies", href: "/admin/technologies" },
        { label: "Contacts", href: "/admin/contacts" },
      ],
    },
    {
      title: "Inbox",
      items: [{ label: "Messages", href: "/admin/messages" }],
    },
  ];

const Sidebar = ({ userEmail }: { userEmail: string }) => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col bg-black border-r border-white/15 sticky top-0 h-screen">
      <div className="px-6 py-8 border-b border-white/15">
        <Link href="/admin" className="font-epilogue font-bold text-xl tracking-tighter">
          ARCHITECT
        </Link>
        <p className="text-label-caps text-fg-muted mt-2 uppercase">
          Console
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-6 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <p className="text-label-caps text-fg-muted px-4 mb-3 uppercase">
              {s.title}
            </p>
            <ul className="space-y-1">
              {s.items.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-300 ease-architect ${
                        active
                          ? "bg-white text-black"
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

      <div className="border-t border-white/15 px-6 py-5">
        <p className="text-label-caps text-fg-muted mb-2 uppercase truncate">
          {userEmail}
        </p>
        <form action="/admin/logout" method="post">
          <button
            type="submit"
            className="text-label-caps uppercase text-fg-muted hover:text-fg transition-colors duration-300 ease-button active:scale-[0.98]"
          >
            Sign out →
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
