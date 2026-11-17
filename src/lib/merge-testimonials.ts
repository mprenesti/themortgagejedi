import type { Testimonial } from "@/lib/data";

const DUPLICATE_THRESHOLD = 0.6;

export function quoteWordSet(quote: string): Set<string> {
  return new Set(
    quote
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter(Boolean)
  );
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  const aWords = Array.from(a);
  let intersection = 0;
  for (let i = 0; i < aWords.length; i += 1) {
    if (b.has(aWords[i])) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function quotesAreDuplicates(a: string, b: string): boolean {
  return jaccard(quoteWordSet(a), quoteWordSet(b)) >= DUPLICATE_THRESHOLD;
}

function namesMatch(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

/**
 * Fold manual pins into the live Google list. If Places already returned
 * the same review (same author name or Jaccard ≥ 0.6 on the quote), keep
 * the API copy and drop the pin so it never appears twice.
 */
export function mergePinnedWithLive(
  pinned: readonly Testimonial[],
  live: readonly Testimonial[]
): Testimonial[] {
  const extra = pinned.filter((pin) => {
    return !live.some(
      (review) =>
        namesMatch(review.name, pin.name) ||
        quotesAreDuplicates(review.quote, pin.quote)
    );
  });
  return [...live, ...extra];
}

function reviewTime(t: Testimonial): number {
  if (typeof t.publishedAt === "number" && !Number.isNaN(t.publishedAt)) {
    return t.publishedAt;
  }
  const year = Number(t.date);
  if (year) return Date.UTC(year, 0, 1);
  return 0;
}

/**
 * Drop hardcoded quotes that duplicate a Google review (Jaccard ≥ 0.6),
 * keep the Google copy, then sort the merged list newest-first by review
 * time. Year-only hardcoded dates count as Jan 1 of that year so dated
 * Google reviews in the same year stay ahead of them. Does not mutate
 * `hardcoded`.
 */
export function mergeTestimonials(
  hardcoded: readonly Testimonial[],
  google: readonly Testimonial[]
): Testimonial[] {
  const dropped = new Set<number>();
  for (const review of google) {
    for (let i = 0; i < hardcoded.length; i += 1) {
      if (dropped.has(i)) continue;
      if (quotesAreDuplicates(review.quote, hardcoded[i].quote)) {
        dropped.add(i);
      }
    }
  }

  const remaining = hardcoded.filter((_, i) => !dropped.has(i));
  const merged = [...google, ...remaining];
  return merged.sort((a, b) => {
    const delta = reviewTime(b) - reviewTime(a);
    if (delta !== 0) return delta;
    const aGoogle = a.source === "google" ? 1 : 0;
    const bGoogle = b.source === "google" ? 1 : 0;
    return bGoogle - aGoogle;
  });
}
