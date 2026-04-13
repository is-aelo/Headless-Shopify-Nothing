import Footer from "components/layout/footer";
import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: "featured" });

  if (!products?.length) return null;

  const heroProduct = products[0];

  return (
    <>
      <div className="flex flex-col bg-white">
        {/* --- FULL WIDTH AUTHENTIC HERO --- */}
        <section className="relative h-screen w-full overflow-hidden bg-primary">
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 z-10 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />

          <div className="absolute inset-0 z-0">
            {heroProduct?.featuredImage?.url && (
              <Image
                src={heroProduct.featuredImage.url}
                alt={heroProduct.title || "Product Image"}
                fill
                className="object-cover object-center"
                priority
              />
            )}
          </div>

          {/* Floating Product Card - Positioned Higher */}
          <div className="absolute bottom-32 left-1/2 z-30 w-full max-w-[450px] -translate-x-1/2 px-6">
            <div className="rounded-2xl bg-white/80 p-8 shadow-sm backdrop-blur-xl border border-white/50">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <span className="font-body text-[10px] uppercase tracking-widest text-muted mb-2">
                    It&apos;s metal now
                  </span>
                  <h2 className="font-logo text-2xl uppercase tracking-tighter text-primary leading-none">
                    {heroProduct.title}
                  </h2>
                </div>

                <Link
                  href={`/product/${heroProduct.handle}`}
                  className="btn-nothing-primary text-xs"
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- BENTO GRID SECTIONS --- */}
        <section className="bg-white py-4 px-4">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product 02 */}
              <div className="aspect-[4/5] md:aspect-square bg-off-white relative flex items-center justify-center p-12 overflow-hidden">
                {products[1]?.featuredImage?.url && (
                  <Image
                    src={products[1].featuredImage.url}
                    alt={products[1].title || "Product"}
                    fill
                    className="object-contain p-20"
                  />
                )}
                <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/90 backdrop-blur-md p-6 border border-white/50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-logo text-lg uppercase text-primary leading-none mb-1">
                      Built Different
                    </p>
                    <p className="font-body text-[9px] text-muted uppercase tracking-tight">
                      {products[1]?.title}
                    </p>
                  </div>
                  <Link
                    href={`/product/${products[1]?.handle}`}
                    className="h-12 w-32"
                  >
                    <button className="btn-nothing-primary text-[10px] h-full">
                      Discover
                    </button>
                  </Link>
                </div>
              </div>

              {/* Product 03 */}
              <div className="aspect-[4/5] md:aspect-square bg-off-white relative flex items-center justify-center p-12 overflow-hidden">
                {products[2]?.featuredImage?.url && (
                  <Image
                    src={products[2].featuredImage.url}
                    alt={products[2].title || "Product"}
                    fill
                    className="object-contain p-20"
                  />
                )}
                <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/90 backdrop-blur-md p-6 border border-white/50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-logo text-lg uppercase text-primary leading-none mb-1">
                      Find your match
                    </p>
                    <p className="font-body text-[9px] text-muted uppercase tracking-tight">
                      {products[2]?.title}
                    </p>
                  </div>
                  <Link
                    href={`/product/${products[2]?.handle}`}
                    className="h-12 w-32"
                  >
                    <button className="btn-nothing-primary text-[10px] h-full">
                      Discover
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
