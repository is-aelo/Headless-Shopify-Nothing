import StatusDot from "components/status-dot";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export function Hero({ product }: { product: Product }) {
  if (!product) return null;

  const heroImage = product.images?.[1] || product.featuredImage;
  const gridImages = product.images?.slice(2, 6) || [];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FBFBFB] py-10 lg:py-0">
      {/* 1. Signature Grid Background */}
      <div
        className="absolute inset-0 z-10 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 0.8px, transparent 0.8px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* 2. Main Background Image */}
      <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-2xl bg-white border border-black/5 z-0 lg:absolute lg:inset-0 lg:max-w-none lg:rounded-none lg:bg-transparent lg:border-none lg:aspect-auto">
        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.altText || product.title}
            fill
            className="object-cover lg:object-cover object-center transition-transform duration-1000 ease-in-out"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* 3. Editorial Elements Layer */}
      <div className="relative z-20 flex flex-col items-center gap-6 px-4 lg:absolute lg:inset-0 lg:block lg:px-0 lg:gap-0 lg:pointer-events-none">
        {/* SCATTERED GRID - Full Color Editorial */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[400px] lg:absolute lg:inset-0 lg:block lg:max-w-none lg:gap-0">
          {/* Top Left */}
          <div className="group relative aspect-square overflow-hidden rounded-2xl bg-white border border-black/5 lg:absolute lg:left-[10%] lg:top-[12%] lg:h-64 lg:w-64 lg:pointer-events-auto transition-all duration-500 hover:border-black/20">
            {gridImages[0] && (
              <Image
                src={gridImages[0].url}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          {/* Bottom Left */}
          <div className="group relative aspect-square overflow-hidden rounded-2xl bg-white border border-black/5 lg:absolute lg:left-[15%] lg:bottom-[15%] lg:h-40 lg:w-40 lg:pointer-events-auto transition-all duration-500 hover:border-black/20">
            {gridImages[1] && (
              <Image
                src={gridImages[1].url}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          {/* Top Right */}
          <div className="group relative aspect-square overflow-hidden rounded-2xl bg-white border border-black/5 lg:absolute lg:right-[15%] lg:top-[8%] lg:h-52 lg:w-52 lg:pointer-events-auto transition-all duration-500 hover:border-black/20">
            {gridImages[2] && (
              <Image
                src={gridImages[2].url}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          {/* Bottom Right */}
          <div className="group relative aspect-square overflow-hidden rounded-2xl bg-white border border-black/5 lg:absolute lg:right-[8%] lg:bottom-[20%] lg:h-80 lg:w-80 lg:pointer-events-auto transition-all duration-500 hover:border-black/20">
            {gridImages[3] && (
              <Image
                src={gridImages[3].url}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>
        </div>

        {/* 4. UI Card */}
        <div className="relative mt-4 mb-10 w-full max-w-[400px] lg:absolute lg:bottom-16 lg:left-1/2 lg:z-40 lg:max-w-[480px] lg:-translate-x-1/2 lg:mt-0 lg:mb-0 lg:pointer-events-auto">
          <div className="rounded-[24px] lg:rounded-[12px] bg-white/70 p-6 lg:p-10 backdrop-blur-2xl border border-white/40">
            <div className="flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-3 mb-2 lg:mb-4">
                  <StatusDot className="scale-90 lg:scale-110" />
                  <span className="font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.3em] text-black/40">
                    Latest Edition
                  </span>
                </div>

                <h2 className="font-logo text-3xl lg:text-5xl uppercase tracking-tighter text-black leading-[0.85]">
                  {product.title}
                </h2>
              </div>

              <div className="flex flex-col w-full">
                <Link
                  href={`/product/${product.handle}`}
                  className="flex items-center justify-center bg-black text-white px-12 text-[12px] font-bold uppercase tracking-[0.2em] h-[56px] lg:h-[52px] w-full rounded-2xl lg:rounded-[8px] transition-all hover:bg-neutral-800 active:scale-[0.97]"
                >
                  Explore Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
