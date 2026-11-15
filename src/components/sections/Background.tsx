import { achievements, education } from '@/content/background';
import { Container } from '../ui/Container';

/** Education and achievements share one compact band; they support the story rather than lead it. */
export function Background() {
  return (
    <div className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <section id="education" aria-labelledby="education-heading" className="lg:col-span-7" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-subtle">
            <span className="text-accent">05</span>
            <span aria-hidden="true"> / </span>Education
          </p>
          <h2 id="education-heading" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Computer science, formally.
          </h2>
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {education.map((entry) => (
              <li key={entry.degree} className="grid gap-1.5 py-6 sm:grid-cols-[1fr_auto] sm:gap-x-6">
                <h3 className="font-medium tracking-tight">{entry.degree}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle sm:pt-1 sm:text-right">
                  {entry.period}
                </p>
                <p className="text-sm text-ink-muted">
                  {entry.institution}, {entry.location}
                </p>
                <p className="text-sm text-ink sm:text-right">{entry.score}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="achievements" aria-labelledby="achievements-heading" className="lg:col-span-4 lg:col-start-9" data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-subtle">
            <span className="text-accent">06</span>
            <span aria-hidden="true"> / </span>Achievements
          </p>
          <h2 id="achievements-heading" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Beyond the job.
          </h2>
          <ul className="mt-8 space-y-5">
            {achievements.map((achievement, i) => (
              <li key={achievement} className="grid grid-cols-[2rem_1fr] gap-2 text-pretty leading-relaxed text-ink-muted">
                <span className="font-mono text-xs leading-[1.75] text-ink-subtle">0{i + 1}</span>
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
