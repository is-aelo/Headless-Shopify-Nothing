"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    // When switching variants, we clear the manual gallery index
    // This allows the Gallery component to default back to the variant-specific image
    params.delete("image");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => (
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 font-nav text-[11px] uppercase tracking-[0.2em] text-surface/60">
        {option.name}
      </dt>
      <dd className="flex flex-wrap gap-2">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          // Check if this specific value is active in the URL
          const isActive =
            searchParams.get(optionNameLowerCase)?.toLowerCase() ===
            value.toLowerCase();

          // Optimized logic to determine if this combination is purchasable
          const isAvailableForSale = combinations.some((combination) => {
            return (
              combination[optionNameLowerCase] === value &&
              combination.availableForSale &&
              Object.entries(Object.fromEntries(searchParams.entries()))
                .filter(
                  ([key]) => key !== optionNameLowerCase && key !== "image",
                )
                .every(
                  ([key, val]) =>
                    combination[key]?.toString().toLowerCase() ===
                    val.toLowerCase(),
                )
            );
          });

          return (
            <button
              key={value}
              onClick={() => updateOption(optionNameLowerCase, value)}
              aria-disabled={!isAvailableForSale}
              aria-selected={isActive}
              disabled={!isAvailableForSale}
              title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
              className={clsx(
                "min-w-[48px] px-4 py-2 text-xs font-nav uppercase tracking-tighter transition-all duration-200 border rounded-[6px]",
                {
                  // Active State
                  "bg-surface text-off-white border-surface": isActive,
                  // Inactive State
                  "bg-white text-surface border-border-l hover:border-surface":
                    !isActive && isAvailableForSale,
                  // Out of Stock State
                  "relative opacity-40 cursor-not-allowed border-border-l bg-neutral-100 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:-rotate-12 before:bg-surface":
                    !isAvailableForSale,
                },
              )}
            >
              {value}
            </button>
          );
        })}
      </dd>
    </dl>
  ));
}
