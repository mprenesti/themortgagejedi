import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure className="card-dark flex h-full flex-col">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" />
        ))}
      </div>
      <Quote className="mt-4 h-7 w-7 text-gold/40" />
      <blockquote className="mt-2 flex-1 text-gray-light">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-heading font-semibold text-white">
          {testimonial.name}
        </span>
        {testimonial.date ? (
          <span className="text-xs text-gray-mid">{testimonial.date}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
