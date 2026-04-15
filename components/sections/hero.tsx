import StatusDot from "components/status-dot";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export function Hero({ product }: { product: Product }) {
  if (!product) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* 1. Background Grid */}
      <div className="absolute inset-0 z-10 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* 2. TRUE FULL SCREEN IMAGE */}
      <div className="absolute inset-0 z-0">
        {product.featuredImage?.url && (
          <Image
            src={product.featuredImage.url}
            alt={product.title}
            fill
            className="object-cover object-center transition-opacity duration-700"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* 3. Floating UI Card - Compact Mobile Refinements */}
      <div className="absolute bottom-10 lg:bottom-20 left-1/2 z-30 w-full max-w-[88%] lg:max-w-[450px] -translate-x-1/2 px-0">
        <div className="rounded-sm bg-white/80 p-5 lg:p-8 shadow-2xl backdrop-blur-xl border border-white/40">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-2 mb-2 lg:mb-3">
                <StatusDot className="scale-75 lg:scale-100" />
                <span className="font-body text-[9px] lg:text-[10px] uppercase tracking-[0.2em] text-surface font-bold">
                  Latest Release
                </span>
              </div>

              <h2 className="font-product text-xl lg:text-3xl uppercase tracking-tighter text-black leading-tight">
                {product.title}
              </h2>
            </div>

            <div className="flex flex-col w-full">
              <Link
                href={`/product/${product.handle}`}
                className="bg-black text-white w-full py-3.5 lg:py-4 text-center font-logo text-[9px] lg:text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 active:scale-[0.98]"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
