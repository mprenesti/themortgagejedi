import Link from "next/link";
import StarField from "@/components/ui/StarField";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-black py-20">
      <StarField />
      <div className="container-page relative z-10 text-center">
        <p className="font-accent text-7xl text-gold sm:text-8xl">404</p>
        <h1 className="heading-lg mt-4 text-white">
          These aren&apos;t the pages you&apos;re looking for.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-gray-light">
          The page you&apos;re after may have moved or never existed. Let&apos;s
          get you back on the right path.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-gold">
            Back to Home
          </Link>
          <Link href="/get-started" className="btn-outline">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
