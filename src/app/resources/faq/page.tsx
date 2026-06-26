import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Accordion from "@/components/ui/Accordion";
import CTAStrip from "@/components/ui/CTAStrip";
import { HOME_FAQS, type FAQ } from "@/lib/data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common mortgage questions about loan types, credit, the process, timelines, and working with The Mortgage Jedi.",
};

const moreFaqs: FAQ[] = [
  {
    q: "How much do I need for a down payment?",
    a: "It depends on the loan. VA loans can be 0% down for eligible veterans, FHA is as low as 3.5%, and conventional loans can start at 3 to 5%. Putting 20% down lets you avoid mortgage insurance, but it isn't required to buy.",
  },
  {
    q: "What credit score do I need to buy a home?",
    a: "Many programs start around 580, and some specialty programs go as low as 500. A higher score gets you better rates, but I work with buyers across the entire credit spectrum.",
  },
  {
    q: "What's the difference between pre-qualification and pre-approval?",
    a: "Pre-qualification is a quick estimate based on information you share. Pre-approval is a stronger commitment based on verified documents — it tells sellers you're a serious, ready buyer.",
  },
  {
    q: "Should I lock my interest rate?",
    a: "If you're comfortable with the rate and want certainty, locking protects you from increases while your loan is processed. I'll walk you through the trade-offs so you can decide with confidence.",
  },
  {
    q: "Are there costs to work with you?",
    a: "Our consultation is always free. As a broker, my compensation is built into the loan and disclosed upfront — there are no surprise fees for talking with me about your options.",
  },
  {
    q: "Can I buy a home if I'm self-employed?",
    a: "Absolutely. I specialize in non-QM programs like bank statement, 1099, and P&L loans that qualify you based on real cash flow instead of just your tax returns.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Have questions? I have answers. And if you don't see yours here, just ask."
      />

      <div className="container-page max-w-3xl space-y-12 py-16 sm:py-20">
        <div>
          <h2 className="mb-5 font-heading text-2xl font-bold text-gold">
            The Basics
          </h2>
          <Accordion items={HOME_FAQS} />
        </div>
        <div>
          <h2 className="mb-5 font-heading text-2xl font-bold text-gold">
            More Questions
          </h2>
          <Accordion items={moreFaqs} />
        </div>
      </div>

      <CTAStrip
        title="Still have a question?"
        subtitle="Reach out and I'll get you a straight answer."
        buttonLabel="Ask Mike"
        href="/contact"
      />
    </>
  );
}
