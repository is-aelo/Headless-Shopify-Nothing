"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type InfoBlockProps = {
  variant: "glyph" | "os";
  title: string;
  description: string;
};

export function InfoBlock({ variant, title, description }: InfoBlockProps) {
  // Glyph Matrix Data (Wine Glass + Heart) - Centered 15x20 Matrix
  const glyphMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  if (variant === "glyph") {
    return (
      <section className="relative bg-off-white py-12 md:py-20 px-6 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2 mb-6 bg-off-white border border-border-l px-3 py-1 rounded-full"
          >
            <span className="w-1 h-1 rounded-full bg-accent-red animate-pulse" />
            <span className="font-nav text-[9px] uppercase tracking-[0.3em] text-muted">
              Signature Interface
            </span>
          </motion.div>

          <motion.h2 className="font-product text-[clamp(1.5rem,4vw,2.75rem)] leading-[0.9] tracking-tighter text-primary uppercase mb-4 max-w-xl">
            {title}
          </motion.h2>

          <motion.p className="font-body text-[10px] md:text-[12px] text-muted uppercase tracking-tight max-w-[360px] leading-relaxed mb-10 md:mb-12">
            {description}
          </motion.p>

          <div className="relative flex flex-col items-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full bg-primary"
            >
              <div className="relative z-10 flex items-center justify-center scale-[0.75] md:scale-100">
                <div
                  className="grid gap-[2.5px] md:gap-[3px]"
                  style={{ gridTemplateColumns: `repeat(15, minmax(0, 1fr))` }}
                >
                  {glyphMatrix.flat().map((pixel, i) => {
                    const row = Math.floor(i / 15);
                    const isHeart = row >= 1 && row <= 5;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.05 }}
                        whileInView={{ opacity: pixel === 1 ? 1 : 0.04 }}
                        transition={{ delay: 0.05 + i * 0.0005 }}
                        className={`w-[4px] h-[4px] md:w-[5px] md:h-[5px] rounded-full ${
                          pixel === 1
                            ? isHeart
                              ? "bg-accent-red shadow-[0_0_6px_rgba(255,0,0,0.4)]"
                              : "bg-off-white"
                            : "bg-white/5"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* CTA SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/search/phones"
                className="group flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="font-nav text-[11px] md:text-[13px] uppercase tracking-[0.2em] text-primary">
                    Explore Nothing Phones
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500 ease-out" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // OS VARIANT (UNCHANGED)
  return (
    <section className="relative bg-off-white py-12 md:py-20 px-6">
      <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="inline-block border-l-2 border-accent-red pl-4 mb-4">
            <span className="font-nav text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-accent-red block">
              Nothing OS 4.0
            </span>
          </div>
          <h2 className="font-logo text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[0.95] text-primary uppercase">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-end">
          <div className="border-l border-border-l pl-6">
            <p className="font-body text-[10px] md:text-[13px] text-primary uppercase leading-snug max-w-lg">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
