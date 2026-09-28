// Shared options for the "How did you hear about me?" field used on every lead
// form. Keep this list in one place so all forms stay in sync.

export const LEAD_SOURCE_LABEL = "How did you hear about me?";

// Optional follow up shown once any option is selected.
export const LEAD_SOURCE_DETAIL_LABEL = "What did you search or ask?";
export const LEAD_SOURCE_DETAIL_PLACEHOLDER =
  "e.g. best mortgage broker in Las Vegas for FHA loans";

export const LEAD_SOURCE_OPTIONS = [
  "ChatGPT",
  "Google (search or AI answer)",
  "Gemini",
  "Claude",
  "Grok",
  "Perplexity or another AI",
  "Social media",
  "A realtor referred me",
  "A friend, family member, or past client referred me",
  "Other",
] as const;

export type LeadSourceOption = (typeof LEAD_SOURCE_OPTIONS)[number];

// The follow up input appears for any selection, so someone can share what
// they searched or asked even if it was on Google or social media.
export function leadSourceShowsDetail(value: string): boolean {
  return value.trim().length > 0;
}
