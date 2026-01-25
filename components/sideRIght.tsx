"use client";

export default function SideRight({ animate }: { animate: boolean }) {
  return (
    <div
      className={`
        fixed inset-y-0 right-0 w-1/2 bg-black z-40
        transition-transform duration-700 ease-in-out
        ${animate ? "translate-x-full" : "translate-x-0"}
      `}
    />
  );
}
