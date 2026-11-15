import { about } from '@/content/about';
import { Section } from '../ui/Section';

export function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      title={
        <>
          Engineer first. <span className="text-ink-subtle">Comfortable owning the whole stack.</span>
        </>
      }
    >
      <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="space-y-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-muted lg:col-span-6 lg:col-start-4" data-reveal>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className={i === 0 ? 'text-ink' : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="lg:col-span-9 lg:col-start-4" data-reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-subtle">What I work on</h3>
          <ul className="mt-5 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {about.focusAreas.map((area) => (
              <li
                key={area.title}
                className="group border-b border-r border-line p-5 transition-colors duration-300 hover:bg-surface sm:last:col-span-2 lg:last:col-span-3"
              >
                <p className="flex items-center gap-2 font-medium tracking-tight">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-line-strong transition-colors duration-300 group-hover:bg-accent"
                  />
                  {area.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{area.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
