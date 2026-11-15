import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'excalidraw',
    name: 'Excalidraw – Collaborative Whiteboard',
    tagline: 'Real-time multi-user drawing',
    description:
      'A real-time collaborative whiteboard where multiple users draw on the same canvas, with every stroke synchronised across clients over WebSockets.',
    kind: 'personal',
    stack: ['Next.js', 'WebSockets', 'PostgreSQL', 'Prisma', 'Turborepo'],
    highlights: [
      'Real-time collaboration over WebSockets, from client-side canvas rendering to server-side event handling.',
      'Under 200ms latency through real-time event handling.',
      'PostgreSQL schema designed with Prisma to persist canvas state, sessions and history.',
      'JWT-based authentication and authorisation for drawing sessions.',
      'Optimised Turborepo monorepo workflows, reducing build time by roughly 40%.',
    ],
    links: {
      // VERIFY: carried over from the previous portfolio; confirm the repository is public.
      github: 'https://github.com/satishnikale/excalidraw',
    },
    visual: 'whiteboard',
  },
  {
    slug: 'ezyev-reporting-system',
    name: 'EzyEV Reporting System',
    tagline: 'Event-driven reporting pipeline',
    description:
      'An internal reporting system that processes rider activity and battery usage data and generates business reports on a schedule.',
    kind: 'professional',
    context:
      'Built as part of my role at EzyEV Technologies. The source code is proprietary, so there is no public repository or demo.',
    stack: ['Node.js', 'TypeScript', 'Redis', 'BullMQ', 'Apache Kafka', 'PostgreSQL'],
    highlights: [
      'Background job processing, keeping heavy report generation out of the request–response cycle.',
      'Scheduled report generation driven by cron jobs.',
      'Kafka-based, event-driven processing.',
      'Redis-backed job queues with BullMQ.',
      'IoT API integrations for vehicle and battery telemetry.',
      'Rider kilometre and energy consumption calculations.',
    ],
    links: {},
    visual: 'pipeline',
  },
  {
    slug: 'review-ai',
    name: 'Review AI',
    tagline: 'AI-assisted pull request review',
    description:
      'An AI-powered code review application designed to analyse GitHub pull requests and provide automated review feedback.',
    kind: 'personal',
    stack: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Gemini'],
    /*
     * TODO: Add highlights only for features that exist in the Review AI
     * codebase, plus the GitHub / live URLs once confirmed. A case-study page
     * is generated automatically once highlights are present.
     */
    highlights: [],
    links: {},
    visual: 'review',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Only projects with verified detail get a dedicated case-study page. */
export function hasCaseStudy(project: Project) {
  return project.highlights.length > 0;
}
