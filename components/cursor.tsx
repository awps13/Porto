"use client";

import { useEffect, useState } from "react";

const supportsCustomCursor = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!supportsCustomCursor()) return;

    document.body.classList.add("hide-cursor");

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.body.classList.remove("hide-cursor");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{
        transform: `translate3d(${pos.x - 12}px, ${pos.y - 12}px, 0)`,
        mixBlendMode: "difference",
        transition: "transform 80ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="w-6 h-6 bg-white"
        style={{ borderRadius: "9999px" }}
      />
    </div>
  );
};

export default Cursor;
