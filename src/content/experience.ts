import type { Company } from './types';

export const experience: Company[] = [
  {
    name: 'EzyEV Technologies Pvt. Ltd.',
    roles: [
      {
        title: 'Founding Engineer',
        start: '2026-06',
        end: 'present',
        location: 'Pune, India',
        summary:
          'End-to-end product development across backend services, data pipelines, payments, authentication and cloud infrastructure.',
        highlights: [
          'Built an internal reporting system with Node.js, BullMQ, Redis, cron jobs and Apache Kafka, integrating IoT APIs to calculate rider kilometres travelled and energy consumption.',
          'Migrated 200+ Supabase client-side queries to dedicated backend APIs, establishing a centralised, API-driven architecture.',
          'Integrated Razorpay payment infrastructure covering order creation, payment verification and webhook handling.',
          'Optimised the Supabase Edge Functions that handle rider battery swaps, reducing execution time by roughly 60%.',
          'Implemented end-to-end JWT authentication, session management and role-based access control.',
          'Implemented cursor-based pagination for high-volume PostgreSQL / Supabase queries.',
          'Deployed backend services on AWS EC2, integrated Amazon S3 and set up CI/CD pipelines with GitHub Actions.',
        ],
        stack: [
          'Node.js',
          'TypeScript',
          'PostgreSQL',
          'Supabase',
          'Redis',
          'BullMQ',
          'Apache Kafka',
          'Razorpay',
          'AWS',
          'GitHub Actions',
        ],
      },
      {
        title: 'Software Engineer Intern',
        start: '2025-12',
        end: '2026-06',
        location: 'Pune, India',
        highlights: [
          'Contributed to full-stack development using React, Next.js, Node.js and TypeScript.',
          'Developed and maintained backend APIs and fixed application bugs.',
          'Collaborated with engineering and operations teams.',
        ],
        stack: ['React', 'Next.js', 'Node.js', 'TypeScript'],
      },
    ],
  },
];
