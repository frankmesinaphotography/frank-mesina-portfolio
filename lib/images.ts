// Minimal image-serving helper. When NEXT_PUBLIC_IMAGE_BASE is set (Preview
// and Production, via Vercel env vars), images resolve to the R2 bucket
// instead of the local public/ folder — same idea as the photography site's
// getGalleryImages.ts, right-sized: no manifest/symlink machinery, since
// this project's images are just files added directly, not an external
// archive to sync.
export function imageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_IMAGE_BASE || ''
  const withSlash = path.startsWith('/') ? path : `/${path}`
  return `${base}${withSlash}`
}
