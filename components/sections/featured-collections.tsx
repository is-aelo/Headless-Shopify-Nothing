import { addItem } from "components/cart/actions";
import { getHexColor } from "lib/constants";
import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

function parseProductData(htmlDescription: string | undefined) {
  if (!htmlDescription) {
    return { intro: "", specs: [] };
  }

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
      const label = parts[0]?.replace(/[•*]/g, "").trim();
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

  return { intro: introLines.slice(0, 1).join(" "), specs };
}

type LayoutVariant = "standard" | "reversed";

async function addItemAction(formData: FormData) {
  "use server";
  const variantId = formData.get("variantId") as string;
  await addItem(null, variantId);
}

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
  if (!product) return null;

  const variantId = product.variants?.[0]?.id;
  const { intro, specs } = parseProductData(
    product.descriptionHtml || product.description,
  );

  return (
    <section className="relative w-full bg-off-white overflow-hidden border-b border-border-l">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-6 lg:px-16 pt-12 lg:pt-16">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <span
                className="absolute w-3 h-3 rounded-full blur-[4px] opacity-40 animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="relative w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <span className="font-nav text-[10px] uppercase tracking-[0.4em] text-muted">
              {title}
            </span>
          </div>

          <Link
            href={`/search/${handle}`}
            className="font-nav text-[9px] uppercase tracking-[0.3em] text-muted hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            See All {title}
          </Link>
        </div>

        <div
          className={`flex flex-col ${variant === "reversed" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-24 px-6 lg:px-16 py-16 lg:py-32`}
        >
          <div className="w-full lg:w-1/2 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={product.featuredImage?.url || ""}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h3 className="font-logo text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-tighter uppercase mb-8 text-primary">
              {product.title}
            </h3>

            {intro && (
              <p className="font-body text-[11px] lg:text-[13px] uppercase tracking-tight text-muted mb-10 max-w-[420px] leading-relaxed">
                {intro}
              </p>
            )}

            <div className="grid grid-cols-2 gap-x-12 gap-y-10 mb-12 border-t border-border-l pt-10">
              {specs.map((spec, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <span className="font-nav text-[9px] uppercase tracking-[0.2em] text-muted">
                    {spec.label}
                  </span>
                  <span className="font-ui text-xs lg:text-[13px] uppercase tracking-tight text-primary font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <form action={addItemAction} className="w-full sm:w-auto">
                <input type="hidden" name="variantId" value={variantId} />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-[48px] w-full sm:w-auto px-12 text-[11px] uppercase tracking-[0.2em] bg-primary text-white hover:bg-black/90 transition-all rounded-[8px]"
                >
                  Buy {product.title}
                </button>
              </form>

              <Link
                href={`/product/${product.handle}`}
                className="inline-flex items-center justify-center h-[48px] w-full sm:w-auto px-12 text-[11px] uppercase tracking-[0.2em] text-primary border border-primary hover:bg-primary hover:text-white transition-all rounded-[8px]"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {products.length > 1 && (
          <div className="border-t border-border-l">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {products.slice(1, 5).map((p, index) => {
                const amount = parseFloat(p.priceRange.minVariantPrice.amount);
                const compareAtAmount = parseFloat(
                  p.variants[0]?.compareAtPrice?.amount || "0",
                );
                const discountPercent =
                  compareAtAmount > amount
                    ? Math.round(
                        ((compareAtAmount - amount) / compareAtAmount) * 100,
                      )
                    : 0;

                const gridVariantId = p.variants[0]?.id;
                const colorOptions = p.options
                  ?.find(
                    (opt) =>
                      opt.name.toLowerCase() === "color" ||
                      opt.name.toLowerCase() === "colour",
                  )
                  ?.values.slice(0, 3);

                return (
                  <div
                    key={p.handle}
                    className={`flex flex-col border-r border-border-l last:border-r-0 bg-white group overflow-hidden 
                    ${index >= 2 ? "border-t lg:border-t-0" : ""}`}
                  >
                    <div className="relative aspect-square flex items-center justify-center overflow-hidden bg-white">
                      {discountPercent > 0 && (
                        <div className="absolute left-0 top-3 z-10">
                          <span className="bg-accent-red px-2 py-0.5 text-[8px] md:text-[9px] font-bold tracking-[0.1em] text-white uppercase">
                            {discountPercent}% OFF
                          </span>
                        </div>
                      )}

                      <div className="absolute right-2 top-2 flex flex-col gap-1 z-10">
                        {colorOptions?.map((color, i) => (
                          <div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full border border-border-l shadow-sm"
                            style={{ backgroundColor: getHexColor(color) }}
                          />
                        ))}
                      </div>

                      <Link
                        href={`/product/${p.handle}`}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={p.featuredImage?.url || ""}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <form
                        action={addItemAction}
                        className="hidden lg:block absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10"
                      >
                        <input
                          type="hidden"
                          name="variantId"
                          value={gridVariantId}
                        />
                        <button
                          type="submit"
                          className="w-full bg-primary text-white font-nav text-[10px] py-5 uppercase tracking-[0.3em] hover:bg-black/90"
                        >
                          + Add to Bag
                        </button>
                      </form>
                    </div>

                    <div className="flex border-t border-border-l items-stretch bg-white relative z-20">
                      <Link
                        href={`/product/${p.handle}`}
                        className="flex-1 flex flex-col p-3 lg:p-6 min-w-0 justify-center"
                      >
                        <h4 className="font-product text-[10px] lg:text-[12px] uppercase tracking-wider mb-0.5 text-primary line-clamp-1">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="font-nav text-[9px] lg:text-[10px] text-primary font-medium">
                            PHP {amount.toFixed(0)}
                          </span>
                          {compareAtAmount > amount && (
                            <span className="font-nav text-[8px] text-muted line-through opacity-60">
                              {compareAtAmount.toFixed(0)}
                            </span>
                          )}
                        </div>
                      </Link>

                      <form
                        action={addItemAction}
                        className="lg:hidden border-l border-border-l flex"
                      >
                        <input
                          type="hidden"
                          name="variantId"
                          value={gridVariantId}
                        />
                        <button
                          type="submit"
                          className="px-5 flex items-center justify-center bg-white active:bg-off-white text-primary"
                        >
                          <span className="font-product text-2xl leading-none">
                            +
                          </span>
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

async function FeaturedCollections() {
  const categories = [
    {
      title: "Phones",
      handle: "phones",
      variant: "standard",
      accent: "#ff0000",
    },
    { title: "Audio", handle: "audio", variant: "reversed", accent: "#ff0000" },
    {
      title: "Wearables",
      handle: "watches",
      variant: "standard",
      accent: "#ff6b00",
    },
  ];

  return (
    <div className="w-full bg-off-white">
      {categories.map((cat) => (
        <CollectionSection
          key={cat.handle}
          title={cat.title}
          handle={cat.handle}
          variant={cat.variant as LayoutVariant}
          accentColor={cat.accent}
        />
      ))}
    </div>
  );
}

export default FeaturedCollections;
