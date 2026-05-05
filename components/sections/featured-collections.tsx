import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { addItem } from "components/cart/actions";
import { getCollectionProducts } from "lib/shopify";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

async function addItemAction(formData: FormData) {
  "use server";
  const variantId = formData.get("variantId") as string;
  await addItem(null, variantId);
}

function SecondaryProductCard({
  product,
}: {
  product: Product;
  accentColor: string;
}) {
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtAmount = parseFloat(
    product.variants[0]?.compareAtPrice?.amount || "0",
  );

  return (
    <div className="group flex flex-col sm:flex-row items-center gap-6 px-6 lg:px-10 py-10 border-r border-border-l last:border-r-0 hover:bg-white transition-colors duration-300">
      <Link
        href={`/product/${product.handle}`}
        className="relative w-[120px] h-[120px] shrink-0"
      >
        <Image
          src={product.featuredImage?.url || ""}
          alt={product.title}
          fill
          className="object-contain"
        />
      </Link>
      <div className="flex flex-col gap-2 min-w-0 flex-1 w-full text-center sm:text-left">
        <h4 className="font-logo text-[1.1rem] leading-[1.1] tracking-[-0.02em] uppercase text-primary">
          {product.title}
        </h4>
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
          <span className="font-body text-[10px] uppercase tracking-[0.04em] text-primary">
            PHP {amount.toFixed(0)}
          </span>
          {compareAtAmount > amount && (
            <span className="font-body text-[10px] uppercase tracking-[0.04em] text-muted line-through opacity-50">
              {compareAtAmount.toFixed(0)}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <form action={addItemAction}>
            <input
              type="hidden"
              name="variantId"
              value={product.variants?.[0]?.id}
            />
            <button
              type="submit"
              className="btn-nothing-primary px-6 text-[9px] h-[36px] rounded-[4px] tracking-[0.08em] uppercase"
            >
              Buy {product.title}
            </button>
          </form>
          <Link
            href={`/product/${product.handle}`}
            className="btn-nothing-outline px-6 text-[9px] h-[36px] rounded-[4px] tracking-[0.08em] uppercase"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

async function CollectionSection({ title, handle, accentColor, usedIds }: any) {
  const allProducts = await getCollectionProducts({ collection: handle });
  const products = allProducts.filter((p) => !usedIds.has(p.id));
  if (!products || products.length === 0) return null;

  const product = products[0] as Product;
  usedIds.add(product.id);
  const secondaryProducts = products.slice(1, 3);
  secondaryProducts.forEach((p) => usedIds.add(p.id));

  const variantId = product.variants?.[0]?.id;
  const amount = parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <div className="w-full relative">
      <div className="relative z-10">
        <section className="relative w-full h-[90vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={product.featuredImage?.url || ""}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0 opacity-[0.1] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(${accentColor} 1.5px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col h-full w-full">
            <div className="flex items-center justify-between px-6 lg:px-16 pt-10">
              <div className="flex items-center gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: accentColor }}
                />
                <span className="font-nav text-[10px] uppercase tracking-[0.5em] text-primary font-bold">
                  {title}
                </span>
              </div>
              <Link
                href={`/search/${handle}`}
                className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted hover:text-primary transition-colors bg-white/40 backdrop-blur-md px-5 py-2 rounded-full flex items-center gap-2"
              >
                All {title}
                <ArrowRightIcon className="h-3 w-3 stroke-[3]" />
              </Link>
            </div>

            <div className="mt-auto mb-16 flex justify-center w-full px-6">
              <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-black/5 max-w-[420px] w-full shadow-2xl text-center">
                <div className="flex flex-col gap-6">
                  <h3 className="font-logo text-3xl md:text-4xl uppercase tracking-tighter leading-none">
                    {product.title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <form action={addItemAction}>
                      <input type="hidden" name="variantId" value={variantId} />
                      <button
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-lg font-nav text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all active:scale-[0.98]"
                      >
                        Buy Now — PHP {amount.toFixed(0)}
                      </button>
                    </form>
                    <Link
                      href={`/product/${product.handle}`}
                      className="w-full border border-black/10 py-4 rounded-lg font-nav text-[10px] uppercase tracking-[0.2em] text-center hover:bg-black/5 transition-colors"
                    >
                      Discover
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {secondaryProducts.length > 0 && (
          <div className="w-full bg-white border-b border-border-l">
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
                {secondaryProducts.map((p) => (
                  <SecondaryProductCard
                    key={p.handle}
                    product={p}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-[120px] relative overflow-hidden bg-[#f7f7f7]">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.8]"
          style={{
            backgroundImage: `radial-gradient(#bbb 1.2px, transparent 0)`,
            backgroundSize: "32px 32px",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}

export default async function FeaturedCollections() {
  const categories = [
    { title: "Phones", handle: "phones", accent: "#FF0000" },
    { title: "CMF", handle: "cmf", accent: "#FF5C00" },
    { title: "Audio", handle: "audio", accent: "#FF0000" },
  ];
  const usedIds = new Set<string>();

  return (
    <div className="w-full bg-white">
      {categories.map((cat) => (
        <CollectionSection
          key={cat.handle}
          title={cat.title}
          handle={cat.handle}
          accentColor={cat.accent}
          usedIds={usedIds}
        />
      ))}
    </div>
  );
}
