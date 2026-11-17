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

/**
 * Google reviews first (newest `publishedAt` first), then hardcoded entries
 * that are not duplicates of any Google review, in their original order.
 * Does not mutate `hardcoded`.
 */
export function mergeTestimonials(
  hardcoded: readonly Testimonial[],
  google: readonly Testimonial[]
): Testimonial[] {
  const googleSorted = [...google].sort(
    (a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0)
  );

  const dropped = new Set<number>();
  for (const review of googleSorted) {
    for (let i = 0; i < hardcoded.length; i += 1) {
      if (dropped.has(i)) continue;
      if (quotesAreDuplicates(review.quote, hardcoded[i].quote)) {
        dropped.add(i);
      }
    }
  }

  const remaining = hardcoded.filter((_, i) => !dropped.has(i));
  return [...googleSorted, ...remaining];
}
