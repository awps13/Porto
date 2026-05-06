import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";

const tiles: { title: string; href: string; key: string }[] = [
  { title: "Projects", href: "/admin/projects", key: "project" },
  { title: "Certificates", href: "/admin/certificates", key: "certificate" },
  { title: "Experience", href: "/admin/experience", key: "experience" },
  { title: "Skills", href: "/admin/skills", key: "skill" },
  { title: "Technologies", href: "/admin/technologies", key: "technology" },
  { title: "Contacts", href: "/admin/contacts", key: "contact" },
  { title: "Messages", href: "/admin/messages", key: "message" },
];

export default async function DashboardHome() {
  const [
    projects,
    certificates,
    experience,
    skills,
    technologies,
    contacts,
    messages,
    unread,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.certificate.count(),
    prisma.experience.count(),
    prisma.skill.count(),
    prisma.technology.count(),
    prisma.contact.count(),
    prisma.message.count(),
    prisma.message.count({ where: { status: "UNREAD" } }),
  ]);

  const counts: Record<string, number> = {
    project: projects,
    certificate: certificates,
    experience: experience,
    skill: skills,
    technology: technologies,
    contact: contacts,
    message: messages,
  };

  return (
    <>
      <PageHeader
        eyebrow="Console"
        title="Dashboard"
        description="Manage every surface of your portfolio: projects, certificates, experience, skills, contact channels, and inbound messages."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {tiles.map((t) => {
          const count = counts[t.key] ?? 0;
          const badge = t.key === "message" && unread > 0 ? unread : null;
          return (
            <Link
              key={t.key}
              href={t.href}
              className="group block border border-white/15 bg-surface-lowest p-6 hover:bg-surface-low hover:border-white/30 transition-all duration-300 ease-architect"
            >
              <div className="flex items-start justify-between">
                <p className="text-label-caps text-fg-muted uppercase">
                  {t.title}
                </p>
                {badge !== null && (
                  <span className="text-label-caps uppercase bg-white text-black px-2 py-1">
                    {badge} new
                  </span>
                )}
              </div>
              <p className="font-epilogue text-5xl font-semibold tracking-tighter mt-6">
                {String(count).padStart(2, "0")}
              </p>
              <p className="text-label-caps uppercase text-fg-muted mt-6 group-hover:text-fg transition-colors">
                Manage →
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
