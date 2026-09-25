// Scheduled publishing helpers.
//
// A post's frontmatter date (a bare YAML date like 2026-09-29) parses as UTC
// midnight, so we read its calendar year, month and day and treat the actual
// publish moment as 8:00 AM in America/Los_Angeles on that day. Daylight
// saving is handled correctly by deriving the zone offset with Intl, so no
// extra dependencies are needed.

const LA_TIME_ZONE = "America/Los_Angeles";
const PUBLISH_HOUR = 8;

// Offset in milliseconds of the given time zone relative to UTC at `date`.
// Positive east of UTC, negative west (Los Angeles is negative).
function timeZoneOffsetMs(timeZone: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const map: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second),
  );
  return asUtc - date.getTime();
}

// The exact UTC instant a post goes live: 8:00 AM Pacific on its frontmatter
// calendar day, adjusted for daylight saving.
export function laPublishInstant(date: string | Date): Date {
  const d = typeof date === "string" ? new Date(date) : date;
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const day = d.getUTCDate();

  // Start by treating 8:00 AM as if it were UTC, then correct by the zone
  // offset. A second pass keeps us accurate right around a DST transition.
  const guess = Date.UTC(year, month, day, PUBLISH_HOUR, 0, 0);
  let instant = guess - timeZoneOffsetMs(LA_TIME_ZONE, new Date(guess));
  instant = guess - timeZoneOffsetMs(LA_TIME_ZONE, new Date(instant));
  return new Date(instant);
}

// True once the post's publish moment has arrived (relative to `now`).
export function isPublishedAt(date: string | Date, now: Date = new Date()): boolean {
  return laPublishInstant(date).getTime() <= now.getTime();
}

// Future-dated posts are shown in local development and on Vercel preview
// deployments (VERCEL_ENV === "preview") so they can be reviewed, but hidden
// in production until their publish moment.
export function shouldShowFuturePosts(): boolean {
  if (process.env.VERCEL_ENV === "preview") return true;
  return process.env.NODE_ENV !== "production";
}
