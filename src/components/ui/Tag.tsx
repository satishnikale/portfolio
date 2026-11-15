import type { ReactNode } from 'react';

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-line bg-surface-muted/60 px-2 py-1 font-mono text-[0.72rem] leading-none text-ink-muted">
      {children}
    </li>
  );
}

export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
