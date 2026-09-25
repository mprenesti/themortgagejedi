import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for themortgagejedi.com.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy Policy" />
      <div className="container-page max-w-3xl py-16 sm:py-20">
        <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-white prose-a:text-gold">
          <p>
            This Privacy Policy describes how Mike Prenesti, The Mortgage Jedi
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
            and protects information you provide through themortgagejedi.com.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you voluntarily provide through our forms,
            including your name, email address, phone number, and any details
            you share about your mortgage needs. We may also collect usage data
            through analytics tools such as Google Analytics.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and provide mortgage guidance</li>
            <li>To send you resources, updates, and follow-up communication</li>
            <li>To improve our website and services</li>
          </ul>

          <h2>Sharing of Information</h2>
          <p>
            We do not sell your personal information. We may share information
            with trusted service providers (such as our CRM and lending
            partners) solely to deliver the services you request, and as
            required by law.
          </p>

          <h2>Cookies &amp; Tracking</h2>
          <p>
            Our site uses Google Analytics and third-party tracking pixels
            (such as Meta Pixel) to understand how visitors find and use the
            site, including whether they arrived from an AI assistant or search
            engine. Google Analytics sets cookies and processes usage data on
            our behalf. You can opt out of Google Analytics by installing the
            Google Analytics Opt-out Browser Add-on at{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              tools.google.com/dlpage/gaoptout
            </a>
            , or by disabling cookies in your browser settings.
          </p>

          <h2>Your Choices</h2>
          <p>
            You may opt out of marketing communications at any time by following
            the unsubscribe link in our emails or by contacting us directly.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
            {SITE.phone}.
          </p>

          <p className="text-sm text-gray-mid">
            {SITE.nmls} | {SITE.company} | Equal Housing Lender | Licensed in
            Nevada
          </p>
        </div>
      </div>
    </>
  );
}
