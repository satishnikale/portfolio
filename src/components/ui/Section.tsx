import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Shared section frame: hairline divider, mono index label, title and intro.
 * On large screens the label sits in a narrow left rail for an editorial grid.
 */
export function Section({ id, index, label, title, intro, children, className }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn('border-t border-line py-20 sm:py-28', className)}>
      <Container>
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-subtle lg:col-span-3 lg:pt-3" data-reveal>
            <span className="text-accent">{index}</span>
            <span aria-hidden="true"> / </span>
            {label}
          </p>
          <div className="lg:col-span-9" data-reveal>
            <h2
              id={headingId}
              className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.75rem]"
            >
              {title}
            </h2>
            {intro ? <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">{intro}</p> : null}
          </div>
        </div>
        <div className="mt-14 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}
