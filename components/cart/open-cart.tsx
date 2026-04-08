import clsx from "clsx";
import { ShoppingBag } from "lucide-react";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center text-primary transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:text-muted">
      <ShoppingBag
        className={clsx("h-5 w-5 transition-colors duration-200", className)}
        strokeWidth={1}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-1 -mt-1 flex h-4 w-4 items-center justify-center bg-accent-red font-ui text-[10px] font-bold text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
