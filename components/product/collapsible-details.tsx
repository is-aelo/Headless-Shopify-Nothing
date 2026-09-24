"use client";

import { useState } from "react";
import Prose from "components/prose";

export function CollapsibleDetails({ html }: { html: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-black/[0.06] pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-surface/60 transition-colors hover:text-surface"
      >
        Details
        <span className="font-mono text-lg leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className={`mt-4 font-mono text-[12px] md:text-[13px] leading-relaxed ${
          open ? "" : "line-clamp-3"
        }`}
      >
        <Prose
          className="text-surface/80 prose-headings:text-surface prose-strong:text-surface prose-li:text-surface"
          html={html}
        />
      </div>
    </div>
  );
}
