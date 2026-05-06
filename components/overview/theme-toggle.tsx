"use client";

import { useTheme } from "@/components/theme-provider";

export default function OverviewThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center border border-fg/15 bg-bg text-fg transition-colors duration-300 ease-button hover:border-fg/40 hover:bg-surface active:scale-[0.98]"
    >
      <span className="material-symbols-outlined text-xl leading-none">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
