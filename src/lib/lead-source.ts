// Shared options for the "How did you find me?" field used on every lead form.
// Keep this list in one place so all forms stay in sync.

export const LEAD_SOURCE_LABEL = "How did you find me?";

export const LEAD_SOURCE_OPTIONS = [
  "Google search",
  "ChatGPT",
  "Gemini",
  "Grok",
  "Perplexity",
  "Microsoft Copilot or Bing",
  "Claude",
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "LinkedIn",
  "Agent or realtor referral",
  "Friend or family",
  "Other",
] as const;

export type LeadSourceOption = (typeof LEAD_SOURCE_OPTIONS)[number];

const AGENT_OPTION = "Agent or realtor referral";
const OTHER_OPTION = "Other";

// Options that reveal a short follow up text input.
export function leadSourceNeedsDetail(value: string): boolean {
  return value === AGENT_OPTION || value === OTHER_OPTION;
}

// Label for the follow up input, tailored to the selection.
export function leadSourceDetailLabel(value: string): string {
  if (value === AGENT_OPTION) return "Which agent?";
  return "Tell me more";
}
