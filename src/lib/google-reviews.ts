import type { Testimonial } from "@/lib/data";
import { TESTIMONIALS } from "@/lib/data";
import { mergeTestimonials } from "@/lib/merge-testimonials";

type GooglePlaceReview = {
  rating: number;
  text?: { text: string };
  authorAttribution?: { displayName: string; uri?: string };
  publishTime?: string;
};

/**
 * Places API (New) Place Details returns at most 5 reviews, sorted by
 * Google's "most relevant" ranking. Get Place has no reviews_sort /
 * newest query param (only languageCode, regionCode, sessionToken), so
 * we cannot request newest-from-Google. We still sort the 5 we get by
 * publishTime, newest first, after fetch.
 */
export async function getGoogleReviews(): Promise<Testimonial[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return [];
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews",
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      console.error("Google Places API error:", res.status);
      return [];
    }

    const data = await res.json();
    const reviews: GooglePlaceReview[] = data.reviews ?? [];

    return reviews
      .filter((r) => r.text?.text)
      .map((r) => {
        const publishedAt = r.publishTime
          ? Date.parse(r.publishTime)
          : undefined;
        return {
          quote: r.text!.text,
          name: r.authorAttribution?.displayName ?? "Google Reviewer",
          date:
            publishedAt && !Number.isNaN(publishedAt)
              ? new Date(publishedAt).getUTCFullYear().toString()
              : undefined,
          rating: r.rating,
          source: "google" as const,
          publishedAt:
            publishedAt && !Number.isNaN(publishedAt) ? publishedAt : undefined,
          authorUri: r.authorAttribution?.uri,
        };
      });
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return [];
  }
}

export async function getDisplayTestimonials(): Promise<Testimonial[]> {
  const googleReviews = await getGoogleReviews();
  return mergeTestimonials(TESTIMONIALS, googleReviews);
}
