import { ArrowDown, Download, FileText } from 'lucide-react';
import type { CSSProperties } from 'react';
import { site, socials } from '@/content/site';
import type { ResumeLinks } from '@/lib/resume';
import { AvailabilityBadge } from '../ui/AvailabilityBadge';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { SocialIcon } from '../ui/SocialIcon';

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

const profile = [
  { term: 'Currently', detail: `${site.role}, ${site.company}` },
  { term: 'Based in', detail: site.location },
  { term: 'Focus', detail: 'Backend systems, APIs and product engineering' },
  { term: 'Exploring', detail: 'AI agents and automation' },
];

export function Hero({ resume }: { resume?: ResumeLinks }) {
  return (
    <section id="home" aria-labelledby="home-heading" className="relative isolate overflow-hidden">
      {/* Quiet texture: a dotted grid that fades out away from the top-right corner. */}
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_85%_0%,black,transparent_70%)]"
      />

      <Container className="pb-20 pt-14 sm:pb-28 sm:pt-24 lg:pt-28">
        <div className="animate-rise" style={delay(0)}>
          <AvailabilityBadge>
            <span>
              <span className="text-ink">Open to opportunities</span>
              <span className="hidden sm:inline"> · available for freelance projects</span>
            </span>
          </AvailabilityBadge>
        </div>

        <p
          className="animate-rise mt-10 font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle sm:mt-12"
          style={delay(80)}
        >
          {site.title}
        </p>

        <h1
          id="home-heading"
          className="animate-rise mt-5 max-w-4xl text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem]"
          style={delay(140)}
        >
          Building software that solves{' '}
          <span className="whitespace-nowrap font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-accent">
            real-world
          </span>{' '}
          problems.
        </h1>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="animate-rise max-w-xl text-pretty text-lg leading-relaxed text-ink-muted" style={delay(220)}>
              I’m <span className="text-ink">{site.name}</span>, a full-stack software engineer and {site.role} at{' '}
              {site.company}. I build production-ready applications, scalable backend systems and reliable software
              products — from idea to deployment.
            </p>

            <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={delay(300)}>
              <ButtonLink href="#projects">
                View my work
                <ArrowDown
                  className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>
              {resume ? (
                <>
                  <ButtonLink href={resume.view} target="_blank" rel="noopener noreferrer" variant="secondary">
                    View resume
                    <FileText className="size-4" aria-hidden="true" />
                  </ButtonLink>
                  <ButtonLink href={resume.download} variant="ghost" aria-label="Download resume (PDF)">
                    Download
                    <Download className="size-4" aria-hidden="true" />
                  </ButtonLink>
                </>
              ) : null}
            </div>

            <ul className="animate-rise mt-9 flex flex-wrap gap-x-6 gap-y-3" style={delay(360)}>
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    {...(social.platform !== 'email' && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    <SocialIcon platform={social.platform} />
                    <span className="underline decoration-line-strong underline-offset-4 transition-colors group-hover:decoration-ink">
                      {social.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <dl
            className="animate-rise divide-y divide-line rounded-2xl border border-line bg-surface/70 px-5 text-sm shadow-card backdrop-blur-[2px] lg:col-span-5"
            style={delay(440)}
          >
            {profile.map(({ term, detail }) => (
              <div key={term} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-subtle">{term}</dt>
                <dd className="text-ink">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
