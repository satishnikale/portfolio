import { About } from '@/components/sections/About';
import { Background } from '@/components/sections/Background';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { getResumeLinks } from '@/lib/resume';
import { personJsonLd, serializeJsonLd } from '@/lib/structured-data';

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }} />
      <Hero resume={getResumeLinks()} />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Background />
      <Contact />
    </>
  );
}
