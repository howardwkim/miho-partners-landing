/**
 * Kept separate from posts.ts on purpose. posts.ts imports node:fs, and the
 * listing's category filter is a client component that renders PostRow — so
 * anything PostRow imports ends up in the browser bundle. A formatter living
 * next to the filesystem reader drags node:fs across that line and fails the
 * build.
 */
export function formatDate(iso: string): string {
  // Fixed UTC formatting — the date is a plain calendar date, and letting it
  // resolve against the build machine's timezone can shift it by a day.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
