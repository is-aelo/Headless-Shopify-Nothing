import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { addItem } from "components/cart/actions";
import StatusDot from "components/status-dot";
import { getCollectionProducts } from "lib/shopify";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function addItemAction(formData: FormData) {
  "use server";
  const variantId = formData.get("variantId") as string;
  await addItem(null, variantId);
}

function formatDescription(description?: string) {
  if (!description) return "";

  const cleanText = description.replace(/<[^>]*>/g, "").trim();
  const sentences = cleanText.split(/(?<=[.!?])\s+/);
  const result = sentences.slice(0, 3).join(" ");

  return result;
}

function DottedGrid() {
  return (
    <div
      className="w-full h-full opacity-[0.07] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, #000 0.8px, transparent 0.8px)",
        backgroundSize: "24px 24px",
        backgroundPosition: "center",
      }}
    />
  );
}

function SecondaryProductCard({ product }: { product: Product }) {
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <div className="group relative flex items-center gap-4 p-4 sm:gap-6 sm:p-6 border-b sm:border-b-0 sm:border-r border-black/[0.05] last:border-b-0 sm:last:border-r-0 hover:bg-white transition-colors duration-300">
      <Link
        href={`/product/${product.handle}`}
        className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg bg-[#f0f0f0] overflow-hidden border border-black/5"
      >
        <Image
          src={product.featuredImage?.url || ""}
          alt={product.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
        <h4 className="font-product text-[10px] sm:text-[11px] font-black uppercase tracking-tight truncate">
          {product.title}
        </h4>
        <span className="font-mono text-[9px] sm:text-[10px] font-medium text-black">
          PHP {amount.toLocaleString()}
        </span>
        <Link
          href={`/product/${product.handle}`}
          className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-muted hover:text-primary mt-1 inline-block transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

async function CollectionSection({ title, handle, usedIds }: any) {
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

  const allVariants =
    product.variants?.filter(
      (v) => v.title.toLowerCase() !== "default title",
    ) || [];

  const displayedVariants = allVariants.slice(0, 4);
  const remainingCount = allVariants.length - 4;

  const heroImage = product.featuredImage?.url
    ? `${product.featuredImage.url}${product.featuredImage.url.includes("?") ? "&" : "?"}width=1400`
    : "";

  return (
    <div className="w-full bg-white relative overflow-hidden z-10">
      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-6 sm:py-8 border-b border-black/[0.05]">
          <div className="flex items-center gap-2 sm:gap-3">
            <StatusDot />
            <h2 className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] font-black text-black">
              {title}
            </h2>
          </div>
          <Link
            href={`/search/${handle}`}
            className="group flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors"
          >
            All Products
            <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
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
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-10 lg:p-20 justify-center">
            <div className="max-w-[460px]">
              <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
                {displayedVariants.length > 0 ? (
                  <>
                    {displayedVariants.map((v) => (
                      <span
                        key={v.id}
                        className="inline-flex items-center px-2 py-1 rounded-sm border border-black/10 bg-black/[0.02] font-mono text-[9px] uppercase tracking-[0.2em] text-black/40"
                      >
                        {v.title}
                      </span>
                    ))}
                    {remainingCount > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-sm border border-dashed border-black/10 bg-transparent font-mono text-[9px] uppercase tracking-[0.2em] text-black/30">
                        +{remainingCount} MORE
                      </span>
                    )}
                  </>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-sm border border-dashed border-black/10 font-mono text-[9px] uppercase tracking-[0.2em] text-black/20">
                    Standard Edition
                  </span>
                )}
              </div>

              <h3 className="font-logo text-4xl sm:text-5xl lg:text-7xl uppercase tracking-tighter leading-none mb-6 sm:mb-8 text-primary font-black">
                {product.title}
              </h3>

              <p className="font-body text-xs sm:text-sm text-muted leading-relaxed mb-8 sm:mb-10">
                {formatDescription(product.description)}
              </p>

              <div className="flex items-center justify-between mb-8 sm:mb-10 pb-6 border-b border-black/[0.05]">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-medium tracking-tight text-black">
                    PHP {amount.toFixed(0)}
                  </span>
                  {compareAtPrice > amount && (
                    <span className="font-mono text-xs sm:text-sm text-muted line-through">
                      {compareAtPrice.toFixed(0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 w-full">
                <form action={addItemAction} className="flex-[2]">
                  <input
                    type="hidden"
                    name="variantId"
                    value={product.variants[0]?.id}
                  />
                  <button
                    type="submit"
                    className="btn-nothing-primary text-[10px] sm:text-[11px] h-12 sm:h-14"
                  >
                    Buy Now
                  </button>
                </form>
                <Link
                  href={`/product/${product.handle}`}
                  className="btn-nothing-outline flex-1 text-[10px] sm:text-[11px] h-12 sm:h-14"
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>
        </div>

        {secondaryProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-black/[0.05] bg-off-white/50">
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
    { title: "Phones", handle: "phones" },
    { title: "CMF", handle: "cmf" },
    { title: "Audio", handle: "audio" },
  ];

  const usedIds = new Set<string>();

  return (
    <div className="w-full bg-white flex flex-col py-10 sm:py-20 lg:py-40">
      {categories.map((cat, index) => (
        <React.Fragment key={cat.handle}>
          <CollectionSection
            title={cat.title}
            handle={cat.handle}
            usedIds={usedIds}
          />

          {index !== categories.length - 1 && (
            <div className="h-12 sm:h-20 lg:h-40 w-full relative flex items-center">
              <DottedGrid />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
