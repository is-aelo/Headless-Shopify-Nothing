import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { Minus, Plus } from "lucide-react";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mt-10 flex flex-col border-b border-border-l pb-8 pt-2 md:mt-0">
        <h1 className="mb-6 font-product text-[1.85rem] font-medium uppercase leading-[0.9] tracking-tighter text-surface sm:text-3xl md:text-5xl">
          {product.title}
        </h1>
        <div className="font-ui text-xl tracking-tight text-surface/90">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>

      <div className="mb-8 mt-8">
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
      </div>

      {product.descriptionHtml ? (
        <details className="group mb-8 border-b border-border-l pb-4">
          <summary className="flex cursor-pointer list-none flex-col transition-colors">
            <div className="flex items-center justify-between font-ui text-xs uppercase tracking-[0.2em] text-surface/50 group-hover:text-surface">
              <span className="group-open:hidden">Specifications</span>
              <span className="hidden group-open:block">Hide Specs</span>
              <div className="text-surface/50">
                <Plus
                  size={16}
                  strokeWidth={1.5}
                  className="group-open:hidden"
                />
                <Minus
                  size={16}
                  strokeWidth={1.5}
                  className="hidden group-open:block"
                />
              </div>
            </div>

            <div className="mt-4 group-open:hidden">
              <div className="line-clamp-4 font-body text-sm leading-relaxed text-surface/60">
                <Prose className="inline" html={product.descriptionHtml} />
              </div>
            </div>
          </summary>

          <div className="mt-4 hidden group-open:block">
            <Prose
              className="font-body text-sm leading-relaxed text-surface/80 prose-headings:text-surface prose-strong:text-surface prose-li:text-surface"
              html={product.descriptionHtml}
            />
          </div>
        </details>
      ) : null}

      <AddToCart product={product} />
    </>
  );
}
