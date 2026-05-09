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
            className="object-cover object-center transition-transform duration-1000 ease-in-out"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* 3. Editorial Elements Layer */}
      <div className="relative z-20 flex flex-col items-center px-4 md:absolute md:inset-0 md:block md:px-0 md:pointer-events-none">
        {/* MOBILE CAROUSEL */}
        <div className="flex w-full snap-x snap-mandatory overflow-x-auto no-scrollbar gap-2 mt-6 pb-4 md:hidden">
          {gridImages.map((image, index) => (
            <div
              key={image.url}
              className="relative aspect-square h-[320px] w-[85%] shrink-0 snap-center overflow-hidden bg-white border border-black/10 transition-all duration-500"
            >
              <div className="absolute left-3 top-3 z-10 flex h-6 items-center bg-black px-2">
                <span className="font-mono text-[9px] tracking-widest text-white">
                  0{index + 1}
                </span>
              </div>
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover grayscale-[0.2]"
              />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-black/20" />
            </div>
          ))}
        </div>

        {/* DESKTOP ORIGINAL GRID */}
        <div className="hidden md:block md:absolute md:inset-0 md:max-w-none md:gap-0">
          {/* Square 1 */}
          <div className="group absolute left-[10%] top-[12%] h-64 w-64 overflow-hidden bg-white border border-black/5 pointer-events-auto transition-all duration-500 hover:border-black/20">
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
          <div className="group absolute left-[15%] bottom-[15%] h-40 w-40 overflow-hidden bg-white border border-black/5 pointer-events-auto transition-all duration-500 hover:border-black/20">
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
          <div className="group absolute right-[15%] top-[8%] h-52 w-52 overflow-hidden bg-white border border-black/5 pointer-events-auto transition-all duration-500 hover:border-black/20">
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
          <div className="group absolute right-[8%] bottom-[20%] h-80 w-80 overflow-hidden bg-white border border-black/5 pointer-events-auto transition-all duration-500 hover:border-black/20">
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

        {/* 4. UI Card - Same design for both */}
        <div className="relative mt-4 mb-10 w-full max-w-[400px] md:absolute md:bottom-16 md:left-1/2 md:z-40 md:max-w-[480px] md:-translate-x-1/2 md:mt-0 md:mb-0 md:pointer-events-auto">
          <div className="rounded-sm bg-white/70 p-8 md:p-10 backdrop-blur-2xl border border-white/40 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <StatusDot className="scale-100 md:scale-110" />
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
                  className="btn-nothing-primary flex items-center justify-center h-[52px] w-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.97]"
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
