"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Project", href: "#project", id: "project" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const Navbar = () => {
  const { theme, toggle, mounted } = useTheme();
  const [activeId, setActiveId] = useState<string>("about");
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const el = linkRefs.current[activeId];
      const container = containerRef.current;
      if (!el || !container) return;
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicator({
        left: elRect.left - containerRect.left,
        width: elRect.width,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeId]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setActiveId(id);
    const offset = headerRef.current?.offsetHeight ?? 0;
    const top =
      target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-bg border-b border-fg/15 transition-colors duration-500 ease-architect"
    >
      <nav className="flex justify-between items-center w-full px-8 md:px-16 xl:px-24 2xl:px-32 py-6 max-w-full">
        <a
          href="#about"
          onClick={(e) => handleClick(e, "about")}
          className="font-epilogue font-bold text-xl tracking-tighter text-fg"
        >
          AWPS13
        </a>
        <div ref={containerRef} className="hidden md:flex gap-12 relative">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.label}
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                href={link.href}
                onClick={(e) => handleClick(e, link.id)}
                className={`font-epilogue text-xs tracking-[0.2em] uppercase font-medium pb-1 transition-colors duration-300 ease-architect ${
                  isActive ? "text-fg" : "text-outline-variant hover:text-fg"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 h-px bg-fg transition-[transform,width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.width > 0 ? 1 : 0,
            }}
          />
        </div>
        <button
          aria-label="Toggle theme"
          onClick={toggle}
          className="text-fg transition-transform duration-300 ease-button active:scale-[0.98] cursor-pointer w-6 h-6 flex items-center justify-center"
        >
          {mounted ? (
            theme === "dark" ? (
              // Sun icon (switch to light)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            ) : (
              // Moon icon (switch to dark)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )
          ) : (
            // Moon icon (default dark mode server render)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
