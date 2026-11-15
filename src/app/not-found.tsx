import Link from 'next/link';
import { buttonClasses } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-md text-ink-muted">The link may be outdated, or the page may have moved.</p>
      <Link href="/" className={`${buttonClasses()} mt-8`}>
        Back to home
      </Link>
    </Container>
  );
}
