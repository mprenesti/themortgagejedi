import { MessageCircle, ClipboardList, ListChecks, Flag } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    Icon: MessageCircle,
    label: "Consultation",
    desc: "We talk about your goals",
  },
  { Icon: ClipboardList, label: "Strategy", desc: "I build a tailored plan" },
  { Icon: ListChecks, label: "Options", desc: "You choose from the best" },
  { Icon: Flag, label: "Closing", desc: "I guide you to the finish" },
];

export default function ProblemSolution() {
  return (
    <section className="bg-charcoal py-20 sm:py-24">
      <div className="container-page grid gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="section-label">The Problem</p>
          <h2 className="heading-lg mt-3 text-white">
            Buying a Home Shouldn&apos;t Feel This Confusing.
          </h2>
          <p className="mt-5 text-lg text-gray-light">
            Between conflicting advice online, lenders who treat you like a file
            number, and loan products you didn&apos;t even know existed —
            it&apos;s easy to feel lost. Most borrowers settle for whatever their
            bank offers because they don&apos;t know there&apos;s a better way.
          </p>
          <p className="mt-6 font-heading text-xl italic text-gold">
            That&apos;s where I come in.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="section-label">The Solution</p>
          <h2 className="heading-lg mt-3 text-white">
            A Mortgage Jedi Who Actually Works for You.
          </h2>
          <p className="mt-5 text-lg text-gray-light">
            I don&apos;t lead with approvals. I lead with questions. My
            payment first approach means we find out what fits your life before
            we ever talk numbers. You get the right loan — not the biggest one.
          </p>
        </Reveal>
      </div>

      <div className="container-page mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, label, desc }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="card-dark h-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold font-heading text-lg font-bold text-black">
                    {i + 1}
                  </span>
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-white">
                  {label}
                </h3>
                <p className="mt-1 text-gray-light">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
