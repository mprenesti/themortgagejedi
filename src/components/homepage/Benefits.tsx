import { HandCoins, PhoneCall, MessagesSquare } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const cards = [
  {
    Icon: HandCoins,
    title: "Payment-First Philosophy",
    body: 'Most loan officers lead with max approval. I lead with payment comfort. Instead of "you qualify for $600K," I ask "where do you want your monthly payment to be?" That one shift protects you from overextending.',
  },
  {
    Icon: PhoneCall,
    title: "Attention Calibration",
    body: "Some clients want daily updates. Some want me to handle it and call them at closing. I figure out how you like to communicate and match that. You're never left wondering what's happening.",
  },
  {
    Icon: MessagesSquare,
    title: "Question-Driven Discovery",
    body: "I approach every client like a podcast host approaches a guest. Open-ended questions. Real listening. Follow-up before advice. This isn't a sales technique. It's how I get to know you well enough to actually help.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-black py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <h2 className="heading-lg text-center text-white">
            Why Clients Choose The Mortgage Jedi
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="card-dark h-full hover:border-gold/40">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/40 bg-gold/10">
                  <Icon className="h-7 w-7 text-gold" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-gray-light">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
