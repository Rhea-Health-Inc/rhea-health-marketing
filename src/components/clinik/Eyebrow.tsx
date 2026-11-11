export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-3 mb-4 ${className}`}>
      <span aria-hidden className="h-px w-6 bg-primary/70" />
      <span className="text-[13px] uppercase tracking-[0.24em] text-primary font-semibold">
        {children}
      </span>
    </div>
  );
}
