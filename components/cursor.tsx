"use client";

import { useEffect, useRef, useState } from "react";

const supportsCustomCursor = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const Cursor = () => {
  const [visible, setVisible] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!supportsCustomCursor()) return;

    document.body.classList.add("hide-cursor");

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x - 12}px, ${posRef.current.y - 12}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.body.classList.remove("hide-cursor");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
      style={{
        mixBlendMode: "difference",
        transition: "transform 80ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="w-6 h-6 bg-white" style={{ borderRadius: "9999px" }} />
    </div>
  );
};

export default Cursor;
