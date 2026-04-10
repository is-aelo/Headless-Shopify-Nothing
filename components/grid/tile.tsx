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

  const formatNumber = (val: string) => {
    return new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(val));
  };

  const truncateTitle = (str: string, limit: number) => {
    if (!str) return "";
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <div
      className={clsx(
        "group flex flex-col h-full w-full bg-white overflow-hidden border border-surface/10 rounded-md transition-shadow duration-300",
        {
          "ring-1 ring-inset ring-primary": active,
        },
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center border-b border-surface/10">
        {discountPercent > 0 && (
          <div className="absolute left-2 top-2 z-10 md:left-3 md:top-3">
            <span className="bg-accent-red px-1 py-0.5 text-[8px] md:text-[10px] font-bold tracking-tighter text-white uppercase">
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

      <div className="flex flex-col justify-between h-[85px] md:h-[90px] px-2.5 py-2 md:px-3 md:py-2.5 bg-white">
        <div>
          <h3 className="font-product text-[11px] md:text-[13px] uppercase leading-tight tracking-[0.03em] text-primary">
            {truncateTitle(label?.title || "", 55)}
          </h3>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-body text-[6px] md:text-[7px] uppercase tracking-widest text-muted leading-none mb-0.5 md:mb-1">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-body text-[13px] md:text-[15px] font-bold text-primary tracking-tighter leading-none flex items-baseline">
                <span className="text-[0.9em] font-medium mr-1">PHP</span>
                {formatNumber(label?.amount || "0")}
              </span>

              {compareAtAmount > amount && (
                <span className="hidden sm:inline font-body text-[9px] text-muted line-through decoration-surface/20 ml-1">
                  PHP {formatNumber(label?.compareAtPrice || "0")}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-1 pb-0.5">
            {colorOptions && colorOptions.length > 0 ? (
              colorOptions
                .slice(0, 3)
                .map((hex, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "h-1.5 w-1.5 md:h-2 md:w-2 rounded-full border shadow-sm",
                      hex.toUpperCase() === "#FFFFFF" ||
                        hex.toUpperCase() === "#FAFAFA"
                        ? "border-border-l"
                        : "border-transparent",
                    )}
                    style={{ backgroundColor: hex }}
                  />
                ))
            ) : (
              <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full border border-dashed border-border-l bg-transparent" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
