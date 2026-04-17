import FeaturedCollections from "components/sections/featured-collections";
import { Hero } from "components/sections/hero";
import { InfoBlock } from "components/sections/info-block";
import { getCollectionProducts } from "lib/shopify";

export default async function HomePage() {
  const products = await getCollectionProducts({
    collection: "newest-release",
    sortKey: "CREATED_AT",
    reverse: true,
  });

  if (!products || products.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center font-mono text-xs uppercase tracking-widest text-black">
        No products found in "newest-release" collection.
      </div>
    );
  }

  return (
    /* Adjusted gap: Mas compact na 48px sa mobile, 80px sa desktop */
    <div className="flex flex-col gap-12 md:gap-20 pb-20">
      {/* 1. Hero */}
      <Hero product={products[0]!} />

      {/* 2. Nothing OS */}
      <InfoBlock
        variant="os"
        title="Nothing OS. Pure Instinct."
        description="Fast, smooth, and distraction-free. By stripping away bloatware and focusing on intentional UI, Nothing OS provides a technical yet human experience that keeps you in the moment."
      />

      {/* 3. Products */}
      <FeaturedCollections />

      {/* 4. Glyph Matrix */}
      <InfoBlock
        variant="glyph"
        title="The Glyph Matrix. New Light."
        description="Redefining how you interact with your device. 900+ individually addressable LED dots form a circular matrix that communicates notifications and status without needing the screen."
      />
    </div>
  );
}
