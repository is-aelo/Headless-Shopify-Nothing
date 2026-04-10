"use client";

import clsx from "clsx";

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        "prose mx-auto max-w-6xl",

        // --- BASE TYPOGRAPHY (Smaller & Responsive) ---
        // text-xs (12px) on mobile, text-sm (14px) on desktop
        // leading-snug (1.375) for a tighter technical look
        "font-body text-[12px] md:text-[13px] leading-snug text-surface/80",

        // --- HEADINGS (Scalable & Tight) ---
        "prose-headings:font-product prose-headings:font-medium prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-surface",
        "prose-h1:text-3xl md:text-4xl prose-h2:text-2xl md:text-3xl prose-h3:text-xl md:text-2xl prose-h4:text-lg",

        // --- LINKS & DECOR ---
        "prose-a:text-surface prose-a:underline decoration-border-l underline-offset-4 hover:prose-a:text-cmf-orange hover:decoration-cmf-orange transition-colors",
        "prose-hr:my-8 prose-hr:border-border-l",

        // --- LISTS (Condensed for Product Specs) ---
        "prose-ol:list-decimal prose-ol:pl-4 prose-ul:list-disc prose-ul:pl-4",
        "prose-li:my-0.5 prose-li:marker:text-muted",

        // --- TEXT MODIFIERS ---
        "prose-strong:font-bold prose-strong:text-surface",
        "prose-p:mb-3 last:mb-0",

        // --- RESET FOR OFF-WHITE BG ---
        "dark:prose-headings:text-surface dark:prose-strong:text-surface dark:prose-a:text-surface",

        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
