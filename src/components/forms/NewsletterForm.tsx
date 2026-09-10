"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      const json = (await res.json().catch(() => null)) as {
        success?: boolean;
      } | null;
      if (res.ok && json?.success === true) {
        setStatus("done");
        setFirstName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="font-heading text-gold">
        You&apos;re in! I&apos;ll send mortgage tips and market updates — no spam.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3">
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="w-full rounded-md border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-gray-mid focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
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
      </div>
      {status === "error" ? (
        <p className="text-sm text-red-300">
          Something went wrong. Please email{" "}
          <a
            href="mailto:mike@themortgagejedi.com"
            className="font-semibold underline"
          >
            mike@themortgagejedi.com
          </a>{" "}
          to subscribe.
        </p>
      ) : null}
    </form>
  );
}
