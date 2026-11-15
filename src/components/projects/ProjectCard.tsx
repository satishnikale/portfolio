import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { hasCaseStudy } from '@/content/projects';
import type { Project } from '@/content/types';
import { cn } from '@/lib/utils';
import { SocialIcon } from '../ui/SocialIcon';
import { TagList } from '../ui/Tag';
import { ProjectVisual } from './ProjectVisual';

export function ProjectKindLabel({ project, withTagline = false }: { project: Project; withTagline?: boolean }) {
  const professional = project.kind === 'professional';
  return (
    <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-subtle">
      <span className={cn('mr-2 inline-block size-1.5 rounded-full align-middle', professional ? 'bg-accent' : 'bg-ink-subtle')} />
      {professional ? 'Professional work · EzyEV' : 'Personal project'}
      {withTagline ? (
        <>
          <span aria-hidden="true"> · </span>
          {project.tagline}
        </>
      ) : null}
    </p>
  );
}

export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const { github, live } = project.links;
  if (!github && !live) return null;
  return (
    <ul className={cn('relative z-10 flex flex-wrap gap-4 text-sm', className)}>
      {github ? (
        <li>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-ink"
          >
            <SocialIcon platform="github" className="size-3.5" />
            Source
            <span className="sr-only"> code for {project.name} (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
      {live ? (
        <li>
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-ink"
          >
            Live demo
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
            <span className="sr-only"> of {project.name} (opens in a new tab)</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const caseStudy = hasCaseStudy(project);

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 ease-out-soft hover:border-line-strong hover:shadow-card',
        caseStudy && 'motion-safe:hover:-translate-y-0.5',
        featured && 'lg:grid lg:grid-cols-12',
      )}
      data-reveal
    >
      <ProjectVisual
        visual={project.visual}
        className={cn(
          'aspect-[5/3] border-b border-line',
          featured && 'lg:col-span-7 lg:aspect-auto lg:min-h-[22rem] lg:border-b-0 lg:border-r',
        )}
      />

      <div className={cn('flex flex-1 flex-col p-6 sm:p-7', featured && 'lg:col-span-5 lg:p-9')}>
        <ProjectKindLabel project={project} />

        <h3 className={cn('mt-3 font-semibold tracking-tight', featured ? 'text-2xl sm:text-[1.75rem]' : 'text-xl')}>
          {caseStudy ? (
            <Link href={`/projects/${project.slug}`} className="stretched-link focus-visible:outline-none">
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </h3>

        <p className="mt-3 text-pretty leading-relaxed text-ink-muted">{project.description}</p>

        {featured && project.highlights.length > 0 ? (
          <ul className="mt-5 space-y-2 text-sm text-ink-muted">
            {project.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="relative pl-4">
                <span aria-hidden="true" className="absolute left-0 top-[0.65em] size-1 rounded-full bg-accent" />
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6">
          <TagList items={project.stack} label={`${project.name} technology stack`} />
        </div>

        {project.context ? <p className="mt-5 text-sm italic leading-relaxed text-ink-subtle">{project.context}</p> : null}

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <ProjectLinks project={project} />
          {caseStudy ? (
            <span
              aria-hidden="true"
              className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors group-hover:text-accent"
            >
              Case study
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
