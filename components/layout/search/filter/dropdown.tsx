"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ListItem } from ".";
import { FilterItem } from "./item";

export default function FilterItemDropdown({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams.get("sort") === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        className="flex w-full items-center justify-between gap-3 border border-black/10 bg-white px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-off-white"
      >
        <span className="truncate">
          <span className="text-surface/40">{title ? `${title} / ` : ""}</span>
          <span className="font-bold">{active}</span>
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 flex-shrink-0 text-primary transition-transform duration-300 ${
            openSelect ? "rotate-180" : ""
          }`}
        />
      </button>

      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false);
          }}
          className="absolute z-40 mt-1 w-full border border-black/10 bg-white px-3 pb-3"
        >
          {list.map((item: ListItem, i) => (
            <div
              key={i}
              className={`border-t border-black/[0.06] first:border-t-0 ${
                ("path" in item && pathname === item.path) ||
                ("slug" in item && searchParams.get("sort") === item.slug)
                  ? "text-primary"
                  : ""
              }`}
            >
              <FilterItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
