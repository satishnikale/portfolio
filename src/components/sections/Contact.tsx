import { ArrowUpRight, MapPin } from 'lucide-react';
import { site, socials } from '@/content/site';
import { ContactForm } from '../contact/ContactForm';
import { CopyEmailButton } from '../contact/CopyEmailButton';
import { StatusDot } from '../ui/AvailabilityBadge';
import { Section } from '../ui/Section';
import { SocialIcon } from '../ui/SocialIcon';

export function Contact() {
  return (
    <Section
      id="contact"
      index="07"
      label="Contact"
      title={
        <>
          Have an interesting idea?{' '}
          <span className="font-serif font-normal italic tracking-[-0.01em] text-accent">Let’s build something together.</span>
        </>
      }
      intro="I’m always interested in connecting with engineers, founders, recruiters and people building interesting products."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-6 lg:col-span-4" data-reveal>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="flex items-center gap-2.5 text-sm font-medium">
              <StatusDot />
              Currently available
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
              {site.availability.openToRoles ? <li>Full-time software engineering roles</li> : null}
              {site.availability.openToFreelance ? <li>Freelance projects and contract work</li> : null}
            </ul>
          </div>

          <ul className="divide-y divide-line border-y border-line">
            {socials.map((social) => (
              <li key={social.platform} className="group relative flex items-center gap-4 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-muted transition-colors group-hover:text-ink">
                  <SocialIcon platform={social.platform} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-subtle">{social.label}</p>
                  <a
                    href={social.href}
                    {...(social.platform !== 'email' && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="stretched-link block truncate text-[0.9375rem] text-ink focus-visible:outline-none"
                  >
                    {social.handle}
                  </a>
                </div>
                {social.platform === 'email' ? (
                  <CopyEmailButton email={site.email} />
                ) : (
                  <ArrowUpRight
                    className="size-4 text-ink-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
            <li className="flex items-center gap-4 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-muted">
                <MapPin className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-subtle">Location</p>
                <p className="text-[0.9375rem]">{site.shortLocation}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8 lg:col-span-8" data-reveal>
          <ContactForm email={site.email} />
        </div>
      </div>
    </Section>
  );
}
