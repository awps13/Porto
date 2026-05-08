const links = [
  { label: "Instagram", href: "https://www.instagram.com/awps13_" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmadwildanputrosantoso/" },
  { label: "Github", href: "https://github.com/awps13" },
];
const Newsletter = () => {
  return (
    <section className="px-8 md:px-16 xl:px-24 2xl:px-32 py-32 bg-bg border-t border-fg/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-headline-md uppercase mb-8 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          Contact me
        </h2>
        <p
          className="text-body-md text-fg-muted mb-12 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          Contact me for more information or want to collaborate on a project. I am open to freelance work and new
        </p>
        <div className="flex gap-8 justify-center animate-fade-up" style={{ animationDelay: "200ms" }}  >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-epilogue sm:text-[20px] text-[10px] tracking-widest uppercase text-fg hover:opacity-50 transition-opacity duration-300" target="blank"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
