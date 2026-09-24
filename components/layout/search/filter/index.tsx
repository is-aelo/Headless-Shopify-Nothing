import { SortFilterItem } from "lib/constants";
import { Suspense } from "react";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <nav className="border-t border-black/[0.06] pt-5">
      {title ? (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-surface/45">
          {title}
        </p>
      ) : null}

      {/* Desktop List */}
      <ul className="hidden md:block">
        <Suspense fallback={null}>
          <FilterItemList list={list} />
        </Suspense>
      </ul>

      {/* Mobile Dropdown */}
      <ul className="md:hidden">
        <Suspense fallback={null}>
          <FilterItemDropdown list={list} title={title} />
        </Suspense>
      </ul>
    </nav>
  );
}
