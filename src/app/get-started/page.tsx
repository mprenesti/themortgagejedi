import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GetStartedQuiz from "@/components/forms/GetStartedQuiz";

export const metadata: Metadata = {
  title: "Get Started — Find Your Best Loan Option",
  description:
    "Take 2 minutes to get started with The Mortgage Jedi. No pressure, no obligation — just honest, payment-first guidance.",
};

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        label="Get Started"
        title="Let's Find the Right Loan — It's Free"
        subtitle="Answer a few quick questions and Mike will reach out with honest, payment-first guidance. No pressure, no obligation."
      />
      <div className="container-page max-w-2xl py-16 sm:py-20">
        <GetStartedQuiz />
      </div>
    </>
  );
}
