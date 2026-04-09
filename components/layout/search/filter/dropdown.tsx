"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ListItem } from ".";
import { FilterItem } from "./item";

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
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
      <div
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        /* Updated to use your theme: bg-off-white and text-primary */
        className="flex w-full items-center justify-between border border-black/10 bg-off-white px-4 py-3 font-body text-[11px] uppercase tracking-[0.2em] text-primary transition-all active:scale-[0.98]"
      >
        <div className="flex items-center gap-2">
          <span className="opacity-40">SELECT:</span>
          <span className="font-bold">{active}</span>
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 text-primary transition-transform duration-300 ${openSelect ? "rotate-180" : ""}`}
        />
      </div>

      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false);
          }}
          /* Dropdown menu matches the off-white surface */
          className="absolute z-40 mt-1 w-full border border-black/10 bg-off-white p-2 shadow-xl"
        >
          {list.map((item: ListItem, i) => (
            <FilterItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
