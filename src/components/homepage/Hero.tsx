"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Target, Handshake } from "lucide-react";
import StarField from "@/components/ui/StarField";
import { SITE } from "@/lib/constants";
import HeadshotPlaceholder from "@/components/ui/HeadshotPlaceholder";

const badges = [
  { Icon: Home, text: "Payment Comfort, Not Maximum Leverage" },
  { Icon: Target, text: "Communication on Your Terms" },
  { Icon: Handshake, text: "Long-Term Relationship, Not a Transaction" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <StarField />
      <div className="container-page relative z-10 grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-xl text-white">
            Your Mortgage,{" "}
            <span className="text-gold">Made Simple.</span> Your Future,{" "}
            <span className="text-gold">Made Possible.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-light">
            I&apos;m Mike Prenesti, The Mortgage Jedi. I help Las Vegas
            homebuyers get the right loan — not just the biggest approval.
            Payment focused guidance. No pressure. No rush. Just the loan that
            fits your life.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Book Your Free Consultation
            </a>
            <Link href="/loan-options" className="btn-outline">
              See Loan Options
            </Link>
          </div>

          <ul className="mt-10 space-y-3">
            {badges.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                  <Icon className="h-4 w-4 text-gold" />
                </span>
                <span className="font-heading text-sm font-medium uppercase tracking-wide text-gray-light">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <HeadshotPlaceholder />
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/60">
        <p className="container-page py-3 text-center text-xs text-gray-mid">
          Mike Prenesti | {SITE.nmls} | {SITE.company} | Licensed in Nevada
        </p>
      </div>
    </section>
  );
}
