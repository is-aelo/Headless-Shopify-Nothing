import StatusDot from "components/status-dot";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export function Hero({ product }: { product: Product }) {
  if (!product) return null;

  // Attempt to grab the second image from the gallery to avoid redundancy
  const heroImage = product.images?.[1] || product.featuredImage;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* 1. Background Grid */}
      <div className="absolute inset-0 z-10 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* 2. TRUE FULL SCREEN IMAGE */}
      <div className="absolute inset-0 z-0">
        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.altText || product.title}
            fill
            className="object-cover object-center transition-opacity duration-700"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* 3. Floating UI Card */}
      <div className="absolute bottom-10 lg:bottom-20 left-1/2 z-30 w-full max-w-[88%] lg:max-w-[450px] -translate-x-1/2 px-0">
        <div className="rounded-[8px] bg-white/80 p-5 lg:p-8 shadow-2xl backdrop-blur-xl border border-white/40">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-2 mb-2 lg:mb-3">
                <StatusDot className="scale-75 lg:scale-100" />
                <span className="font-body text-[9px] lg:text-[10px] uppercase tracking-[0.2em] text-surface">
                  Latest Release
                </span>
              </div>

              <h2 className="font-logo text-xl lg:text-3xl uppercase tracking-tighter text-black leading-tight">
                {product.title}
              </h2>
            </div>

            <div className="flex flex-col w-full">
              <Link
                href={`/product/${product.handle}`}
                className="btn-nothing-primary px-12 text-[11px] h-[48px] w-full sm:w-auto rounded-[8px]"
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
