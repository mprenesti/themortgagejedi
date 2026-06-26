import type { Metadata } from "next";
import {
  HeartHandshake,
  ShieldCheck,
  UserCog,
  Scale,
  Award,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CTAStrip from "@/components/ui/CTAStrip";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Mike Prenesti — The Mortgage Jedi",
  description:
    "16 years in the mortgage industry. Payment-first philosophy. No pressure. No rush. Meet Mike Prenesti, The Mortgage Jedi, serving Las Vegas homebuyers.",
};

const values = [
  {
    Icon: HeartHandshake,
    title: "Service Over Sales",
    body: "I don't make recommendations I wouldn't make for my own family.",
  },
  {
    Icon: ShieldCheck,
    title: "Long-Term Trust",
    body: "My goal is to be your lender for life, not just for one transaction.",
  },
  {
    Icon: UserCog,
    title: "Personalization",
    body: "Every client communicates differently. I adapt to you.",
  },
  {
    Icon: Scale,
    title: "Financial Responsibility",
    body: "I'd rather tell you to wait than put you in a loan that doesn't fit.",
  },
];

const credentials = [
  "NMLS #1033445",
  "C2 Financial Corporation",
  "Licensed in Nevada",
  "16 Years in the Mortgage Industry",
  "Specialties: First-Time Buyers, Self-Employed, Investors, New Construction",
];

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">
          {title}
        </h2>
        <div className="mt-4 space-y-4 text-lg text-gray-light">{children}</div>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="I'm Mike Prenesti. I help Las Vegas homebuyers get the right loan — not just the biggest approval."
        subtitle="16 years in the mortgage industry. Payment-first philosophy. No pressure. No rush."
      />

      <div className="container-page space-y-16 py-16 sm:py-20">
        <Block title="My Story">
          <p>
            I grew up in the San Fernando Valley. My dad ran an auto body shop.
            I learned early what it means to run your own thing — to show up,
            solve problems, and earn trust one client at a time.
          </p>
          <p>
            I got into mortgages because I saw how much confusion existed around
            one of the biggest financial decisions of people&apos;s lives. I
            wanted to be the person who made that clearer. Not the person who
            pushed the biggest loan. The person who found the right one.
          </p>
          <p>
            After 16 years, I&apos;ve helped hundreds of families in Las Vegas
            find the right mortgage. My process hasn&apos;t changed: ask good
            questions, listen more than I talk, and never recommend something I
            wouldn&apos;t do myself.
          </p>
        </Block>

        <Block title="The Mortgage Jedi Name">
          <p>
            The name isn&apos;t about Star Wars fandom (though I do love the
            films). It&apos;s about the Jedi philosophy: guide, don&apos;t force.
            A Jedi doesn&apos;t manipulate. A Jedi asks questions, reads the
            situation, and helps you find the path that&apos;s right for you.
          </p>
          <p>
            That&apos;s how I approach every client. I&apos;m not here to sell
            you a loan. I&apos;m here to guide you to the right one.
          </p>
        </Block>

        <div>
          <Reveal>
            <h2 className="text-center font-heading text-2xl font-bold text-gold sm:text-3xl">
              My Core Values
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {values.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="card-dark h-full">
                  <Icon className="h-8 w-8 text-gold" />
                  <h3 className="mt-4 font-heading text-xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-light">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Block title="Beyond the Office">
          <p>
            When I&apos;m not working with clients, I&apos;m coaching youth
            hockey, training Krav Maga (10+ years), spending time with my wife
            and kids, and leaning on my faith. Romans 8:31 keeps me grounded.
          </p>
        </Block>

        <Reveal>
          <div className="mx-auto max-w-3xl rounded-xl border border-gold/30 bg-charcoal p-8">
            <div className="flex items-center gap-3">
              <Award className="h-7 w-7 text-gold" />
              <h2 className="font-heading text-2xl font-bold text-white">
                Credentials
              </h2>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-2 text-gray-light">
                  <span className="mt-1 text-gold">›</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <CTAStrip
        title="Let's find the loan that fits your life."
        subtitle="No pressure, no rush — just honest guidance."
        buttonLabel="Book a Free Consultation"
        href={SITE.bookingUrl}
        external
      />
    </>
  );
}
