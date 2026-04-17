"use client";

import clsx from "clsx";

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        "prose mx-auto max-w-6xl",

        // --- BASE TYPOGRAPHY ---
        // Removed 'font-body' and 'font-mono' to allow inheritance from layout.tsx
        "text-[12px] md:text-[13px] leading-snug text-surface/80",

        // --- HEADINGS ---
        // Removed 'font-ntype'. It will now use the global heading font or body font.
        "prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-surface",
        "prose-h1:text-3xl md:text-4xl prose-h2:text-2xl md:text-3xl prose-h3:text-xl md:text-2xl prose-h4:text-lg",

        // --- LINKS & DECOR ---
        "prose-a:text-surface prose-a:underline decoration-white/20 underline-offset-4 hover:prose-a:text-red-600 transition-colors",
        "prose-hr:my-8 prose-hr:border-white/10",

        // --- LISTS ---
        "prose-ol:list-decimal prose-ol:pl-4 prose-ul:list-disc prose-ul:pl-4",
        "prose-li:my-0.5 prose-li:marker:text-muted",

        // --- TEXT MODIFIERS ---
        "prose-strong:font-bold prose-strong:text-surface",
        "prose-p:mb-3 last:mb-0",

        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
