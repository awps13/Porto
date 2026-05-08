import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "10+", label: "PROJECTS" },
  { value: "2", label: "Internship" },
  { value: "7", label: "Certifications" },
  { value: "08", label: "Awards" },
];

const Studio = () => {
  return (
    <section
      id="experience"
      className="px-8 md:px-16 xl:px-24 2xl:px-32 py-stack-lg"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto w-full flex flex-col md:flex-row gap-24 items-start">
        <div className="md:w-1/2">
        
        <h2
          className="text-headline-lg uppercase text-fg mb-12 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          MY<br />
          Experience
        </h2>
        <p
          className="text-body-lg text-fg-muted mb-8 leading-relaxed animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          I have actively participated in various competitions, securing several wins, and have obtained multiple certifications in the field of Information Technology.
        </p>
        <div className="grid grid-cols-2 gap-12 mt-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up"
              style={{ animationDelay: `${300 + i * 80}ms` }}
            >
              <span className="text-4xl text-headline-md text-fg block mb-2">
                {s.value}
              </span>
              <span className="text-label-caps text-fg-muted uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className=" md:block h-px w-1/3 bg-fg/10 mb-4 flex flex-col mt-30">
                    <div className="hidden md:block h-px w-1/3 bg-fg/10 mb-4" />
                    <Link href="/experience" target="_blank">
                      <button className="bg-fg text-bg px-10 py-5 text-label-caps uppercase border border-fg hover:bg-bg hover:text-fg transition-all duration-300 ease-button active:scale-[0.98] animate-fade-up whitespace-nowrap cursor-pointer">
                        SEE MORE MY EXPERIENCE
                      </button>
                    </Link>
                  </div>
      </div>

        <div
          className="md:w-1/2 relative animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <div className="aspect-5/5 bg-surface border border-fg/15 relative">
            <Image
              src="/Foto.jpeg"
              alt="A portrait-oriented image of Ahmad Wildan, a Fullstack Developer."
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="theme-grayscale object-cover"
            />
            <div className="absolute -bottom-8 -left-8 bg-bg border border-fg/15 p-8 hidden lg:block">
              <p className="text-body-md italic max-w-xs">
                &ldquo;Never stop learning, because education is the key to your future.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;

