"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

// Optimal Blue OBMMI widget native dimensions. Do not modify the iframe src
// or its content — this is a licensed third-party embed.
const WIDGET_WIDTH = 750;
const WIDGET_HEIGHT = 462;
const WIDGET_SRC =
  "https://www2.optimalblue.com/OBMMI/widgetConfig.php?actbg=C8A84B&actcolor=0a0a0f&inactbg=C8A84B&inacttext=0a0a0f&hoverBG=C8A84B&rate=0a0a0f";

export default function TodaysRates() {
  const measureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      // The iframe cannot reflow internally, so we scale it down to fit the
      // available width on smaller screens (never scaling up past native size).
      const available = el.clientWidth;
      setScale(Math.min(1, available / WIDGET_WIDTH));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="bg-black py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="text-center">
            <p className="section-label">Today&apos;s Mortgage Rates</p>
            <h2 className="heading-lg mt-3 text-white">
              Today&apos;s Mortgage Rates
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-light">
              Updated daily from real market data — powered by Optimal Blue.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Measures available width; capped at the widget's native size. */}
          <div
            ref={measureRef}
            className="mx-auto mt-10 w-full overflow-hidden"
            style={{ maxWidth: WIDGET_WIDTH }}
          >
            {/* Clips to the scaled dimensions so nothing overflows the row. */}
            <div
              className="mx-auto overflow-hidden"
              style={{
                width: WIDGET_WIDTH * scale,
                height: WIDGET_HEIGHT * scale,
              }}
            >
              <iframe
                src={WIDGET_SRC}
                width={WIDGET_WIDTH}
                height={WIDGET_HEIGHT}
                frameBorder="0"
                title="Today's Mortgage Rates by Optimal Blue"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-gray-500">
            These rates reflect national market averages, not a personalized
            quote. Your actual rate depends on your credit profile, loan type,
            down payment, and other factors. Contact Mike for rates tailored to
            your situation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
