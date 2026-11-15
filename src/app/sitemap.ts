import type { MetadataRoute } from 'next';
import { hasCaseStudy, projects } from '@/content/projects';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    ...projects.filter(hasCaseStudy).map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
