export default function StarField({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="starfield absolute inset-0 opacity-60" />
      <div className="starfield animate-twinkle absolute inset-0 opacity-40 [background-position:120px_80px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
    </div>
  );
}
