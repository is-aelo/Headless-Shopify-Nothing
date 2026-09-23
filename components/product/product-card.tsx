import { addItem } from "components/cart/actions";
import { getHexColor } from "lib/constants";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

async function addItemAction(formData: FormData) {
  "use server";
  const variantId = formData.get("variantId") as string;
  await addItem(null, variantId);
}

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtAmount = parseFloat(
    product.variants[0]?.compareAtPrice?.amount || "0",
  );
  const discountPercent =
    compareAtAmount > amount
      ? Math.round(((compareAtAmount - amount) / compareAtAmount) * 100)
      : 0;

  const gridVariantId = product.variants[0]?.id;
  const colorOptions = product.options
    ?.find(
      (opt) =>
        opt.name.toLowerCase() === "color" ||
        opt.name.toLowerCase() === "colour",
    )
    ?.values.slice(0, 3);

  return (
    <div
      className={`flex flex-col border-r border-border-l last:border-r-0 bg-white group overflow-hidden ${index >= 2 ? "border-t lg:border-t-0" : ""}`}
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
          href={`/product/${product.handle}`}
          className="relative w-full h-full"
        >
          <Image
            src={product.featuredImage?.url || ""}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Desktop Add to Bag */}
        <form
          action={addItemAction}
          className="hidden lg:block absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10"
        >
          <input type="hidden" name="variantId" value={gridVariantId} />
          <button
            type="submit"
            className="w-full bg-primary text-white font-nav text-[10px] py-5 uppercase tracking-[0.3em] hover:bg-black/90 cursor-pointer"
          >
            + Add to Bag
          </button>
        </form>
      </div>

      <div className="flex border-t border-border-l items-stretch bg-white relative z-20">
        <Link
          href={`/product/${product.handle}`}
          className="flex-1 flex flex-col p-3 lg:p-6 min-w-0 justify-center"
        >
          {/* Title using font-logo with heavy stroke for bold effect */}
          <h4 className="font-logo font-regular text-[11px] lg:text-[13px] uppercase tracking-wider mb-1 text-primary line-clamp-1 font-logo-heavy">
            {product.title}
          </h4>

          <div className="flex items-center gap-2">
            {/* Price using font-body (JetBrains Mono) */}
            <span className="font-body text-[9px] lg:text-[10px] text-primary font-medium tracking-tight">
              PHP {amount.toFixed(0)}
            </span>
            {compareAtAmount > amount && (
              <span className="font-body text-[8px] text-muted line-through opacity-50">
                {compareAtAmount.toFixed(0)}
              </span>
            )}
          </div>
        </Link>

        {/* Mobile Add to Bag */}
        <form
          action={addItemAction}
          className="lg:hidden border-l border-border-l flex"
        >
          <input type="hidden" name="variantId" value={gridVariantId} />
          <button
            type="submit"
            className="px-5 flex items-center justify-center bg-white active:bg-off-white text-primary cursor-pointer"
          >
            <span className="font-logo text-2xl leading-none">+</span>
          </button>
        </form>
      </div>
    </div>
  );
}
