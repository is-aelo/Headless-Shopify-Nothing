import StatusDot from "components/status-dot";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export function Hero({ product }: { product: Product }) {
  if (!product) return null;

  const heroImage = product.images?.[1] || product.featuredImage;
  const gridImages = product.images?.slice(2, 6) || [];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FBFBFB] py-10 md:py-0">
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
      <div className="relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden bg-white border border-black/5 z-0 md:absolute md:inset-0 md:max-w-none md:rounded-none md:bg-transparent md:border-none md:aspect-auto">
        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.altText || product.title}
            fill
            className="object-cover md:object-cover object-center transition-transform duration-1000 ease-in-out"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* 3. Editorial Elements Layer */}
      <div className="relative z-20 flex flex-col items-center px-4 md:absolute md:inset-0 md:block md:px-0 md:pointer-events-none">
        {/* Floating Image Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[400px] mt-6 md:mt-0 md:absolute md:inset-0 md:block md:max-w-none md:gap-0">
          {/* Square 1 */}
          <div className="group relative aspect-square overflow-hidden bg-white border border-black/5 md:absolute md:left-[10%] md:top-[12%] md:h-64 md:w-64 md:pointer-events-auto transition-all duration-500 hover:border-black/20">
            {gridImages[0] && (
              <Image
                src={gridImages[0].url}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          {/* Square 2 */}
          <div className="group relative aspect-square overflow-hidden bg-white border border-black/5 md:absolute md:left-[15%] md:bottom-[15%] md:h-40 md:w-40 md:pointer-events-auto transition-all duration-500 hover:border-black/20">
            {gridImages[1] && (
              <Image
                src={gridImages[1].url}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          {/* Square 3 */}
          <div className="group relative aspect-square overflow-hidden bg-white border border-black/5 md:absolute md:right-[15%] md:top-[8%] md:h-52 md:w-52 md:pointer-events-auto transition-all duration-500 hover:border-black/20">
            {gridImages[2] && (
              <Image
                src={gridImages[2].url}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>

          {/* Square 4 */}
          <div className="group relative aspect-square overflow-hidden bg-white border border-black/5 md:absolute md:right-[8%] md:bottom-[20%] md:h-80 md:w-80 md:pointer-events-auto transition-all duration-500 hover:border-black/20">
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
        <div className="relative mt-6 mb-10 w-full max-w-[400px] md:absolute md:bottom-16 md:left-1/2 md:z-40 md:max-w-[480px] md:-translate-x-1/2 md:mt-0 md:mb-0 md:pointer-events-auto">
          <div className="rounded-sm bg-white/70 p-6 md:p-10 backdrop-blur-2xl border border-white/40">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <StatusDot className="scale-90 md:scale-110" />
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-black/40">
                    Latest Edition
                  </span>
                </div>

                <h2 className="font-logo text-3xl md:text-5xl uppercase tracking-tighter text-black leading-[0.85]">
                  {product.title}
                </h2>
              </div>

              <div className="flex flex-col w-full">
                <Link
                  href={`/product/${product.handle}`}
                  className="btn-nothing-primary flex items-center justify-center h-[56px] md:h-[52px] w-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97]"
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
