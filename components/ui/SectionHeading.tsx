export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl">{title}</h2>
      {description ? <p className="max-w-3xl text-zinc-600 dark:text-zinc-400">{description}</p> : null}
    </div>
  );
}
