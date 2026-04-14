import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export function BentoGrid({ products }: { products: Product[] }) {
  return (
    <section className="bg-white py-4 px-4">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="aspect-[4/5] md:aspect-square bg-off-white relative flex items-center justify-center p-12 overflow-hidden"
            >
              {product.featuredImage?.url && (
                <Image
                  src={product.featuredImage.url}
                  alt={product.title}
                  fill
                  className="object-contain p-20"
                />
              )}
              <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/90 backdrop-blur-md p-6 border border-white/50 flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="font-logo text-lg uppercase text-primary leading-none mb-1">
                    {idx === 0 ? "Built Different" : "Find your match"}
                  </p>
                  <p className="font-body text-[9px] text-muted uppercase tracking-tight">
                    {product.title}
                  </p>
                </div>
                <Link href={`/product/${product.handle}`} className="h-12 w-32">
                  <button className="btn-nothing-primary text-[10px] h-full">
                    Discover
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
