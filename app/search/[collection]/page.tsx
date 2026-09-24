import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "components/layout/page-header";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const collection = await getCollection(params.collection);
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });

  if (!collection) return notFound();

  return (
    <section>
      <PageHeader
        kicker="Collection"
        title={collection.title}
        description={collection.description}
        count={products.length}
      />

      {products.length === 0 ? (
        <div className="border-t border-black/[0.06] pb-16 pt-14 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-surface/50">
            Nothing found yet
          </p>
          <a
            href="/search"
            className="mt-6 inline-block border border-black/15 px-10 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-surface transition-colors hover:bg-surface hover:text-white"
          >
            Browse all products
          </a>
        </div>
      ) : (
        <ProductGridItems products={products} />
      )}
    </section>
  );
}
