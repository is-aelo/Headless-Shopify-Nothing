"use client";

import { useMemo } from "react";

type RatingProps = {
  rating?: string;
  ratingCount?: string;
  count?: string;
};

function toNumber(value?: string): number | undefined {
  if (value === undefined || value === "" || value === null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

const STAR_PATH =
  "M10 1.5l2.47 5.33 5.82.61-4.2 3.82 1.24 5.99L10 15.14 4.67 17.25l1.24-5.99-4.2-3.82 5.82-.61z";

function Stars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-[3px]" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3 w-3 transition-colors ${
            i < level ? "fill-surface" : "fill-surface/20"
          }`}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export function Rating({ rating, ratingCount, count }: RatingProps) {
  const value = toNumber(rating);
  const total = toNumber(ratingCount ?? count);

  const stars = useMemo(() => {
    if (value === undefined || value <= 0) return 0;
    return Math.max(0, Math.min(5, Math.round(value)));
  }, [value]);

  if (stars === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-x-2.5 gap-y-1"
      aria-label={`Rated ${value} out of 5`}
    >
      <Stars level={stars} />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-surface/50">
        {value?.toFixed?.(1) ?? value}
        {total !== undefined && total > 0
          ? ` · ${total} ${total === 1 ? "review" : "reviews"}`
          : ""}
      </span>
    </div>
  );
}
