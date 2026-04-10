import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b border-border-l pb-6">
        <h1 className="mb-2 font-product text-5xl font-medium uppercase tracking-tighter text-surface">
          {product.title}
        </h1>
        <div className="font-ui text-lg tracking-tight text-surface">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 font-body text-body-base leading-body-base text-surface prose-headings:text-surface prose-strong:text-surface prose-li:text-surface"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart product={product} />
    </>
  );
}
