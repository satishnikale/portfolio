import { site } from '@/content/site';

export interface ResumeLinks {
  /** Opens Google Drive's PDF preview. */
  view: string;
  /** Downloads the file directly. */
  download: string;
}

/** Pulls the file ID out of the common Drive link shapes (`/file/d/<id>/…` or `?id=<id>`). */
function driveFileId(url: string): string | undefined {
  return url.match(/\/file\/d\/([\w-]+)/)?.[1] ?? url.match(/[?&]id=([\w-]+)/)?.[1];
}

/** Returns resume links when a valid Drive link is configured, so the site never shows a dead button. */
export function getResumeLinks(): ResumeLinks | undefined {
  const id = driveFileId(site.resumeDriveUrl);
  if (!id) return undefined;
  return {
    view: `https://drive.google.com/file/d/${id}/view`,
    download: `https://drive.google.com/uc?export=download&id=${id}`,
  };
}
