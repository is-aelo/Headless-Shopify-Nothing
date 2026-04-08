import { getProducts } from "lib/shopify";

export const metadata = {
  title: "All Products | Nothing Concept",
  description:
    "Industrial-minimalist product catalog built with Next.js and Shopify.",
};

export default async function CustomFrontendPage() {
  const products = await getProducts({});

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-12">
      {/* Header Section */}
      <header className="mb-16 border-b border-border-l pb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="font-ui text-xs uppercase tracking-[0.2em] text-muted">
              Collection / Index
            </span>
            <h1 className="font-product mt-2 text-5xl uppercase tracking-tighter text-primary md:text-7xl">
              All Products
            </h1>
          </div>
          <p className="font-ui text-xs uppercase tracking-widest text-muted">
            Total Results: [{products.length.toString().padStart(2, "0")}]
          </p>
        </div>
      </header>

      {/* Product Grid - Using border-l for the "grid line" effect */}
      <div className="grid grid-cols-1 gap-px bg-border-l sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col bg-off-white p-8 text-primary"
          >
            <div className="mb-8 flex justify-between">
              <span className="font-ui text-[10px] uppercase tracking-widest text-muted">
                Spec_{product.handle.substring(0, 4)}
              </span>
              <span className="font-ui text-[10px] uppercase tracking-widest text-muted">
                00{products.indexOf(product) + 1}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center py-12">
              <h2 className="font-product text-3xl uppercase leading-none tracking-tighter transition-colors group-hover:text-muted">
                {product.title}
              </h2>
            </div>

            <div className="mt-8 flex items-end justify-between border-t border-border-l pt-6">
              <div className="flex flex-col">
                <span className="font-ui text-[10px] uppercase text-muted">
                  Price
                </span>
                <p className="font-ui text-sm font-bold">
                  {product.priceRange.maxVariantPrice.amount}{" "}
                  {product.priceRange.maxVariantPrice.currencyCode}
                </p>
              </div>
              <button className="font-nav border border-primary px-4 py-2 text-xs uppercase tracking-widest transition-all hover:bg-primary hover:text-white">
                Details +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-body text-accent-red uppercase tracking-widest">
            Critical Error: No Products Found in Registry
          </p>
        </div>
      )}

      {/* Technical Footer */}
      <footer className="mt-20 border-t border-border-l py-10">
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-muted">
          Terminal Status: Online // Shopify_Storefront_v2026.04
        </p>
      </footer>
    </div>
  );
}
