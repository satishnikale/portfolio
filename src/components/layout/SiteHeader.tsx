'use client';

import { Download, FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { navigation, site, socials } from '@/content/site';
import type { ResumeLinks } from '@/lib/resume';
import { cn } from '@/lib/utils';
import { buttonClasses } from '../ui/Button';
import { Container } from '../ui/Container';
import { SocialIcon } from '../ui/SocialIcon';
import { ThemeToggle } from './ThemeToggle';

type SectionId = (typeof navigation)[number]['id'];

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId>('home');

  useEffect(() => {
    if (!enabled) return;
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A thin band across the upper-middle of the viewport decides which section is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function SiteHeader({ resume }: { resume?: ResumeLinks }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const active = useActiveSection(isHome);
  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 8, () => false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    if (!menuOpen) return;
    const { body } = document;
    body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onBreakpoint = () => desktop.matches && setMenuOpen(false);

    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || menuOpen
          ? 'border-line bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/75'
          : 'border-transparent bg-canvas',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-md bg-ink font-mono text-[0.65rem] font-semibold tracking-tight text-canvas transition-transform duration-300 group-hover:-rotate-6"
          >
            {site.shortName}
          </span>
          <span className="text-[0.9375rem] font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {navigation.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={hrefFor(id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-sm transition-colors duration-200',
                      isActive ? 'bg-surface-muted text-ink' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          {resume ? (
            <a
              href={resume.view}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonClasses({ variant: 'secondary', size: 'sm' }), 'hidden sm:inline-flex')}
            >
              Resume
              <FileText className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </a>
          ) : null}
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted md:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-canvas md:hidden"
      >
        <Container className="flex min-h-full flex-col justify-between py-8">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-y border-line">
              {navigation.map(({ id, label }, i) => (
                <li key={id} className="animate-rise" style={{ '--delay': `${i * 35}ms` } as CSSProperties}>
                  <a
                    href={hrefFor(id)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === id ? 'true' : undefined}
                    className="flex items-baseline justify-between py-4 text-2xl font-medium tracking-tight"
                  >
                    {label}
                    <span className="font-mono text-xs text-ink-subtle">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 space-y-6">
            {resume ? (
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={resume.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonClasses({ variant: 'primary' }), 'w-full')}
                >
                  View resume
                  <FileText className="size-4" aria-hidden="true" />
                </a>
                <a href={resume.download} className={cn(buttonClasses({ variant: 'secondary' }), 'w-full')}>
                  Download
                  <Download className="size-4" aria-hidden="true" />
                </a>
              </div>
            ) : null}
            <ul className="flex gap-5 text-ink-muted">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    {...(social.platform !== 'email' && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex items-center gap-2 text-sm hover:text-ink"
                  >
                    <SocialIcon platform={social.platform} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </header>
  );
}
