"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { addItem } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  price,
  quantity,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  price: string;
  quantity: number;
}) {
  const { pending } = useFormStatus();
  const totalPrice = (parseFloat(price) * quantity).toLocaleString();

  if (!availableForSale) {
    return (
      <button
        disabled
        className="flex h-12 w-full items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 px-6 opacity-50"
      >
        <span className="font-nav text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          Out Of Stock
        </span>
      </button>
    );
  }

  return (
    <button
      type="submit"
      aria-label="Add to bag"
      disabled={!selectedVariantId || pending}
      className={`group relative flex h-12 w-full items-center justify-between overflow-hidden rounded-full transition-all duration-300 active:scale-[0.98] disabled:opacity-90 sm:px-6 px-4 shadow-xl ${
        pending
          ? "bg-neutral-900 dark:bg-neutral-100 scale-[0.99] cursor-wait"
          : "bg-black dark:bg-white hover:scale-[1.01]"
      }`}
    >
      {pending && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute h-full w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[2px] w-full animate-pulse bg-white/40 dark:bg-black/40" />
        </div>
      )}

      <div className="relative z-10 flex min-w-0 items-center gap-2 sm:gap-3">
        {pending ? (
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white dark:bg-black [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white dark:bg-black [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white dark:bg-black" />
          </div>
        ) : (
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white dark:bg-black text-black dark:text-white transition-transform group-hover:rotate-90 border border-black/10 dark:border-white/10">
            <PlusIcon className="h-3 w-3 stroke-[4]" />
          </div>
        )}
        <span className="truncate font-nav text-[11px] font-bold uppercase tracking-[0.2em] text-white dark:text-black">
          {pending ? "Processing..." : "Bag"}
        </span>
      </div>

      <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
        <span
          className={`h-3 w-[1px] ${pending ? "bg-white/30 dark:bg-black/30" : "bg-white/40 dark:bg-black/40"}`}
        />
        <span className="font-mono text-[11px] font-bold tracking-tighter text-white dark:text-black">
          PHP {totalPrice}
        </span>
      </div>
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);
  const [quantity, setQuantity] = useState(1);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((v) => v.id === selectedVariantId)!;
  const price =
    finalVariant?.price?.amount || product.priceRange.minVariantPrice.amount;

  const handleQuantity = (type: "plus" | "minus") => {
    setQuantity((prev) =>
      type === "plus" ? prev + 1 : prev > 1 ? prev - 1 : 1,
    );
  };

  return (
    <div className="fixed bottom-6 left-0 z-50 flex w-full justify-center px-4 pointer-events-none md:bottom-10">
      <div className="flex w-full max-w-[480px] flex-col items-center pointer-events-auto">
        <div className="flex w-full flex-nowrap items-center gap-1 rounded-full bg-white/90 dark:bg-neutral-900/90 p-1.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] border border-neutral-200 dark:border-neutral-800 backdrop-blur-xl">
          <div className="flex shrink-0 items-center bg-neutral-100 dark:bg-neutral-800 rounded-full px-1 py-0.5">
            <button
              onClick={() => handleQuantity("minus")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black dark:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-20 active:scale-90"
              type="button"
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-4 w-4 stroke-[2.5]" />
            </button>
            <span className="min-w-[1.5rem] px-1 text-center font-mono text-[13px] font-black tabular-nums text-black dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantity("plus")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black dark:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10 active:scale-90"
              type="button"
            >
              <PlusIcon className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>

          <form
            action={async () => {
              if (!selectedVariantId) return;
              for (let i = 0; i < quantity; i++) {
                addCartItem(finalVariant, product);
              }
              const addItemWithId = formAction.bind(null, selectedVariantId);
              await Promise.all(
                Array.from({ length: quantity }).map(() => addItemWithId()),
              );
              setQuantity(1);
            }}
            className="min-w-0 flex-1 ml-1"
          >
            <SubmitButton
              availableForSale={availableForSale}
              selectedVariantId={selectedVariantId}
              price={price}
              quantity={quantity}
            />
            <p aria-live="polite" className="sr-only" role="status">
              {message}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
