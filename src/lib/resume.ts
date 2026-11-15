import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '@/content/site';

/**
 * Server-only. Resolved at build time: returns the resume URL only when the
 * file actually exists in /public, so the site never links to a 404.
 */
export function getResumeHref(): string | undefined {
  return existsSync(join(process.cwd(), 'public', site.resumePath)) ? site.resumePath : undefined;
}
