"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/constants";
import { initAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

function bookingHost(): string {
  try {
    return new URL(SITE.bookingUrl).host;
  } catch {
    return "";
  }
}

export default function Analytics() {
  useEffect(() => {
    // Compute AI / referral attribution once per session and, when an AI
    // engine is detected, attach it as a GA4 user property.
    const attribution = initAttribution();
    if (attribution.aiSource && typeof window.gtag === "function") {
      window.gtag("set", "user_properties", {
        ai_source: attribution.aiSource,
      });
    }

    const host = bookingHost();

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest("a, button") as HTMLElement | null;
      if (!el) return;

      const href = el.getAttribute("href") ?? "";
      const text = (el.textContent ?? "").trim().toLowerCase();

      if (href.startsWith("tel:")) {
        trackEvent("click_call", { link_url: href });
        return;
      }
      if (href.startsWith("sms:")) {
        trackEvent("click_text", { link_url: href });
        return;
      }
      if (/(^|\/)apply(\/|$|\?)/.test(href) || text.includes("apply now")) {
        trackEvent("click_apply", { link_text: text });
        return;
      }
      const isBookingLink = host !== "" && href.includes(host);
      const isGetStarted = /(^|\/)get-started(\/|$|\?)/.test(href);
      if (
        isBookingLink ||
        isGetStarted ||
        text.includes("book a call") ||
        text.includes("book a consultation") ||
        text.includes("book your consultation")
      ) {
        trackEvent("click_book", { link_text: text });
        return;
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
