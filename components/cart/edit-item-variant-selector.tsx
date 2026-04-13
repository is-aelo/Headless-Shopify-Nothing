"use client";

import { updateItemVariant } from "components/cart/actions";
import type { CartItem, ProductVariant } from "lib/shopify/types";
import { useActionState, useCallback, useTransition } from "react";

export function EditItemVariantSelector({
  item,
  variants,
  optimisticUpdate,
}: {
  item: CartItem;
  variants: ProductVariant[];
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(updateItemVariant, null);
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMerchandiseId = e.target.value;

      if (!newMerchandiseId || newMerchandiseId === item.merchandise.id) return;

      const selectedVariant = variants.find((v) => v.id === newMerchandiseId);

      // Force browser to start downloading the new image source immediately
      if (selectedVariant?.image?.url) {
        const img = new Image();
        img.src = selectedVariant.image.url;
      }

      const payload = {
        lineId: item.id as string,
        oldMerchandiseId: item.merchandise.id,
        newMerchandiseId,
        quantity: item.quantity,
      };

      startTransition(async () => {
        optimisticUpdate(item.merchandise.id, "update", newMerchandiseId);
        await formAction(payload);
      });
    },
    [item, optimisticUpdate, formAction, variants],
  );

  if (!variants || variants.length <= 1) return null;

  return (
    <form className="mt-3">
      {/* Note: If you want the actual thumbnail in the cart to show a skeleton, 
         you should pass 'isPending' up to the parent component or use a 
         global loading state. Otherwise, we can add a small indicator here.
      */}
      <label className="sr-only" htmlFor={`variant-${item.id}`}>
        Variant
      </label>
      <div className="relative inline-block w-full">
        <select
          id={`variant-${item.id}`}
          value={item.merchandise.id}
          onChange={handleChange}
          disabled={isPending}
          className="peer w-full appearance-none rounded-none border-b border-black/10 bg-transparent py-2 font-mono text-[12px] uppercase tracking-normal text-primary hover:text-surface focus:border-black focus:outline-none disabled:cursor-not-allowed"
        >
          {variants.map((variant) => (
            <option
              key={variant.id}
              value={variant.id}
              disabled={!variant.availableForSale}
              className="bg-off-white text-primary"
            >
              {variant.title} {variant.availableForSale ? "" : "— SOLD OUT"}
            </option>
          ))}
        </select>

        {/* Technical Spinner/Skeleton Indicator */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 text-primary peer-hover:text-surface">
          {isPending ? (
            <div className="h-2 w-2 animate-pulse bg-accent-red" />
          ) : (
            <svg
              width="10"
              height="10"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
        </div>
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
