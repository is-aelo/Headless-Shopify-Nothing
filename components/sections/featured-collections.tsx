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
  const max = 140;
  return clean.length > max ? clean.slice(0, max).trimEnd() + "..." : clean;
}

function DottedGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, #000 0.8px, transparent 0.8px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

function SecondaryProductCard({ product }: { product: Product }) {
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <div className="group relative flex items-center gap-6 p-6 border-r border-black/[0.05] last:border-r-0 hover:bg-[#fafafa] transition-colors duration-300">
      <Link
        href={`/product/${product.handle}`}
        className="relative h-20 w-20 shrink-0 rounded-lg bg-[#f0f0f0] overflow-hidden border border-black/5"
      >
        <Image
          src={product.featuredImage?.url || ""}
          alt={product.title}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-col gap-1 min-w-0">
        <h4 className="font-logo text-sm uppercase tracking-tight truncate">
          {product.title}
        </h4>
        <span className="font-mono text-[10px] text-black/40">
          PHP {amount.toLocaleString()}
        </span>
        <Link
          href={`/product/${product.handle}`}
          className="font-nav text-[9px] uppercase tracking-widest text-black/60 hover:text-black mt-1 inline-block"
        >
          View Details
        </Link>
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

  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = parseFloat(
    product.variants[0]?.compareAtPrice?.amount || "0",
  );

  const variants =
    product.variants?.filter(
      (v) => v.title.toLowerCase() !== "default title",
    ) || [];

  const heroImage = product.featuredImage?.url
    ? `${product.featuredImage.url}${
        product.featuredImage.url.includes("?") ? "&" : "?"
      }width=1400`
    : "";

  return (
    <div className="w-full bg-white border-b border-black/[0.08] relative overflow-hidden">
      <DottedGrid />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-6 lg:px-12 py-8 border-b border-black/[0.05]">
          <div className="flex items-center gap-4">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <h2 className="font-nav text-xs uppercase tracking-[0.4em] font-bold">
              {title}
            </h2>
          </div>
          <Link
            href={`/search/${handle}`}
            className="font-nav text-[10px] uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
          >
            All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-square w-full bg-[#f7f7f7] border-b lg:border-b-0 lg:border-r border-black/[0.05] overflow-hidden group">
            <Image
              src={heroImage}
              alt={product.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="flex flex-col p-8 lg:p-20 justify-center bg-white/50 backdrop-blur-sm">
            <div className="max-w-[440px]">
              <div className="flex flex-wrap gap-2 mb-8">
                {variants.length > 0 ? (
                  variants.map((v) => (
                    <span
                      key={v.id}
                      className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-black/10 rounded-sm bg-white text-black"
                    >
                      {v.title}
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-black/10 rounded-sm bg-white text-black/40">
                    Standard Edition
                  </span>
                )}
              </div>

              <h3 className="font-logo text-5xl lg:text-7xl uppercase tracking-tighter leading-none mb-8">
                {product.title}
              </h3>

              {/* Responsive description text scaling */}
              <p className="font-body text-sm sm:text-base lg:text-lg text-black/60 leading-normal sm:leading-relaxed mb-10">
                {formatDescription(product.description)}
              </p>

              <div className="flex items-center justify-between mb-10 pb-6 border-b border-black/[0.05]">
                <div className="flex items-baseline gap-3">
                  <span className="font-logo text-3xl">
                    PHP {amount.toFixed(0)}
                  </span>
                  {compareAtPrice > amount && (
                    <span className="font-mono text-sm text-black/30 line-through">
                      {compareAtPrice.toFixed(0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <form action={addItemAction} className="flex-[2]">
                  <input
                    type="hidden"
                    name="variantId"
                    value={product.variants[0]?.id}
                  />
                  <button className="w-full h-14 bg-black text-white font-nav text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-neutral-800 transition-all active:scale-[0.98]">
                    Buy Now
                  </button>
                </form>
                <Link
                  href={`/product/${product.handle}`}
                  className="flex-1 h-14 border border-black/10 bg-white flex items-center justify-center font-nav text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-black/5 transition-all text-center"
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>
        </div>

        {secondaryProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-black/[0.05] bg-[#fafafa]">
            {secondaryProducts.map((p) => (
              <SecondaryProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default async function FeaturedCollections() {
  const categories = [
    { title: "Phones", handle: "phones", accent: "#FF0000" },
    { title: "CMF", handle: "cmf", accent: "#FF5C00" },
    { title: "Audio", handle: "audio", accent: "#333333" },
  ];

  const usedIds = new Set<string>();

  return (
    <div className="w-full bg-white">
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
