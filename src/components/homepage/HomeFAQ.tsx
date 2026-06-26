import Link from "next/link";
import { HOME_FAQS } from "@/lib/data";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";

export default function HomeFAQ() {
  return (
    <section className="bg-black py-20 sm:py-24">
      <div className="container-page max-w-3xl">
        <Reveal>
          <h2 className="heading-lg text-center text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-center text-lg text-gray-light">
            Have questions? I have answers. And if you don&apos;t see yours here,
            just ask.
          </p>
        </Reveal>
        <div className="mt-12">
          <Accordion items={HOME_FAQS} />
        </div>
        <div className="mt-8 text-center">
          <Link href="/resources/faq" className="btn-outline">
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
