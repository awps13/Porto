const Hero = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 xl:px-24 2xl:px-32 pt-32 pb-16"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto w-full">
        <span
          className="text-label-caps text-primary mb-8 block uppercase animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          PUBLISHED 2026
        </span>
        <h1
          className="text-headline-xl text-fg uppercase mb-12 animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Ahmad Wildan Putro Santoso <br />
          <span className="text-outline-variant">Fullstack Developer</span>
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <p
            className="text-body-lg  text-fg-muted animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            I am a Fullstack Developer skilled in React.js, Next.js, Tailwind
            CSS, shadcn, JavaScript, Python, Prisma, and PostgreSQL. I build
            modern web applications with clean, responsive, and user-friendly
            interfaces while ensuring efficient backend performance. I focus on
            writing maintainable code and delivering scalable digital solutions.
          </p>
          <a href="/CV_AHMAD_WILDAN_PUTRO_SANTOSO_B_ING.pdf" target="blank">
            <button
              className="bg-fg text-bg px-10 py-5 text-label-caps uppercase border border-fg hover:bg-bg hover:text-fg transition-all duration-300 ease-button active:scale-[0.98] animate-fade-up whitespace-nowrap cursor-pointer"
              style={{ animationDelay: "360ms" }}
            >
              MY CV
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
