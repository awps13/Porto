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
      {isDark ? (
        // Sun icon (switch to light)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ) : (
        // Moon icon (switch to dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
