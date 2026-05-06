import { prisma } from "@/lib/prisma";

const formatDate = (date: Date) =>
  date.toLocaleDateString("en", {
    month: "short",
    year: "numeric",
  });

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg uppercase mb-2">Experience</h1>
        <p className="text-body-md text-fg-muted">
          View and manage your professional experiences
        </p>
      </div>

      <div className="space-y-6">
        {experiences.length === 0 ? (
          <p className="text-fg-muted">No experiences found</p>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="border border-white/15 bg-surface-low p-6 transition-colors hover:border-white/30"
            >
              <h3 className="text-headline-md uppercase mb-2">{exp.role}</h3>
              <p className="text-body-md text-fg-muted mb-2">
                {exp.organization}
              </p>
              <p className="text-label-caps text-fg-muted uppercase mb-4">
                {formatDate(exp.startDate)} -{" "}
                {exp.current || !exp.endDate ? "Present" : formatDate(exp.endDate)}
              </p>
              {exp.description && (
                <p className="text-body-md">{exp.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
