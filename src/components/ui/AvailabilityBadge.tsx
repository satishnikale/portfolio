import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative flex size-2', className)} aria-hidden="true">
      <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-positive opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-positive" />
    </span>
  );
}

export function AvailabilityBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-ink-muted',
        className,
      )}
    >
      <StatusDot />
      {children}
    </p>
  );
}
