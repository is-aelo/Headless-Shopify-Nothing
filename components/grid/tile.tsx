import clsx from "clsx";
import Image from "next/image";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  colorOptions,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    compareAtPrice?: string;
    position?: "bottom" | "center";
  };
  colorOptions?: string[];
} & React.ComponentProps<typeof Image>) {
  const amount = parseFloat(label?.amount || "0");
  const compareAtAmount = parseFloat(label?.compareAtPrice || "0");
  const discountPercent =
    compareAtAmount > amount
      ? Math.round(((compareAtAmount - amount) / compareAtAmount) * 100)
      : 0;

  const formatCurrency = (val: string) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: label?.currencyCode || "PHP",
      minimumFractionDigits: 0,
    }).format(parseFloat(val));
  };

  return (
    <div
      className={clsx(
        "group flex flex-col h-full w-full bg-white overflow-hidden border border-[#6e6e6e] rounded-md transition-shadow duration-300",
        {
          "ring-1 ring-inset ring-black": active,
        },
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center border-b border-[#6e6e6e]">
        {discountPercent > 0 && (
          <div className="absolute left-4 top-4 z-10">
            <span className="bg-[#FF0000] px-2 py-0.5 text-[11px] font-bold tracking-tighter text-white uppercase">
              {discountPercent}% OFF
            </span>
          </div>
        )}

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

      <div className="flex flex-col justify-between h-[140px] p-5 bg-[#FAFAFA]">
        <div className="space-y-1">
          <h3 className="font-mono text-[13px] uppercase leading-snug tracking-tight text-black line-clamp-2 min-h-[40px]">
            {label?.title}
          </h3>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase text-neutral-500">
              From
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-bold text-black">
                {formatCurrency(label?.amount || "0")}
              </span>
              {compareAtAmount > amount && (
                <span className="font-mono text-xs text-neutral-400 line-through decoration-[#6e6e6e]">
                  {formatCurrency(label?.compareAtPrice || "0")}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-1.5 pb-1">
            {colorOptions && colorOptions.length > 0 ? (
              colorOptions
                .slice(0, 4)
                .map((hex, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "h-3.5 w-3.5 rounded-full border shadow-sm",
                      hex.toUpperCase() === "#FFFFFF" ||
                        hex.toUpperCase() === "#FAFAFA"
                        ? "border-neutral-300"
                        : "border-transparent",
                    )}
                    style={{ backgroundColor: hex }}
                  />
                ))
            ) : (
              <div className="h-3.5 w-3.5 rounded-full border border-dashed border-neutral-300 bg-transparent" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
