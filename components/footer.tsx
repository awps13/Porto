const links = [
  { label: "Instagram", href: "https://www.instagram.com/awps13_" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmadwildanputrosantoso/" },
  { label: "Github", href: "https://github.com/awps13" },
];

const Footer = () => {
  return (
    <footer
      className="bg-bg border-t border-fg/15 relative z-10 transition-colors duration-500 ease-architect"
      id="contact"
    >
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 md:px-16 xl:px-24 2xl:px-32 py-12 gap-8 max-w-[1600px] mx-auto">
        <div className="font-epilogue font-bold text-lg tracking-widest text-fg uppercase">
          AWPS13
        </div>
        <div className="font-epilogue text-[20px] tracking-widest uppercase text-outline-variant">
          © 2026 AWPS13. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-epilogue text-[20px] tracking-widest uppercase text-fg hover:opacity-50 transition-opacity duration-300" target="blank"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
