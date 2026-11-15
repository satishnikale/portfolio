import { skills } from '@/content/skills';
import { Section } from '../ui/Section';

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      label="Skills"
      title="The toolkit I reach for."
      intro="Technologies I’ve used to ship real features, grouped by where they sit in the stack."
    >
      <dl className="border-t border-line">
        {skills.map((group) => (
          <div
            key={group.category}
            className="grid gap-3 border-b border-line py-6 transition-colors duration-300 hover:bg-surface/60 sm:py-7 lg:grid-cols-12 lg:gap-10"
            data-reveal
          >
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-subtle lg:col-span-3 lg:pt-1.5">
              {group.category}
            </dt>
            <dd className="lg:col-span-9">
              <ul className="flex flex-wrap gap-x-2 gap-y-2.5" aria-label={group.category}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.9375rem] tracking-tight transition-colors hover:border-line-strong"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
