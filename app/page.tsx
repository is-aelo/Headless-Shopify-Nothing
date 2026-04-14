import FeaturedCollections from "components/sections/featured-collections";
import { Hero } from "components/sections/hero";
import { getCollectionProducts } from "lib/shopify";

export default async function HomePage() {
  // Use the hyphenated handle 'newest-release'
  const products = await getCollectionProducts({
    collection: "newest-release",
    sortKey: "CREATED_AT",
    reverse: true,
  });

  if (!products || products.length === 0) {
    return (
      <main className="flex h-screen items-center justify-center bg-black">
        <p className="font-logo text-xs uppercase tracking-widest text-white">
          Collection "newest-release" not found or empty.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* 1. Hero Section: Displays the single newest flagship item */}
      <Hero product={products[0]} />

      {/* 2. Featured Sections: Displays categorized collections with technical specs */}
      <FeaturedCollections />

      {/* 3. Future Sections (Newsletter, Footer, etc.) can go here */}
    </main>
  );
}
