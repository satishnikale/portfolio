import { education } from '@/content/background';
import { site, socials } from '@/content/site';

/** schema.org Person, rendered as JSON-LD on the home page. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: site.title,
    worksFor: { '@type': 'Organization', name: site.company },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    alumniOf: education.map((entry) => ({ '@type': 'CollegeOrUniversity', name: entry.institution })),
    knowsAbout: ['Full-stack development', 'Backend engineering', 'React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    sameAs: socials.filter((social) => social.platform !== 'email').map((social) => social.href),
  };
}

/** Serialises JSON-LD safely for inlining inside a <script> tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
