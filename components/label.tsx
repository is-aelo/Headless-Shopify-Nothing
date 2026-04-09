import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Price from "./price";
import StatusDot from "./status-dot"; // Import here

const Label = ({
  title,
  amount,
  currencyCode,
  compareAtPrice,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  compareAtPrice?: string;
  position?: "bottom" | "center";
}) => {
  const isOnSale =
    compareAtPrice && parseFloat(compareAtPrice) > parseFloat(amount);

  const discountPercentage = isOnSale
    ? Math.round(
        ((parseFloat(compareAtPrice) - parseFloat(amount)) /
          parseFloat(compareAtPrice)) *
          100,
      )
    : 0;

  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 w-full p-4 transition-all duration-500 ease-in-out group-hover:translate-y-[-4px]",
        { "lg:px-20 lg:pb-[35%]": position === "center" },
      )}
    >
      <div className="flex w-full flex-col overflow-hidden border border-black/5 bg-[#f5f5f5] p-4 shadow-2xl rounded-xl transition-all duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Using the new perfect circle component */}
            <StatusDot />
            <h2 className="line-clamp-1 font-nav text-[10px] uppercase tracking-[0.2em] text-black">
              {title}
            </h2>
          </div>
          <ChevronDown
            className="h-4 w-4 text-black/50 transition-transform duration-500 ease-in-out group-hover:rotate-180"
            strokeWidth={1.5}
          />
        </div>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
              <div className="flex items-center gap-3">
                <Price
                  className="font-product text-base font-medium tracking-tight text-black"
                  amount={amount}
                  currencyCode={currencyCode}
                  currencyCodeClassName="hidden"
                />

                {isOnSale && (
                  <div className="flex items-center gap-2">
                    <Price
                      className="font-product text-[11px] font-light line-through text-black/40"
                      amount={compareAtPrice}
                      currencyCode={currencyCode}
                      currencyCodeClassName="hidden"
                    />
                    <span className="bg-accent-red px-1.5 py-0.5 font-body text-[9px] font-bold text-white uppercase tracking-tighter rounded-sm">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Label;
