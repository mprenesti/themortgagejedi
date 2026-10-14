import { format } from "date-fns";

/**
 * Format a blog post's date for display without any timezone shift.
 *
 * Post dates are stored as ISO strings (for example "2026-10-13T00:00:00.000Z").
 * Formatting `new Date(isoString)` in a browser west of UTC rolls the calendar
 * day backward (a post dated the 13th renders as the 12th in US timezones).
 *
 * To avoid that, we read the year, month, and day straight from the first ten
 * characters (YYYY-MM-DD) and build a Date in the local timezone from those
 * parts, so the displayed day always matches the frontmatter date everywhere.
 */
export function formatPostDate(date: string, dateFormat: string): string {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);
  const local = new Date(year, month - 1, day);
  return format(local, dateFormat);
}
