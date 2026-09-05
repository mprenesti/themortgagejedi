import type { Testimonial } from "@/lib/data";

type GooglePlaceReview = {
  rating: number;
  text?: { text: string };
  authorAttribution?: { displayName: string };
  publishTime?: string;
};

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
      .map((r) => ({
        quote: r.text!.text,
        name: r.authorAttribution?.displayName ?? "Google Reviewer",
        date: r.publishTime
          ? new Date(r.publishTime).getFullYear().toString()
          : undefined,
        rating: r.rating,
        source: "google" as const,
      }));
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return [];
  }
}
