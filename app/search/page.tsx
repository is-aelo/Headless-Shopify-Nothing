import { PageHeader } from "components/layout/page-header";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      <PageHeader
        kicker="Search"
        title={searchValue ? `“${searchValue}”` : "All Products"}
        count={products.length}
      />

      {searchValue ? (
        <p className="mb-8 font-mono text-[12px] uppercase tracking-[0.2em] text-surface/50">
          {products.length === 0
            ? `No products match “${searchValue}”`
            : `${products.length} ${resultsText} for “${searchValue}”`}
        </p>
      ) : null}

      {products.length > 0 ? (
        <ProductGridItems products={products} />
      ) : (
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
      )}
    </>
  );
}
