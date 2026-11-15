import { projects } from '@/content/projects';
import { ProjectCard } from '../projects/ProjectCard';
import { Section } from '../ui/Section';

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <Section
      id="projects"
      index="03"
      label="Projects"
      title="Selected work."
      intro="Real-time systems, event-driven pipelines and developer tooling — a mix of personal projects and production work, labelled as such."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
        <div className="md:col-span-2">
          <ProjectCard project={featured} featured />
        </div>
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
