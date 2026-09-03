"use client";

import { toggleTheme } from "@/lib/theme";

/**
 * The theme switch.
 *
 * Which icon shows is decided in CSS from the root element's state, not from
 * React state. That matters on a statically exported page: the server has no
 * idea what the visitor's system prefers, so any JS-driven icon would either
 * mismatch on hydration or flicker. CSS reads `data-theme` and
 * `prefers-color-scheme` directly and is correct on the very first frame.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className={`text-muted hover:text-cream hover:border-line-strong border-line grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg border transition-colors ${className}`}
    >
      <span data-theme-icon="dark">
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
        <span className="sr-only">Switch to the light theme</span>
      </span>

      <span data-theme-icon="light">
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.1 5.1l1.4 1.4M17.5 17.5l1.4 1.4M18.9 5.1l-1.4 1.4M6.5 17.5l-1.4 1.4" />
        </svg>
        <span className="sr-only">Switch to the dark theme</span>
      </span>
    </button>
  );
}
