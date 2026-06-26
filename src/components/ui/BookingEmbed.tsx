import { SITE } from "@/lib/constants";

export default function BookingEmbed({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-white ${className}`}
    >
      <iframe
        src={SITE.bookingUrl}
        style={{ width: "100%", border: "none", overflow: "hidden" }}
        scrolling="no"
        id="booking-iframe"
        title="Book a Consultation with Mike Prenesti"
        className="h-[700px] w-full"
      />
    </div>
  );
}
