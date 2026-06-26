"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "newsletter",
        data: { email, tag: "newsletter" },
      }),
    });
    setStatus("done");
    setEmail("");
  }

  if (status === "done") {
    return (
      <p className="font-heading text-gold">
        You&apos;re in! I&apos;ll send mortgage tips and market updates — no spam.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-md border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-gray-mid focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gold whitespace-nowrap"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
