export function InfoBlock({
  title,
  description,
  label,
}: {
  title: string;
  description: string;
  label: string;
}) {
  return (
    <section className="bg-primary py-32 px-6 flex flex-col items-center text-center">
      <span className="font-body text-[10px] uppercase tracking-[0.4em] text-accent-red mb-8">
        {label}
      </span>
      <h2 className="font-logo text-4xl md:text-6xl text-white uppercase mb-8 max-w-4xl leading-tight">
        {title}
      </h2>
      <p className="font-body text-muted text-xs uppercase tracking-widest max-w-xl leading-relaxed mb-12">
        {description}
      </p>
      <div className="h-[1px] w-24 bg-muted/30" />
    </section>
  );
}
