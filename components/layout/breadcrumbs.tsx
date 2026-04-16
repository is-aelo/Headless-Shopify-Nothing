import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 py-4 px-6 lg:px-16"
    >
      {/* Home / Root Link */}
      <Link
        href="/"
        className="font-nav text-[9px] uppercase tracking-[0.2em] text-muted hover:text-primary transition-colors"
      >
        Store
      </Link>

      {items.map((item, index) => (
        <div key={item.url} className="flex items-center space-x-2">
          {/* Hardware-inspired separator: a simple dot or plus */}
          <span className="text-muted opacity-30 text-[8px]">•</span>

          <Link
            href={item.url}
            className={`font-nav text-[9px] uppercase tracking-[0.2em] transition-colors ${
              index === items.length - 1
                ? "text-primary pointer-events-none" // Current page
                : "text-muted hover:text-primary"
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
