import type { Testimonial } from "@/lib/data";
import { TESTIMONIALS } from "@/lib/data";
import {
  mergePinnedWithLive,
  mergeTestimonials,
} from "@/lib/merge-testimonials";

/**
 * Real Google reviews that Places has not returned yet (newest-five cap
 * or API lag). Same shape as a live Google card. When Places later
 * returns the same review, mergePinnedWithLive drops the pin and keeps
 * the API copy.
 */
export const PINNED_GOOGLE_REVIEWS: Testimonial[] = [
  {
    quote:
      "Mike is so great to work with! Second time we've used him and he delivered fast results both times. He's quick to respond to all messages and super knowledgeable. Highly recommend him and his team!",
    name: "Leticia Davidson",
    date: "November 2026",
    rating: 5,
    source: "google",
    publishedAt: Date.UTC(2026, 10, 16),
  },
];

const REVALIDATE = { next: { revalidate: 86400 } } as const;

type LegacyPlaceReview = {
  rating?: number;
  text?: string;
  author_name?: string;
  author_url?: string;
  time?: number;
};

type LegacyPlaceDetailsResponse = {
  status?: string;
  error_message?: string;
  result?: { reviews?: LegacyPlaceReview[] };
};

type NewPlaceReview = {
  rating: number;
  text?: { text: string };
  authorAttribution?: { displayName: string; uri?: string };
  publishTime?: string;
};

function rawPlaceId(placeId: string): string {
  return placeId.startsWith("places/") ? placeId.slice("places/".length) : placeId;
}

function mapReview(input: {
  quote: string;
  name: string;
  rating?: number;
  publishedAt?: number;
  authorUri?: string;
}): Testimonial {
  const publishedAt =
    input.publishedAt && !Number.isNaN(input.publishedAt)
      ? input.publishedAt
      : undefined;
  return {
    quote: input.quote,
    name: input.name,
    date: publishedAt
      ? new Date(publishedAt).getUTCFullYear().toString()
      : undefined,
    rating: input.rating,
    source: "google",
    publishedAt,
    authorUri: input.authorUri,
  };
}

function mapLegacyReviews(reviews: LegacyPlaceReview[]): Testimonial[] {
  return reviews
    .filter((r) => r.text)
    .map((r) =>
      mapReview({
        quote: r.text!,
        name: r.author_name ?? "Google Reviewer",
        rating: r.rating,
        publishedAt:
          typeof r.time === "number" ? r.time * 1000 : undefined,
        authorUri: r.author_url,
      })
    );
}

function mapNewReviews(reviews: NewPlaceReview[]): Testimonial[] {
  return reviews
    .filter((r) => r.text?.text)
    .map((r) =>
      mapReview({
        quote: r.text!.text,
        name: r.authorAttribution?.displayName ?? "Google Reviewer",
        rating: r.rating,
        publishedAt: r.publishTime ? Date.parse(r.publishTime) : undefined,
        authorUri: r.authorAttribution?.uri,
      })
    );
}

function shouldFallbackToNewApi(status: string, errorMessage?: string): boolean {
  const message = (errorMessage ?? "").toLowerCase();
  return (
    status === "REQUEST_DENIED" ||
    message.includes("not enabled") ||
    message.includes("access not configured") ||
    message.includes("has not been used")
  );
}

async function fetchLegacyNewestReviews(
  apiKey: string,
  placeId: string
): Promise<{ reviews: Testimonial[]; fallback: boolean }> {
  const params = new URLSearchParams({
    place_id: rawPlaceId(placeId),
    fields: "reviews,rating,user_ratings_total",
    reviews_sort: "newest",
    key: apiKey,
  });
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`,
    REVALIDATE
  );

  if (!res.ok) {
    const denied = res.status === 403;
    if (denied) {
      console.error(
        "Enable the Places API (legacy Place Details) on this Google Cloud project; Place Details reviews_sort=newest returned REQUEST_DENIED. Falling back to Places API (New)."
      );
      return { reviews: [], fallback: true };
    }
    console.error("Google Place Details API HTTP error:", res.status);
    return { reviews: [], fallback: false };
  }

  const data = (await res.json()) as LegacyPlaceDetailsResponse;
  const status = data.status ?? "UNKNOWN";

  if (status === "OK") {
    return { reviews: mapLegacyReviews(data.result?.reviews ?? []), fallback: false };
  }

  if (shouldFallbackToNewApi(status, data.error_message)) {
    console.error(
      "Enable the Places API (legacy Place Details) on this Google Cloud project; Place Details reviews_sort=newest returned REQUEST_DENIED. Falling back to Places API (New)."
    );
    return { reviews: [], fallback: true };
  }

  console.error("Google Place Details API error:", status);
  return { reviews: [], fallback: false };
}

async function fetchNewRelevantReviews(
  apiKey: string,
  placeId: string
): Promise<Testimonial[]> {
  const id = rawPlaceId(placeId);
  const res = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "reviews",
    },
    ...REVALIDATE,
  });

  if (!res.ok) {
    console.error("Google Places API (New) error:", res.status);
    return [];
  }

  const data = await res.json();
  return mapNewReviews(data.reviews ?? []);
}

export async function getGoogleReviews(): Promise<Testimonial[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return [];
  }

  try {
    const legacy = await fetchLegacyNewestReviews(apiKey, placeId);
    if (!legacy.fallback) {
      return legacy.reviews;
    }
    return await fetchNewRelevantReviews(apiKey, placeId);
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return [];
  }
}

export async function getDisplayTestimonials(): Promise<Testimonial[]> {
  const liveGoogleReviews = await getGoogleReviews();
  const googleReviews = mergePinnedWithLive(
    PINNED_GOOGLE_REVIEWS,
    liveGoogleReviews
  );
  return mergeTestimonials(TESTIMONIALS, googleReviews);
}
