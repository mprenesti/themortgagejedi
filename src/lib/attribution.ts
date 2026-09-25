// Session based traffic attribution, with special handling for AI search
// engines. Runs on the client only. Values are cached in sessionStorage so
// they survive in-session navigation and can be read by lead forms.

export type AiSource =
  | "chatgpt"
  | "gemini"
  | "grok"
  | "perplexity"
  | "copilot"
  | "claude"
  | "other_ai";

export type Attribution = {
  aiSource: AiSource | null;
  leadSourceAuto: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

const SS_KEY = "tmj_attribution";

// Case-insensitive AI engine matcher. Mirrors the pattern in the spec.
const AI_PATTERN =
  /chatgpt\.com|chat\.openai\.com|openai\.com|gemini\.google\.com|bard\.google\.com|perplexity\.ai|grok\.com|x\.ai|copilot\.microsoft\.com|bing\.com\/chat|claude\.ai|you\.com|meta\.ai|deepseek\.com|poe\.com/i;

function engineFor(value: string): AiSource | null {
  if (!value) return null;
  const v = value.toLowerCase();
  if (!AI_PATTERN.test(v)) return null;
  if (/chatgpt\.com|chat\.openai\.com|openai\.com/.test(v)) return "chatgpt";
  if (/gemini\.google\.com|bard\.google\.com/.test(v)) return "gemini";
  if (/grok\.com|x\.ai/.test(v)) return "grok";
  if (/perplexity\.ai/.test(v)) return "perplexity";
  if (/copilot\.microsoft\.com|bing\.com\/chat/.test(v)) return "copilot";
  if (/claude\.ai/.test(v)) return "claude";
  return "other_ai";
}

// A utm_source can also name an engine directly (for example "chatgpt").
function engineFromUtm(utmSource: string): AiSource | null {
  const v = utmSource.trim().toLowerCase();
  const known: AiSource[] = [
    "chatgpt",
    "gemini",
    "grok",
    "perplexity",
    "copilot",
    "claude",
  ];
  if (known.includes(v as AiSource)) return v as AiSource;
  return engineFor(v);
}

function hostFromReferrer(referrer: string): string {
  try {
    return new URL(referrer).host;
  } catch {
    return "";
  }
}

function read(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function write(a: Attribution): void {
  try {
    sessionStorage.setItem(SS_KEY, JSON.stringify(a));
  } catch {
    // sessionStorage may be unavailable (privacy mode); fail silently.
  }
}

// Computes attribution once per session and caches it. Safe to call repeatedly.
export function initAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {
      aiSource: null,
      leadSourceAuto: "direct",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    };
  }

  const existing = read();
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") ?? "";
  const utmMedium = params.get("utm_medium") ?? "";
  const utmCampaign = params.get("utm_campaign") ?? "";
  const referrer = document.referrer ?? "";

  const aiSource = engineFromUtm(utmSource) ?? engineFor(referrer);

  let leadSourceAuto: string;
  if (aiSource) {
    leadSourceAuto = aiSource;
  } else if (referrer) {
    leadSourceAuto = hostFromReferrer(referrer) || "direct";
  } else {
    leadSourceAuto = "direct";
  }

  const attribution: Attribution = {
    aiSource,
    leadSourceAuto,
    utmSource,
    utmMedium,
    utmCampaign,
  };
  write(attribution);
  return attribution;
}

// Returns the cached auto lead source, computing it if needed.
export function getLeadSourceAuto(): string {
  const a = read() ?? initAttribution();
  return a.leadSourceAuto || "direct";
}

// Returns the cached attribution, computing it if needed.
export function getAttribution(): Attribution {
  return read() ?? initAttribution();
}
