import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import { CollapsibleDetails } from "./collapsible-details";
import { Rating } from "./rating";
import { VariantSelector } from "./variant-selector";

function extractIntro(description?: string) {
  if (!description) return "";
  const cleanText = description
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Lead with the first two sentences — enough context, not a wall of text.
  return cleanText
    .split(/(?<=[.!?])\s+/)
    .slice(0, 2)
    .join(" ");
}

export function ProductDescription({ product }: { product: Product }) {
  const intro = extractIntro(product.description);
  const currencyCode = product.priceRange.maxVariantPrice.currencyCode;
  const amount = product.priceRange.maxVariantPrice.amount;
  const compareAtPrice = product.variants[0]?.compareAtPrice?.amount;

  const isOnSale =
    compareAtPrice && parseFloat(compareAtPrice) > parseFloat(amount);

  return (
    <div className="flex flex-col gap-8">
      {/* Title + Price */}
      <header className="border-b border-black/[0.06] pb-6">
        <h1 className="font-logo text-[clamp(1.75rem,3vw,2.75rem)] uppercase leading-[0.9] tracking-tighter text-surface">
          {product.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <Price
            className="font-mono text-xl tracking-tight text-surface"
            currencyCode={currencyCode}
            amount={amount}
          />
          {isOnSale && (
            <Price
              className="font-mono text-sm tracking-tight line-through text-muted"
              currencyCode={currencyCode}
              amount={compareAtPrice}
            />
          )}
        </div>
        <div className="mt-3">
          <Rating
            rating={product.metafields?.rating}
            ratingCount={product.metafields?.ratingCount}
            count={product.metafields?.count}
          />
        </div>
      </header>

      {/* Intro */}
      {intro && (
        <p className="font-mono text-[12px] md:text-[13px] leading-relaxed text-surface/70">
          {intro}
        </p>
      )}

      {/* Variants */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Full description */}
      {product.descriptionHtml && (
        <CollapsibleDetails html={product.descriptionHtml} />
      )}

      {/* CTA */}
      <AddToCart product={product} />
    </div>
  );
}
