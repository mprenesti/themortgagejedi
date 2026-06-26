import Link from "next/link";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-2"
      aria-label="The Mortgage Jedi — Home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-gold/60 bg-gold/10 font-accent text-2xl leading-none text-gold transition-colors group-hover:bg-gold/20">
        MJ
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold uppercase tracking-wide text-white">
          The Mortgage <span className="text-gold">Jedi</span>
        </span>
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gray-mid">
          Mike Prenesti
        </span>
      </span>
    </Link>
  );
}
