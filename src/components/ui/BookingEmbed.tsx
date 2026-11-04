"use client";

import { useEffect } from "react";
import Script from "next/script";
import { SITE } from "@/lib/constants";

const GHL_FORM_EMBED_SRC = "https://link.msgsndr.com/js/form_embed.js";

function ghlBookingWidgetId(bookingUrl: string): string {
  try {
    const id = new URL(bookingUrl).pathname.split("/").filter(Boolean).pop();
    return id || "booking-iframe";
  } catch {
    return "booking-iframe";
  }
}

type IFrameResizeFn = (
  options: Record<string, unknown>,
  target: HTMLElement,
) => void;

function applyResize(iframe: HTMLElement) {
  const resize = (window as Window & { iFrameResize?: IFrameResizeFn })
    .iFrameResize;
  if (typeof resize !== "function") return;
  if (iframe.getAttribute("data-iframe-resizer-initialized") === "true") return;

  resize(
    {
      log: false,
      checkOrigin: false,
      enablePublicMethods: true,
      scrolling: true,
      autoResize: true,
      sizeHeight: true,
      sizeWidth: false,
      heightCalculationMethod: "offset",
    },
    iframe,
  );
}

function revealIframe(iframe: HTMLIFrameElement) {
  const style = iframe.style;
  if (style.opacity !== "1") style.opacity = "1";
  if (style.visibility !== "visible") style.visibility = "visible";
  if (style.pointerEvents !== "auto") style.pointerEvents = "auto";
  if (style.display !== "block") style.display = "block";
  if (style.left === "-9999px") style.left = "";
  if (style.position === "absolute") style.position = "relative";
}

export default function BookingEmbed({ className = "" }: { className?: string }) {
  const widgetId = ghlBookingWidgetId(SITE.bookingUrl);

  useEffect(() => {
    const iframe = document.getElementById(widgetId) as HTMLIFrameElement | null;
    if (!iframe) return;

    const keepVisibleAndSized = () => {
      revealIframe(iframe);
      applyResize(iframe);
    };

    keepVisibleAndSized();
    const observer = new MutationObserver(keepVisibleAndSized);
    observer.observe(iframe, { attributes: true, attributeFilter: ["style"] });

    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string") return;
      if (!event.data.startsWith("[iFrameSizer]")) return;
      const height = Number(event.data.split(":")[1]);
      if (Number.isFinite(height) && height > 400) {
        iframe.style.height = `${Math.ceil(height) + 5}px`;
      }
      revealIframe(iframe);
    };
    window.addEventListener("message", onMessage);

    return () => {
      observer.disconnect();
      window.removeEventListener("message", onMessage);
    };
  }, [widgetId]);

  return (
    <div
      className={`mb-24 rounded-xl border border-white/10 bg-white lg:mb-0 ${className}`}
    >
      <iframe
        src={SITE.bookingUrl}
        className="ghl-booking-frame"
        style={{
          width: "100%",
          border: "none",
          overflow: "hidden",
          minHeight: "1200px",
        }}
        scrolling="no"
        id={widgetId}
        title="Book a Consultation with Mike Prenesti"
      />
      <Script
        src={GHL_FORM_EMBED_SRC}
        strategy="afterInteractive"
        onReady={() => {
          const iframe = document.getElementById(widgetId);
          if (iframe) applyResize(iframe);
        }}
      />
      <style jsx global>{`
        iframe.ghl-booking-frame {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
          position: relative !important;
          left: auto !important;
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
}
