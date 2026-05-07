import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { addItem } from "components/cart/actions";
import { getCollectionProducts } from "lib/shopify";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

async function addItemAction(formData: FormData) {
  "use server";
  const variantId = formData.get("variantId") as string;
  await addItem(null, variantId);
}

function formatDescription(description?: string) {
  if (!description) return "";
  const clean = description.replace(/<[^>]*>/g, "").trim();
  const max = 180;
  return clean.length > max ? clean.slice(0, max).trimEnd() + "..." : clean;
}

function formatVariantAvailability(product: Product) {
  const variants =
    product.variants
      ?.map((v) => v.title)
      .filter(
        (t) =>
          t &&
          t.toLowerCase() !== "default title" &&
          t.toLowerCase().includes("default") === false,
      ) || [];

  if (variants.length === 0) return null;
  return `Available in ${variants.join(" • ")}`;
}

function DottedGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.12] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

function SecondaryProductCard({
  product,
}: {
  product: Product;
  accentColor: string;
}) {
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtAmount = parseFloat(
    product.variants[0]?.compareAtPrice?.amount || "0",
  );

  return (
    <div className="group flex flex-col sm:flex-row items-center gap-6 px-6 lg:px-10 py-10 border-r border-border-l last:border-r-0 hover:bg-[#fafafa] transition-all duration-300 relative overflow-hidden">
      <DottedGrid />
      <Link
        href={`/product/${product.handle}`}
        className="relative z-10 w-full aspect-square sm:w-[120px] sm:h-[120px] shrink-0 rounded-sm bg-[#f5f5f5] overflow-hidden"
      >
        <Image
          src={product.featuredImage?.url || ""}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, 120px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="relative z-10 flex flex-col gap-2 min-w-0 flex-1 w-full text-center sm:text-left">
        <h4 className="font-logo text-[1.05rem] leading-[1] tracking-[-0.04em] uppercase text-primary">
          {product.title}
        </h4>

        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <span className="font-body text-[10px] uppercase tracking-[0.14em] text-primary">
            PHP {amount.toFixed(0)}
          </span>

          {compareAtAmount > amount && (
            <span className="font-body text-[10px] uppercase tracking-[0.14em] text-muted line-through opacity-40">
              {compareAtAmount.toFixed(0)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
          <form action={addItemAction}>
            <input
              type="hidden"
              name="variantId"
              value={product.variants?.[0]?.id}
            />
            <button
              type="submit"
              className="h-[42px] px-6 rounded-sm bg-black text-white font-nav text-[9px] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-neutral-800"
            >
              Buy Now
            </button>
          </form>

          <Link
            href={`/product/${product.handle}`}
            className="h-[42px] px-6 rounded-sm border border-black/10 bg-white font-nav text-[9px] uppercase tracking-[0.18em] flex items-center justify-center transition-all duration-300 hover:bg-black/[0.03] hover:border-black/20"
          >
            Discover
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

  // For the grid gallery, collect up to 4 other unique products from the same collection.
  // We can include secondary products if needed, or get more. For simplicity, we'll slice from current products list,
  // excluding the main product.
  const galleryProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const variantId = product.variants?.[0]?.id;
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);

  const heroImage = product.featuredImage?.url
    ? `${product.featuredImage.url}${
        product.featuredImage.url.includes("?") ? "&" : "?"
      }width=1400` // adjusted width for square aspect on desktop
    : "";

  const availabilityText = formatVariantAvailability(product);

  return (
    <div className="w-full bg-white border-b border-border-l relative overflow-hidden">
      <DottedGrid />

      <section className="relative overflow-hidden bg-[#f7f7f7]">
        <DottedGrid />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 py-14 lg:py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <span className="font-nav text-[10px] uppercase tracking-[0.45em] text-primary font-bold">
                {title}
              </span>
            </div>

            <Link
              href={`/search/${handle}`}
              className="h-[42px] px-5 rounded-sm border border-black/10 bg-white/70 backdrop-blur-md flex items-center gap-2 font-nav text-[10px] uppercase tracking-[0.18em] text-muted hover:text-primary hover:border-black/20 transition-all duration-300"
            >
              All {title}
              <ArrowRightIcon className="h-3 w-3 stroke-[3]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column: Image Container (Desktop Square, Mobile Square with Twist) */}
            <div className="relative flex items-center justify-center lg:justify-start lg:w-full lg:max-w-[720px]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.015] to-transparent blur-3xl scale-75" />

              {/* Main Hero Container: Square on Desktop, Square on Mobile */}
              <div className="relative aspect-square w-full bg-[#f0f0f0] rounded-sm overflow-hidden border border-black/[0.03] group">
                <Image
                  src={heroImage}
                  alt={product.title}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Mobile-only "subtle twist" text overlay. Only visible on mobile/tablet. */}
                <div className="absolute top-3 right-3 lg:hidden p-1 bg-white/60 backdrop-blur-sm rounded-sm">
                  <span className="font-nav text-[8px] uppercase tracking-[0.1em] text-black">
                    Featured {title}
                  </span>
                </div>
              </div>

              {/* Desktop-only: Integrated Square Grid (approx. 4 total including main, or 4 on sides)
                  Based on prompt, we add *other* images on sides, aiming for 4 squares in total container.
                  Simplest: main square (1x1) then 3 smaller. Let's make it more balanced. 
                  Maybe a main square flanked by two? The prompt is a bit open. 
                  "square containing on the SIDES other product images/ about 4 squares in total" 
                  Let's create a visual balance on desktop only, maintaining aspect ratio. 
                  We'll use a 2x2 grid layout within the overall desktop container on the left, but only on desktop. */}

              {galleryProducts.length > 0 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 flex-col gap-3">
                  {galleryProducts.map((p, index) => (
                    <Link
                      key={p.handle}
                      href={`/product/${p.handle}`}
                      className="relative group w-[100px] h-[100px] aspect-square rounded-sm overflow-hidden border border-black/10 bg-[#f5f5f5]"
                    >
                      <Image
                        src={p.featuredImage?.url || ""}
                        alt={p.title}
                        fill
                        sizes="100px"
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="font-nav text-[9px] uppercase text-white tracking-[0.1em] text-center px-1">
                          {p.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col justify-center max-w-[520px] lg:pl-10">
              <div className="flex flex-col gap-5">
                <h2 className="font-logo text-[3rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] uppercase tracking-[-0.08em] leading-[0.9] text-primary">
                  {product.title}
                </h2>

                <div className="flex flex-col gap-1">
                  <span className="font-body text-[12px] uppercase tracking-[0.18em] text-muted">
                    PHP {amount.toFixed(0)}
                  </span>

                  {availabilityText && (
                    <span className="text-[11px] uppercase tracking-[0.14em] text-muted opacity-80">
                      {availabilityText}
                    </span>
                  )}
                </div>

                <p className="text-[15px] leading-[1.8] text-muted max-w-[480px]">
                  {formatDescription(product.description)}
                </p>

                <div className="flex flex-wrap gap-3 pt-3">
                  <form action={addItemAction}>
                    <input type="hidden" name="variantId" value={variantId} />
                    <button
                      type="submit"
                      className="h-[52px] px-8 rounded-sm bg-black text-white font-nav text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99]"
                    >
                      Buy Now
                    </button>
                  </form>

                  <Link
                    href={`/product/${product.handle}`}
                    className="h-[52px] px-8 rounded-sm border border-black/10 bg-white font-nav text-[10px] uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300 hover:bg-black/[0.03] hover:border-black/20"
                  >
                    Discover
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {secondaryProducts.length > 0 && (
        <div className="w-full bg-white relative">
          <div className="max-w-[1440px] mx-auto border-x border-border-l">
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
        </div>
      )}

      <div className="w-full h-[72px] bg-[#fafafa] border-t border-border-l relative overflow-hidden">
        <DottedGrid />
      </div>
    </div>
  );
}

export default async function FeaturedCollections() {
  const categories = [
    { title: "Phones", handle: "phones", accent: "#FF0000" },
    { title: "CMF", handle: "cmf", accent: "#FF5C00" },
    { title: "Audio", handle: "audio", accent: "#FF0000" },
  ];

  const usedIds = new Set<string>();

  return (
    <div className="w-full bg-white relative overflow-hidden">
      <DottedGrid />
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
