import Link from "next/link";
type Project = {
  title: string;
  meta: string;
  image: string;
  alt: string;
  span: string;
  aspect: string;
  offset?: string;
};

const projects: Project[] = [
  {
    title: "Sistem Monitoring dan Manajemen Proyek PT Nara Megah Perkasa",
    meta: "Nextjs, Shadcn, Prisma, Typescript, PostgreSQL",
    image: "/projects/nara.png",
    alt: "A low-angle shot of a brutalist concrete skyscraper reaching into a dramatic, high-contrast sky.",
    span: "md:col-span-8",
    aspect: "aspect-[16/9]",
  },
  {
    title: "Gallery Mobile",
    meta: "Nextjs, Prisma, Neon, TailwindCSS, Typescript",
    image: "/projects/gallery.png",
    alt: "An interior shot of a minimalist concrete staircase illuminated by a single, sharp shaft of light from above.",
    span: "md:col-span-4",
    aspect: "aspect-[3/4]",
    offset: "md:mt-24 ",
  },
  {
    title: "Chemlinko",
    meta: "NextJS, Prisma, Neon, Typescript, Tailwindcss",
    image: "/projects/chemlinko.png",
    alt: "A wide-angle interior view of a modern office space featuring long, clean lines and a minimalist black and white color palette.",
    span: "md:col-span-6",
    aspect: "aspect-square",
  },
  {
    title: "Safera",
    meta: "Nextjs, Prisma, MySQL, Google Gemini API, Shadcn, Xendit, Typescript",
    image: "/projects/safera.png",
    alt: "An exterior view of a modern glass and steel pavilion surrounded by a reflecting pool at night.",
    span: "md:col-span-6",
    aspect: "aspect-video",
    offset: "md:-mt-0",
  },
];

const Projects = () => {
  return (
    <section
      id="project"
      className="px-8 md:px-16 xl:px-24 2xl:px-32 py-16 bg-surface-lowest border-y border-fg/5"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-24 gap-6 md:gap-0">
          <div>
            <span
              className="text-label-caps text-primary mb-4 block uppercase animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              the
            </span>
            <h2
              className="text-headline-lg uppercase text-fg animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              BEST PROJECTS
            </h2>
          </div>
          <div className="flex flex-col md:block h-px w-full md:w-1/3 bg-fg/10 mb-4">
            <div className="hidden md:block h-px w-1/3 bg-fg/10 mb-4" />
            <Link href="/projects" target="_blank">
              <button className="bg-fg text-bg px-10 py-5 text-label-caps uppercase border border-fg hover:bg-bg hover:text-fg transition-all duration-300 ease-button active:scale-[0.98] animate-fade-up whitespace-nowrap cursor-pointer">
                SEE MORE PROJECTS
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-gutter">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={`group project-card relative overflow-hidden animate-fade-up ${p.span} ${p.offset ?? ""}`}
              style={{ animationDelay: `${200 + i * 120}ms` }}
            >
              <div
                className={`overflow-hidden bg-surface border border-fg/15 ${p.aspect}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.alt}
                  className="project-image theme-grayscale w-full h-full object-cover transition-transform duration-700 ease-architect"
                />
              </div>
              <div className="mt-8">
                <h3 className="text-headline-md uppercase">{p.title}</h3>
                <p className="text-label-caps text-fg-muted mt-2 uppercase">
                  {p.meta}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
