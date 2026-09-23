import StatusDot from "components/status-dot";
import { getImageObjectFit } from "lib/image-fit";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

function extractIntro(description?: string) {
  if (!description) return "";
  const cleanText = description
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleanText.slice(0, 140);
}

export function Hero({ product }: { product: Product }) {
  if (!product) return null;

  const image = product.featuredImage || product.images?.[0];
  const fit = getImageObjectFit(image?.width, image?.height, 4 / 5);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-off-white">
      {/* Signature dot grid, kept subtle */}
      <div className="bg-nothing-grid pointer-events-none absolute inset-0 z-0 opacity-[0.05]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 sm:px-8 lg:px-12">
        <div className="grid flex-1 grid-cols-1 items-center gap-12 py-24 md:py-28 lg:grid-cols-12 lg:gap-20">
          {/* Statement */}
          <div className="lg:col-span-6 lg:pr-12">
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <StatusDot />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                Newest Release
              </span>
            </div>

            <h1 className="font-logo text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.88] tracking-tighter text-primary">
              {product.title}
            </h1>

            <p className="mt-6 max-w-md font-mono text-[11px] sm:text-xs uppercase leading-relaxed tracking-wide text-muted md:mt-8">
              {extractIntro(product.description)}
            </p>

            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center md:mt-12">
              <Link
                href={`/product/${product.handle}`}
                className="btn-nothing-primary flex h-14 w-full items-center justify-center text-[11px] font-bold uppercase tracking-[0.25em] sm:w-auto sm:px-12"
              >
                Discover
              </Link>
              <Link
                href="/search"
                className="btn-nothing-outline flex h-14 w-full items-center justify-center font-mono text-[11px] font-bold uppercase tracking-[0.25em] sm:w-auto sm:px-12"
              >
                Shop All Products
              </Link>
            </div>
          </div>

          {/* Hero object — single product image, monochrome */}
          <div className="lg:col-span-6">
            <figure className="relative ml-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden border border-black/[0.06] bg-white">
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={fit === "cover" ? "object-cover" : "object-contain"}
                />
              )}
              <figcaption className="absolute bottom-0 left-0 flex h-9 items-center bg-black px-4">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white">
                  01
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Bottom hairline strip */}
        <div className="pb-6">
          <div className="flex items-center justify-between border-t border-black/10 pt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/30">
              Nothing — PH
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/30">
              01 / 03 — Collections
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
