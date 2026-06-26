import Hero from "@/components/homepage/Hero";
import ProblemSolution from "@/components/homepage/ProblemSolution";
import Benefits from "@/components/homepage/Benefits";
import Testimonials from "@/components/homepage/Testimonials";
import Services from "@/components/homepage/Services";
import TwoFutures from "@/components/homepage/TwoFutures";
import SecondOpinionStrip from "@/components/homepage/SecondOpinionStrip";
import HomeFAQ from "@/components/homepage/HomeFAQ";
import FinalCTA from "@/components/homepage/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Benefits />
      <Testimonials />
      <Services />
      <TwoFutures />
      <SecondOpinionStrip />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
