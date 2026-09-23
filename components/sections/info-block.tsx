"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type InfoBlockProps = {
  variant: "glyph" | "os";
  title: string;
  description: string;
};

const GLYPH_HEART = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export function InfoBlock({ variant, title, description }: InfoBlockProps) {
  if (variant === "glyph") {
    const dots = GLYPH_HEART.flat();

    return (
      <section className="relative overflow-hidden bg-primary px-6 py-20 md:py-32">
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center text-center">
          <span className="mb-8 font-mono text-[9px] uppercase tracking-[0.35em] text-white/50">
            Signature Interface
          </span>

          <h1 className="font-logo max-w-3xl text-[clamp(1.75rem,4.5vw,3.25rem)] uppercase leading-[0.9] tracking-tighter text-white">
            {title}
          </h1>

          <p className="mt-6 max-w-xl font-mono text-[10px] md:text-[11px] uppercase leading-relaxed tracking-wide text-white/50">
            {description}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mt-14 flex items-center justify-center"
          >
            <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full border border-white/15 bg-white/[0.03] md:h-[240px] md:w-[240px]">
              <div
                className="grid gap-[3px]"
                style={{
                  gridTemplateColumns: `repeat(15, minmax(0, 1fr))`,
                }}
              >
                {dots.map((pixel, i) => (
                  <span
                    key={i}
                    className={`h-1 w-1 rounded-full md:h-[5px] md:w-[5px] ${
                      pixel
                        ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                        : "bg-white/[0.08]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <Link
            href="/search/phones"
            className="group mt-14 inline-flex items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white underline-offset-4 transition-colors group-hover:underline">
              Explore Nothing Phones
            </span>
            <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative border-y border-black/[0.06] bg-off-white px-6 py-24 md:py-40">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <span className="mb-8 font-mono text-[9px] uppercase tracking-[0.35em] text-muted">
          Nothing OS 4.0
        </span>

        <h2 className="font-logo max-w-3xl text-[clamp(1.75rem,4.5vw,3.5rem)] uppercase leading-[0.9] tracking-tighter text-primary">
          {title}
        </h2>

        <p className="mt-8 max-w-xl font-mono text-[10px] md:text-[12px] uppercase leading-relaxed tracking-wide text-muted">
          {description}
        </p>
      </div>
    </section>
  );
}
