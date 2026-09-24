"use client";

import clsx from "clsx";
import StatusDot from "components/status-dot";
import { AnimatePresence, motion } from "framer-motion";
import type { SortFilterItem } from "lib/constants";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ListItem, PathFilterItem } from ".";

function ActiveDot({ active }: { active: boolean }) {
  return (
    <span className="w-3 flex-shrink-0">
      <AnimatePresence mode="popLayout">
        {active && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="inline-block"
          >
            <StatusDot />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function ItemLabel({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        "font-mono text-xs uppercase tracking-tight transition-colors duration-300",
        {
          "text-primary": active,
          "text-primary/45 group-hover:text-primary": !active,
        },
      )}
    >
      {children}
    </span>
  );
}

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;

  newParams.delete("q");

  return (
    <motion.li
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      className="mt-2 h-6"
      key={item.title}
    >
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className="group flex w-full items-center gap-2"
      >
        <ActiveDot active={active} />
        <ItemLabel active={active}>{item.title}</ItemLabel>
      </DynamicTag>
    </motion.li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <motion.li
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      className="mt-2 h-6"
      key={item.title}
    >
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className="group flex w-full items-center gap-2"
      >
        <ActiveDot active={active} />
        <ItemLabel active={active}>{item.title}</ItemLabel>
      </DynamicTag>
    </motion.li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return "path" in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  );
}
