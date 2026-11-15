import type { Role } from '@/content/types';
import { experience } from '@/content/experience';
import { cn, formatMonth } from '@/lib/utils';
import { Section } from '../ui/Section';
import { TagList } from '../ui/Tag';

function RoleEntry({ role, isCurrent }: { role: Role; isCurrent: boolean }) {
  return (
    <li className="relative pb-14 pl-6 last:pb-0 sm:pl-10" data-reveal>
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-1.5 grid size-[0.9rem] -translate-x-1/2 place-items-center rounded-full border bg-canvas',
          isCurrent ? 'border-accent' : 'border-line-strong',
        )}
      >
        <span className={cn('size-1.5 rounded-full', isCurrent ? 'bg-accent' : 'bg-line-strong')} />
      </span>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h4 className="text-xl font-semibold tracking-tight">{role.title}</h4>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
          <time dateTime={role.start}>{formatMonth(role.start)}</time>
          {' – '}
          {role.end === 'present' ? <span className="text-accent">Present</span> : <time dateTime={role.end}>{formatMonth(role.end)}</time>}
          <span aria-hidden="true"> · </span>
          {role.location}
        </p>
      </div>

      {role.summary ? <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-muted">{role.summary}</p> : null}

      <ul className="mt-6 space-y-3.5">
        {role.highlights.map((highlight) => (
          <li key={highlight} className="relative max-w-3xl pl-5 text-pretty leading-relaxed text-ink-muted">
            <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-ink-subtle" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <TagList items={role.stack} label={`Technologies used as ${role.title}`} />
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title="Shipping production software as an early engineer."
      intro="Joined as an intern and moved into a founding engineer role — building the backend, payments and data systems behind EzyEV’s battery-swapping platform."
    >
      <div className="grid gap-x-10 lg:grid-cols-12">
        {experience.map((company) => (
          <article key={company.name} className="lg:col-span-9 lg:col-start-4">
            <header className="mb-10 flex items-center gap-4" data-reveal>
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface font-mono text-sm font-semibold"
              >
                {company.name.slice(0, 2)}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{company.name}</h3>
                <p className="text-sm text-ink-muted">
                  {company.roles.length} roles · {formatMonth(company.roles.at(-1)!.start)} – {formatMonth(company.roles[0].end)}
                </p>
              </div>
            </header>
            <ol className="relative ml-1.5 border-l border-line sm:ml-5.5">
              {company.roles.map((role, i) => (
                <RoleEntry key={role.title} role={role} isCurrent={i === 0 && role.end === 'present'} />
              ))}
            </ol>
          </article>
        ))}
      </div>
    </Section>
  );
}
