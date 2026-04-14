import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryGridProps {
  title: string;
  products: Product[];
  theme?: "dark" | "light";
}

export function CategoryGrid({
  title,
  products,
  theme = "dark",
}: CategoryGridProps) {
  const mainProduct = products[0];

  // Smart Spec Extractor
  const getSpecs = (product: Product) => {
    // 1. Check Metafields first (Structured Data)
    if (product.metafields && product.metafields.length > 0) {
      return product.metafields.slice(0, 4).map((m) => ({
        label: m.key,
        value: m.value,
      }));
    }

    // 2. Fallback: Parse Description (looks for "Label: Value")
    const specRegex = /([^:\n]+): ([^:\n]+)/g;
    const matches = [...product.description.matchAll(specRegex)];
    if (matches.length > 0) {
      return matches.slice(0, 4).map((match) => ({
        label: match[1].trim(),
        value: match[2].trim(),
      }));
    }

    // 3. Default: If no specs found
    return [
      { label: "Category", value: product.productType || "Technology" },
      { label: "Status", value: "Available" },
    ];
  };

  if (!mainProduct) return null;

  const specs = getSpecs(mainProduct);
  const isDark = theme === "dark";

  return (
    <section
      className={`${isDark ? "bg-black text-white" : "bg-white text-black"} py-20 px-6 border-b ${isDark ? "border-white/10" : "border-black/10"}`}
    >
      <div className="mx-auto max-w-[1440px]">
        <h2 className="font-logo text-5xl uppercase block mb-12 tracking-tighter">
          {title}
        </h2>

        <div
          className={`${isDark ? "bg-[#0d0d0d] bg-nothing-grid border-white/5" : "bg-[#f7f7f7] border-black/5"} rounded-sm p-12 relative overflow-hidden border`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[2px] w-8 bg-accent-red" />
                <span className="font-body text-[10px] text-accent-red uppercase tracking-[0.2em]">
                  Technical Specs
                </span>
              </div>

              <h3 className="font-logo text-6xl uppercase mb-8 leading-none whitespace-pre-line">
                {mainProduct.title.replace(" ", "\n")}
              </h3>

              {/* Dynamic Spec Table */}
              <div
                className={`grid grid-cols-2 gap-x-12 gap-y-8 mb-12 border-t border-b ${isDark ? "border-white/10" : "border-black/10"} py-8`}
              >
                {specs.map((spec, i) => (
                  <div key={i}>
                    <p className="font-body text-[9px] text-muted uppercase mb-1">
                      {spec.label}
                    </p>
                    <p className="font-logo text-sm uppercase">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/product/${mainProduct.handle}`}
                  className={`${isDark ? "bg-white text-black hover:bg-off-white" : "bg-black text-white hover:bg-neutral-800"} font-logo px-8 py-4 uppercase text-xs transition-colors`}
                >
                  Shop {mainProduct.title}
                </Link>
              </div>
            </div>

            <div className="relative h-[500px] flex justify-center">
              {mainProduct.featuredImage?.url && (
                <Image
                  src={mainProduct.featuredImage.url}
                  alt={mainProduct.title}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
