import { addItem } from "components/cart/actions";
import { getCollectionProducts } from "lib/shopify";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

function parseProductData(htmlDescription: string | undefined) {
  if (!htmlDescription) return { intro: "", specs: [] };
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

async function addItemAction(formData: FormData) {
  "use server";
  const variantId = formData.get("variantId") as string;
  await addItem(null, variantId);
}

function SecondaryProductCard({
  product,
  accentColor,
}: {
  product: Product;
  accentColor: string;
}) {
  const variantId = product.variants?.[0]?.id;
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtAmount = parseFloat(
    product.variants[0]?.compareAtPrice?.amount || "0",
  );

  const discountPercent =
    compareAtAmount > amount
      ? Math.round(((compareAtAmount - amount) / compareAtAmount) * 100)
      : 0;

  return (
    <div className="group flex flex-col sm:flex-row items-center gap-6 px-6 lg:px-10 py-10 border-r border-border-l last:border-r-0 hover:bg-white transition-colors duration-200">
      <Link
        href={`/product/${product.handle}`}
        className="relative w-[140px] h-[140px] shrink-0"
      >
        {discountPercent > 0 && (
          <div className="absolute left-0 top-0 z-10">
            <span className="bg-accent-red px-2 py-0.5 text-[8px] md:text-[9px] font-bold tracking-[0.1em] text-white uppercase">
              {discountPercent}% OFF
            </span>
          </div>
        )}
        <Image
          src={product.featuredImage?.url || ""}
          alt={product.title}
          fill
          className="object-contain"
        />
      </Link>
      <div className="flex flex-col gap-2 min-w-0 flex-1 w-full text-center sm:text-left">
        <h4 className="font-logo text-[1.1rem] leading-[1.1] tracking-[-0.02em] uppercase text-primary">
          {product.title}
        </h4>
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
          <span className="font-body text-[10px] uppercase tracking-[0.04em] text-primary">
            PHP {amount.toFixed(0)}
          </span>
          {compareAtAmount > amount && (
            <span className="font-body text-[10px] uppercase tracking-[0.04em] text-muted line-through opacity-50">
              {compareAtAmount.toFixed(0)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <form action={addItemAction}>
            <input type="hidden" name="variantId" value={variantId} />
            <button
              type="submit"
              className="btn-nothing-primary px-6 text-[9px] h-[36px] rounded-[4px] tracking-[0.08em] uppercase"
            >
              Buy {product.title}
            </button>
          </form>
          <Link
            href={`/product/${product.handle}`}
            className="btn-nothing-outline px-6 text-[9px] h-[36px] rounded-[4px] tracking-[0.08em] uppercase"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

async function CollectionSection({ title, handle, accentColor, usedIds }: any) {
  const allProducts = await getCollectionProducts({ collection: handle });
  const products = allProducts.filter((p) => !usedIds.has(p.id));
  if (!products || products.length === 0) return null;

  const product = products[0] as Product;
  usedIds.add(product.id);
  const secondaryProducts = products.slice(1, 3);
  secondaryProducts.forEach((p) => usedIds.add(p.id));

  const variantId = product.variants?.[0]?.id;
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtAmount = parseFloat(
    product.variants[0]?.compareAtPrice?.amount || "0",
  );

  const discountPercent =
    compareAtAmount > amount
      ? Math.round(((compareAtAmount - amount) / compareAtAmount) * 100)
      : 0;

  const { intro, specs } = parseProductData(
    product.descriptionHtml || product.description,
  );

  return (
    <section className="relative w-full bg-off-white overflow-hidden border-b border-border-l">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-6 lg:px-16 pt-10 lg:pt-12">
          <div className="flex items-center gap-3">
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
            <span className="font-nav text-[9px] uppercase tracking-[0.5em] text-muted">
              {title}
            </span>
          </div>
          <Link
            href={`/search/${handle}`}
            className="font-nav text-[9px] uppercase tracking-[0.3em] text-muted hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
          >
            All {title} &rarr;
          </Link>
        </div>

        <div className="px-6 lg:px-16 py-10 lg:py-16">
          <h3 className="font-logo text-[clamp(1.8rem,5vw,4rem)] leading-[0.9] tracking-[-0.04em] uppercase mb-4 text-primary">
            {product.title}
          </h3>

          {intro && (
            <p className="font-body text-[clamp(11px,1.2vw,13px)] uppercase tracking-[0.02em] text-muted mb-10 w-full max-w-full leading-[1.6] border-b border-border-l pb-8">
              {intro}
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square">
                {discountPercent > 0 && (
                  <div className="absolute left-0 top-3 z-10">
                    <span className="bg-accent-red px-2 py-0.5 text-[8px] md:text-[9px] font-bold tracking-[0.1em] text-white uppercase">
                      {discountPercent}% OFF
                    </span>
                  </div>
                )}
                <Image
                  src={product.featuredImage?.url || ""}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:border-l lg:border-r border-border-l lg:px-12 h-full justify-center">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 border-b border-border-l last:border-0 pb-4 last:pb-0"
                >
                  <span className="font-nav text-[8px] uppercase tracking-[0.35em] text-muted">
                    {spec.label}
                  </span>
                  <span className="font-body text-[11px] uppercase tracking-[0.02em] text-primary font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-6">
              <div className="flex flex-col gap-4">
                <form action={addItemAction}>
                  <input type="hidden" name="variantId" value={variantId} />
                  <button
                    type="submit"
                    className="btn-nothing-primary w-full px-10 text-[10px] h-[48px] rounded-[4px] tracking-[0.08em] uppercase"
                  >
                    Buy Now — PHP {amount.toFixed(0)}
                  </button>
                </form>
                {compareAtAmount > amount && (
                  <p className="font-body text-[10px] uppercase tracking-[0.1em] text-muted text-center line-through opacity-60">
                    WAS PHP {compareAtAmount.toFixed(0)}
                  </p>
                )}
                <Link
                  href={`/product/${product.handle}`}
                  className="btn-nothing-outline flex items-center justify-center px-10 text-[10px] h-[48px] w-full rounded-[4px] tracking-[0.08em] uppercase"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {secondaryProducts.length > 0 && (
          <div className="border-t border-border-l w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
              {secondaryProducts.map((p) => (
                <SecondaryProductCard
                  key={p.handle}
                  product={p}
                  accentColor={accentColor}
                />
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
    { title: "Phones", handle: "phones", accent: "var(--color-accent-red)" },
    { title: "CMF", handle: "cmf", accent: "var(--color-cmf-orange)" },
    { title: "Audio", handle: "audio", accent: "var(--color-accent-red)" },
  ];
  const usedIds = new Set<string>();

  return (
    <div className="w-full bg-off-white">
      {categories.map((cat) => (
        <CollectionSection
          key={cat.handle}
          title={cat.title}
          handle={cat.handle}
          accentColor={cat.accent}
          usedIds={usedIds}
        />
      ))}
    </div>
  );
}
