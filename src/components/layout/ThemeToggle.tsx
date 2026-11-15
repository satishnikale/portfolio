'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const THEME_EVENT = 'themechange';

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

const getIsDark = () => document.documentElement.classList.contains('dark');

export function ThemeToggle() {
  // The initial theme is applied by an inline script before paint; this only mirrors it.
  const isDark = useSyncExternalStore(subscribe, getIsDark, () => true);

  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains('dark');

    // Suppress colour transitions for one frame so the switch is instant and consistent.
    root.classList.add('theme-switching');
    root.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
    requestAnimationFrame(() => root.classList.remove('theme-switching'));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className="inline-flex size-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
    >
      <Sun className="hidden size-[1.05rem] dark:block" strokeWidth={1.75} aria-hidden="true" />
      <Moon className="size-[1.05rem] dark:hidden" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
