import { ArrowUp } from 'lucide-react';
import { navigation, site, socials } from '@/content/site';
import { Container } from '../ui/Container';
import { SocialIcon } from '../ui/SocialIcon';

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div>
            <p className="text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {site.title} · {site.shortLocation}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm text-ink-muted sm:grid-cols-3">
              {navigation.map(({ id, label }) => (
                <li key={id}>
                  <a href={`/#${id}`} className="transition-colors hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-6 text-sm text-ink-subtle sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. Built with Next.js and Tailwind CSS.
          </p>
          <div className="flex items-center gap-1">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                aria-label={social.label}
                {...(social.platform !== 'email' && { target: '_blank', rel: 'noopener noreferrer' })}
                className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-surface-muted hover:text-ink"
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
            <a
              href="#main"
              aria-label="Back to top"
              className="ml-2 inline-flex size-9 items-center justify-center rounded-full border border-line transition-colors hover:border-line-strong hover:text-ink"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
