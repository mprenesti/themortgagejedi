import type { Metadata } from "next";
import { CheckSquare } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ChecklistPrintButton from "@/components/tools/ChecklistPrintButton";

export const metadata: Metadata = {
  title: "Pre-Approval Checklist",
  description:
    "Everything you need to get pre-approved for a mortgage. A printable document checklist for W-2 employees, self-employed borrowers, and everyone in between.",
};

const groups = [
  {
    title: "For W-2 Employees",
    items: [
      "Last 2 years W-2s",
      "Last 2 years tax returns (federal)",
      "Last 30 days pay stubs",
      "Last 2 months bank statements",
      "Government issued ID",
      "Social Security number",
    ],
  },
  {
    title: "For Self-Employed",
    items: [
      "Last 2 years tax returns (personal + business)",
      "Year-to-date P&L statement",
      "Business license",
      "12 to 24 months bank statements",
      "CPA letter (if applicable)",
    ],
  },
  {
    title: "For All Borrowers",
    items: [
      "Credit authorization (Mike pulls this)",
      "Bankruptcy/foreclosure documents (if applicable)",
      "Gift letter (if using gift funds for down payment)",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <>
      <PageHero
        label="Tools"
        title="Pre-Approval Checklist"
        subtitle="Gather these documents and you'll be ready to get pre-approved fast. Print it out and check items off as you go."
      >
        <ChecklistPrintButton />
      </PageHero>

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-white/10 bg-charcoal p-6 print:border-gray-dark"
            >
              <h2 className="font-heading text-xl font-bold text-gold">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <span className="text-gray-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-gold/30 bg-charcoal p-7 text-center print:hidden">
          <h2 className="font-heading text-2xl font-bold text-white">
            Ready to get pre-approved?
          </h2>
          <p className="mt-2 text-gray-light">
            Once you&apos;ve gathered your documents, let&apos;s talk. I&apos;ll
            tell you exactly what fits your situation.
          </p>
          <a
            href="/get-started"
            className="btn-gold mt-5 inline-flex"
          >
            Start My Pre-Approval
          </a>
        </div>
      </div>
    </>
  );
}
