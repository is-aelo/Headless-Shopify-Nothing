import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

function parseProductData(htmlDescription: string) {
  const cleanText = htmlDescription
    .replace(/<\/p>|<\/li>|<div>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const introLines: string[] = [];
  const specs: { label: string; value: string }[] = [];

  for (const line of cleanText) {
    if (line.includes(":")) {
      const parts = line.split(":");
      const label = parts[0].replace(/[•*]/g, "").trim();
      const value = parts.slice(1).join(":").trim();
      if (label && value && specs.length < 4) {
        specs.push({ label: label.toUpperCase(), value });
      }
    } else if (
      specs.length === 0 &&
      !line.toUpperCase().includes("SPECIFICATIONS")
    ) {
      introLines.push(line);
    }
  }

  return { intro: introLines.slice(0, 2).join(" "), specs };
}

type LayoutVariant = "standard" | "reversed";

async function CollectionSection({
  title,
  handle,
  variant = "standard",
  accentColor = "#ff0000",
}: {
  title: string;
  handle: string;
  variant?: LayoutVariant;
  accentColor?: string;
}) {
  const products = await getCollectionProducts({ collection: handle });
  if (!products || products.length === 0) return null;

  const product = products[0];
  const { intro, specs } = parseProductData(
    product.descriptionHtml || product.description,
  );

  const formattedPrice = `${product.priceRange.minVariantPrice.currencyCode} ${parseFloat(
    product.priceRange.minVariantPrice.amount,
  ).toFixed(0)}`;

  return (
    <section className="relative w-full bg-off-white border-b border-border-l overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* ── Metadata Header ── */}
        <div className="flex items-center justify-between px-6 lg:px-12 pt-12 lg:pt-20">
          <div className="flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-nav text-[10px] uppercase tracking-[0.3em] text-muted font-bold">
              {title} // Dynamic Selection
            </span>
          </div>
          <Link
            href={`/collections/${handle}`}
            className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted hover:text-primary transition-all border-b border-transparent hover:border-primary"
          >
            See All
          </Link>
        </div>

        {/* ── Main Feature Block ── */}
        <div
          className={`flex flex-col ${variant === "reversed" ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch`}
        >
          {/* Content Column */}
          <div className="w-full lg:w-1/2 px-6 lg:px-12 py-16 lg:py-24 flex flex-col justify-center">
            <h3 className="font-logo text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] tracking-tighter uppercase mb-8 text-primary">
              {product.title}
            </h3>

            {intro && (
              <p className="font-body text-sm lg:text-base leading-relaxed text-muted max-w-[440px] mb-12">
                {intro}
              </p>
            )}

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-16 border-t border-primary/5 pt-12">
              {specs.map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-body text-[9px] uppercase tracking-[0.25em] text-muted mb-2 font-bold">
                    {spec.label}
                  </span>
                  <span className="font-body text-xs lg:text-sm uppercase tracking-tight text-primary font-normal">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons Container */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href={`/product/${product.handle}`}
                className="btn-nothing-primary w-full sm:w-auto px-10 min-w-[240px] text-[10px]"
              >
                Buy {product.title} — {formattedPrice}
              </Link>
              <Link
                href={`/product/${product.handle}`}
                className="flex items-center justify-center border border-border-l px-10 py-[1.1rem] w-full sm:w-auto min-w-[160px] font-ui text-[10px] uppercase tracking-[0.25em] text-muted hover:text-primary hover:border-primary transition-all rounded-[10px]"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center p-8 lg:p-24">
            <div className="relative w-full aspect-square group">
              <Image
                src={product.featuredImage?.url || ""}
                alt={product.title}
                fill
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* ── Secondary products strip ── */}
        {products.length > 1 && (
          <div className="border-t border-border-l overflow-x-auto scrollbar-hide">
            <div className="flex min-w-max lg:min-w-0 lg:grid lg:grid-cols-4">
              {products.slice(1, 5).map((p) => (
                <Link
                  key={p.handle}
                  href={`/product/${p.handle}`}
                  className="flex flex-col p-8 lg:p-12 border-r border-border-l last:border-r-0 hover:bg-white transition-all group min-w-[280px] lg:min-w-0"
                >
                  <div className="relative w-20 h-20 mb-10 transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={p.featuredImage?.url || ""}
                      alt={p.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-auto">
                    <h4 className="font-nav text-[10px] uppercase tracking-[0.15em] mb-2 text-muted">
                      {p.title}
                    </h4>
                    <p className="font-body text-[11px] font-bold text-primary italic">
                      {p.priceRange.minVariantPrice.currencyCode}{" "}
                      {parseFloat(p.priceRange.minVariantPrice.amount).toFixed(
                        0,
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default async function FeaturedCollections() {
  const categories = [
    {
      title: "Phone",
      handle: "phones",
      variant: "standard",
      accent: "#ff0000",
    },
    { title: "Audio", handle: "audio", variant: "reversed", accent: "#ff0000" },
    { title: "CMF", handle: "cmf", variant: "standard", accent: "#ff6b00" },
    {
      title: "Watch",
      handle: "watches",
      variant: "reversed",
      accent: "#ff0000",
    },
  ];

  return (
    <main className="w-full">
      {categories.map((cat) => (
        <CollectionSection
          key={cat.handle}
          title={cat.title}
          handle={cat.handle}
          variant={cat.variant as LayoutVariant}
          accentColor={cat.accent}
        />
      ))}
    </main>
  );
}
