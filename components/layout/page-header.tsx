type PageHeaderProps = {
  kicker: string;
  title: string;
  description?: string;
  count?: number;
};

export function PageHeader({
  kicker,
  title,
  description,
  count,
}: PageHeaderProps) {
  return (
    <header className="mb-10 lg:mb-14">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-surface/50">
        {kicker}
      </p>
      <h1 className="mt-3 font-logo text-[clamp(2rem,4vw,3.25rem)] uppercase leading-[0.9] tracking-tighter text-surface">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-md font-mono text-[12px] md:text-[13px] leading-relaxed text-surface/70">
          {description}
        </p>
      ) : null}
      {count !== undefined ? (
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-surface/40">
          {count} {count === 1 ? "product" : "products"}
        </p>
      ) : null}
      <div className="mt-8 border-t border-black/[0.06]" />
    </header>
  );
}
