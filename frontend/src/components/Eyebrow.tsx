export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-accent/25 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
      {children}
    </span>
  );
}
