import type { SocialLink } from './types';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export const site = {
  url: siteUrl,
  name: 'Satish Nikale',
  shortName: 'SN',
  title: 'Full-Stack Software Engineer',
  role: 'Founding Engineer',
  company: 'EzyEV Technologies',
  location: 'Pune, Maharashtra, India',
  shortLocation: 'Pune, India',
  email: 'satishnikale7@gmail.com',
  description:
    'Satish Nikale is a Full-Stack Software Engineer and Founding Engineer at EzyEV Technologies in Pune, building production applications, backend systems and APIs with React, Next.js, Node.js and PostgreSQL.',
  /**
   * Path inside /public. Drop your resume PDF at this location and every
   * "Resume" button on the site appears automatically.
   */
  resumePath: '/Satish_Nikale_Resume.pdf',
  availability: {
    openToRoles: true,
    openToFreelance: true,
  },
  keywords: [
    'Satish Nikale',
    'Full-Stack Developer Pune',
    'Software Engineer Pune',
    'Founding Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
  ],
} as const;

export const socials: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    handle: 'satishnikale',
    href: 'https://github.com/satishnikale',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    handle: 'satishnikale',
    href: 'https://www.linkedin.com/in/satishnikale/',
  },
  {
    platform: 'email',
    label: 'Email',
    handle: site.email,
    href: `mailto:${site.email}`,
  },
];

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;
