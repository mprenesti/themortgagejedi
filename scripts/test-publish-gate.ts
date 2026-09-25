// Verifies the scheduled publishing gate at boundary times, including a
// daylight saving transition. Run with:
//   node --experimental-strip-types scripts/test-publish-gate.ts
//
// It imports the real helpers so the test exercises production logic.

import { laPublishInstant, isPublishedAt } from "../src/lib/publish-schedule.ts";

let failures = 0;

function check(label: string, actual: boolean, expected: boolean): void {
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label} (got ${actual}, expected ${expected})`);
}

console.log("Publish instant (UTC) for sample dates:");
console.log("  2026-09-29 ->", laPublishInstant("2026-09-29").toISOString(), "(expect 15:00Z, PDT)");
console.log("  2026-10-30 ->", laPublishInstant("2026-10-30").toISOString(), "(expect 15:00Z, PDT)");
console.log("  2026-11-05 ->", laPublishInstant("2026-11-05").toISOString(), "(expect 16:00Z, PST)");
console.log("");

// September 29, 2026 is during PDT (UTC-7): 8:00 AM Pacific = 15:00 UTC.
check(
  "2026-09-29 at 07:59 Pacific -> hidden",
  isPublishedAt("2026-09-29", new Date("2026-09-29T07:59:00-07:00")),
  false,
);
check(
  "2026-09-29 at 08:00 Pacific -> visible",
  isPublishedAt("2026-09-29", new Date("2026-09-29T08:00:00-07:00")),
  true,
);

// Across the November DST change (PDT ends, PST begins). A post dated
// 2026-11-05 publishes at 8:00 AM PST = 16:00 UTC, not 15:00 UTC.
check(
  "2026-11-05 at 07:59 Pacific (PST) -> hidden",
  isPublishedAt("2026-11-05", new Date("2026-11-05T07:59:00-08:00")),
  false,
);
check(
  "2026-11-05 at 08:00 Pacific (PST) -> visible",
  isPublishedAt("2026-11-05", new Date("2026-11-05T08:00:00-08:00")),
  true,
);

// Sanity: the publish instant shifts by one hour across the DST boundary.
const pdtHour = laPublishInstant("2026-10-30").getUTCHours();
const pstHour = laPublishInstant("2026-11-05").getUTCHours();
check("PDT publish hour is 15:00 UTC", pdtHour === 15, true);
check("PST publish hour is 16:00 UTC", pstHour === 16, true);

// Batch 1 posts (dated 2026-09-25) must be live well before today.
check(
  "batch 1 post 2026-09-25 visible as of 2026-09-25 10:00 Pacific",
  isPublishedAt("2026-09-25", new Date("2026-09-25T10:00:00-07:00")),
  true,
);

console.log("");
console.log(failures === 0 ? "==== ALL PASS ====" : `==== ${failures} FAILURE(S) ====`);
process.exit(failures === 0 ? 0 : 1);
