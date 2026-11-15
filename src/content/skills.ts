import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'] },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'Apache Kafka', 'Event-driven architecture'],
  },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis'] },
  { category: 'ORM & Validation', items: ['Prisma', 'Mongoose', 'Zod'] },
  {
    category: 'Cloud & DevOps',
    items: ['AWS EC2', 'AWS S3', 'BullMQ', 'GitHub Actions', 'CI/CD', 'Cron Jobs', 'Git', 'Bash'],
  },
  { category: 'Auth & Payments', items: ['JWT', 'bcrypt', 'Razorpay', 'Webhooks'] },
];
