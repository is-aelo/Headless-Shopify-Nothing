import { ArrowRightIcon } from "@heroicons/react/24/outline";
import StatusDot from "components/status-dot";
import { getImageObjectFit } from "lib/image-fit";
import { getCollectionProducts } from "lib/shopify";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

function formatDescription(description?: string) {
  if (!description) return "";

  const cleanText = description.replace(/<[^>]*>/g, "").trim();
  const sentences = cleanText.split(/(?<=[.!?])\s+/);

  return sentences.slice(0, 2).join(" ");
}

function formatPrice(amount: number) {
  return amount.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

async function CollectionSection({
  title,
  handle,
  index,
  usedIds,
}: {
  title: string;
  handle: string;
  index: number;
  usedIds: Set<string>;
}) {
  const allProducts = await getCollectionProducts({ collection: handle });
  const products = allProducts.filter((p) => !usedIds.has(p.id));

  if (!products || products.length === 0) return null;

  const product = products[0] as Product;
  usedIds.add(product.id);

  const amount = parseFloat(product.priceRange.minVariantPrice.amount);

  const imageUrl = product.featuredImage?.url
    ? `${product.featuredImage.url}${product.featuredImage.url.includes("?") ? "&" : "?"}width=1200`
    : "";

  const fit = getImageObjectFit(
    product.featuredImage?.width,
    product.featuredImage?.height,
    1,
  );

  const reversed = index % 2 === 1;

  return (
    <article className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
        <Link
          href={`/search/${handle}`}
          className="group relative block aspect-square w-full overflow-hidden border border-black/[0.06] bg-white"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={
                fit === "cover"
                  ? "object-cover transition-colors duration-700"
                  : "object-contain transition-colors duration-700"
              }
            />
          )}
          <span className="absolute left-0 top-0 flex h-8 items-center bg-black px-3">
            <span className="font-mono text-[9px] tracking-[0.3em] text-white">
              0{index + 1}
            </span>
          </span>
        </Link>
      </div>

      <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : "lg:pl-8"}`}>
        <div className="mb-5 flex items-center gap-3">
          <StatusDot />
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-muted">
            Collection 0{index + 1}
          </span>
        </div>

        <h2 className="font-logo text-[clamp(1.75rem,4vw,3.5rem)] uppercase leading-[0.9] tracking-tighter text-primary">
          {title}
        </h2>

        <p className="mt-5 max-w-md font-mono text-[11px] sm:text-xs uppercase leading-relaxed tracking-wide text-muted">
          {formatDescription(product.description)}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <span className="font-mono text-lg tracking-tight text-primary">
            PHP {formatPrice(amount)}
          </span>
          <Link
            href={`/product/${product.handle}`}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
          >
            Learn More
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10">
          <Link
            href={`/search/${handle}`}
            className="btn-nothing-primary flex h-14 w-full max-w-[280px] items-center justify-center text-[11px] font-bold uppercase tracking-[0.25em] sm:w-auto sm:px-14"
          >
            View {title}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function FeaturedCollections() {
  const categories = [
    { title: "Phones", handle: "phones" },
    { title: "CMF", handle: "cmf" },
    { title: "Audio", handle: "audio" },
  ];

  const usedIds = new Set<string>();

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-20 py-16 md:py-24 lg:gap-32 lg:py-32 px-5 sm:px-8 lg:px-12">
        {categories.map((cat, index) => (
          <CollectionSection
            key={cat.handle}
            title={cat.title}
            handle={cat.handle}
            index={index}
            usedIds={usedIds}
          />
        ))}
      </div>
    </section>
  );
}
