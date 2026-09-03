/**
 * Theme selection: dark, light, or follow the system.
 *
 * Nothing is stored until the visitor actually chooses, so the default is
 * whatever their OS asks for — handled entirely in CSS by the
 * `prefers-color-scheme` block. A stored choice stamps `data-theme` on the
 * root element, which both media-query blocks are written to defer to.
 */
export const THEME_STORAGE_KEY = "pl_theme";

export type Theme = "light" | "dark";

/**
 * Runs before the page paints, so a visitor who chose light never sees a
 * frame of dark (or the reverse). Inlined into the document by the layout;
 * kept deliberately tiny and wrapped in try/catch because localStorage throws
 * in some privacy modes, and a theme preference is never worth a blank page.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

/** What the page is actually showing right now, stored choice or not. */
export function resolveTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/** Flips to the opposite of whatever is on screen, and remembers it. */
export function toggleTheme(): Theme {
  const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    /* no storage — the choice simply lasts for this page view */
  }
  return next;
}
