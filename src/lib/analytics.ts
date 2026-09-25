// Thin, safe wrappers around gtag so components never crash when analytics is
// not configured or blocked. Import these anywhere to fire events.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function trackGenerateLead(formName: string, leadSource: string): void {
  trackEvent("generate_lead", {
    form_name: formName,
    lead_source: leadSource || "not_provided",
  });
}

export function trackUploadLoanEstimate(): void {
  trackEvent("upload_loan_estimate");
}
