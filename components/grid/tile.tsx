"use client";

import clsx from "clsx";
import { getHexColor } from "lib/constants";
import Image from "next/image";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  colorOptions,
  variantId,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    compareAtPrice?: string;
  };
  colorOptions?: string[];
  variantId?: string;
  handle?: string;
} & React.ComponentProps<typeof Image>) {
  const amount = parseFloat(label?.amount || "0");
  const compareAtAmount = parseFloat(label?.compareAtPrice || "0");
  const discountPercent =
    compareAtAmount > amount
      ? Math.round(((compareAtAmount - amount) / compareAtAmount) * 100)
      : 0;

  const formatNumber = (val: string) => {
    return new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(val));
  };

  return (
    <div
      className={clsx(
        "group flex flex-col h-full w-full bg-white overflow-hidden border border-border-l transition-all duration-300",
        {
          "ring-1 ring-inset ring-primary": active,
        },
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center bg-white">
        {discountPercent > 0 && (
          <div className="absolute left-0 top-3 z-10">
            <span className="bg-accent-red px-2 py-0.5 text-[8px] md:text-[10px] font-bold tracking-[0.1em] text-white uppercase">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        <div className="absolute right-2 top-2 flex flex-col gap-1 z-10">
          {colorOptions
            ?.slice(0, 3)
            .map((color, index) => (
              <div
                key={index}
                className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full border border-border-l shadow-sm"
                style={{ backgroundColor: getHexColor(color) }}
              />
            ))}
        </div>

        {props.src ? (
          <Image
            className={clsx(
              "h-full w-full object-cover transition-transform duration-500 ease-in-out",
              {
                "group-hover:scale-105": isInteractive,
              },
            )}
            {...props}
          />
        ) : null}
      </div>

      <div className="flex border-t border-border-l items-stretch bg-white relative">
        <div className="flex-1 flex flex-col p-3 md:p-4 min-w-0 justify-center">
          <h4 className="font-product text-[10px] md:text-[11px] uppercase tracking-wider mb-0.5 text-primary font-bold line-clamp-1">
            {label?.title}
          </h4>
          <div className="flex items-center gap-1.5">
            <span className="font-nav text-[9px] md:text-[10px] text-primary font-medium">
              PHP {formatNumber(label?.amount || "0")}
            </span>
            {compareAtAmount > amount && (
              <span className="font-nav text-[8px] text-muted line-through opacity-60">
                {formatNumber(label?.compareAtPrice || "0")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
