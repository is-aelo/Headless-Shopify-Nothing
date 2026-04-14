import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export function CategoryPhones({ products }: { products: Product[] }) {
  const mainPhone = products[0];

  // Helper to find metafield values dynamically
  const getSpec = (key: string) => {
    return mainPhone?.metafields?.find((m) => m.key === key)?.value || "TBA";
  };

  if (!mainPhone) return null;

  return (
    <section className="bg-black py-20 px-6 border-b border-white/10">
      <div className="mx-auto max-w-[1440px]">
        <span className="font-logo text-white text-5xl uppercase block mb-12">
          Phones
        </span>

        <div className="bg-[#0d0d0d] rounded-sm p-12 relative overflow-hidden bg-nothing-grid border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[2px] w-8 bg-accent-red" />
                <span className="font-body text-[10px] text-accent-red uppercase tracking-[0.2em]">
                  {getSpec("status") || "New Flagship"}
                </span>
              </div>

              <h3 className="font-logo text-6xl text-white uppercase mb-8 leading-none whitespace-pre-line">
                {mainPhone.title.replace("Phone", "Phone\n")}
              </h3>

              {/* Technical Spec Grid - Fully Dynamic */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-12 border-t border-b border-white/10 py-8">
                <div>
                  <p className="font-body text-[9px] text-muted uppercase mb-1">
                    Display
                  </p>
                  <p className="font-logo text-sm text-white uppercase">
                    {getSpec("display")}
                  </p>
                </div>
                <div>
                  <p className="font-body text-[9px] text-muted uppercase mb-1">
                    Chip
                  </p>
                  <p className="font-logo text-sm text-white uppercase">
                    {getSpec("chip")}
                  </p>
                </div>
                <div>
                  <p className="font-body text-[9px] text-muted uppercase mb-1">
                    Camera
                  </p>
                  <p className="font-logo text-sm text-white uppercase">
                    {getSpec("camera")}
                  </p>
                </div>
                <div>
                  <p className="font-body text-[9px] text-muted uppercase mb-1">
                    Glyph
                  </p>
                  <p className="font-logo text-sm text-white uppercase">
                    {getSpec("glyph")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/product/${mainPhone.handle}`}
                  className="bg-white text-black font-logo px-8 py-4 uppercase text-xs hover:bg-off-white transition-colors"
                >
                  Shop {mainPhone.title}
                </Link>
                <button className="border border-white/20 text-white font-logo px-8 py-4 uppercase text-xs hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative h-[600px] flex justify-center">
              {mainPhone.featuredImage?.url && (
                <Image
                  src={mainPhone.featuredImage.url}
                  alt={mainPhone.title}
                  fill
                  className="object-contain drop-shadow-[0_0_50px_rgba(255,0,0,0.1)]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
