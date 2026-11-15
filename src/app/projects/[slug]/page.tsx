import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectKindLabel, ProjectLinks } from '@/components/projects/ProjectCard';
import { ProjectVisual } from '@/components/projects/ProjectVisual';
import { buttonClasses } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { TagList } from '@/components/ui/Tag';
import { getProject, hasCaseStudy, projects } from '@/content/projects';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter(hasCaseStudy).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: path },
    openGraph: { title: project.name, description: project.description, url: path, type: 'article' },
    twitter: { title: project.name, description: project.description },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const project = getProject((await params).slug);
  if (!project || !hasCaseStudy(project)) notFound();

  const studies = projects.filter(hasCaseStudy);
  const next = studies[(studies.indexOf(project) + 1) % studies.length];

  return (
    <article className="pb-24">
      <Container className="pt-10 sm:pt-14">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-10 max-w-3xl animate-rise">
          <ProjectKindLabel project={project} withTagline />
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-muted">{project.description}</p>
          <ProjectLinks project={project} className="mt-6" />
        </header>

        <ProjectVisual
          visual={project.visual}
          className="group mt-12 aspect-[16/9] rounded-2xl border border-line sm:aspect-[2/1]"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="space-y-8 lg:col-span-4" data-reveal>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-subtle">Stack</h2>
              <div className="mt-4">
                <TagList items={project.stack} label={`${project.name} technology stack`} />
              </div>
            </div>
            {project.context ? (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-subtle">Context</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{project.context}</p>
              </div>
            ) : null}
          </aside>

          <section className="lg:col-span-8" aria-labelledby="highlights-heading" data-reveal>
            <h2 id="highlights-heading" className="text-2xl font-semibold tracking-tight">
              Engineering highlights
            </h2>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {project.highlights.map((highlight, i) => (
                <li key={highlight} className="grid grid-cols-[2.5rem_1fr] gap-2 py-5 leading-relaxed">
                  <span className="font-mono text-xs leading-[1.9] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-pretty text-ink-muted">{highlight}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <nav
          aria-label="More projects"
          className="mt-20 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8"
        >
          {next && next.slug !== project.slug ? (
            <Link href={`/projects/${next.slug}`} className="group">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-subtle">Next case study</span>
              <span className="mt-1 flex items-center gap-2 text-xl font-semibold tracking-tight">
                {next.name}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ) : (
            <p className="text-lg font-medium tracking-tight">Want to talk through how this was built?</p>
          )}
          <Link href="/#contact" className={buttonClasses({ variant: 'secondary' })}>
            Get in touch
          </Link>
        </nav>
      </Container>
    </article>
  );
}
