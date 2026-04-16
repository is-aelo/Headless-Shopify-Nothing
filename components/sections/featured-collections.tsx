import { addItem } from "components/cart/actions";
import { ProductCard } from "components/product/product-card";
import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

function parseProductData(htmlDescription: string | undefined) {
  if (!htmlDescription) {
    return { intro: "", specs: [] };
  }

  const cleanText = htmlDescription
    .replace(/<\/p>|<\/li>|<div>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const introLines: string[] = [];
  const specs: { label: string; value: string }[] = [];

  for (const line of cleanText) {
    if (line.includes(":")) {
      const parts = line.split(":");
      const label = parts[0]?.replace(/[•*]/g, "").trim();
      const value = parts.slice(1).join(":").trim();
      if (label && value && specs.length < 4) {
        specs.push({ label: label.toUpperCase(), value });
      }
    } else if (
      specs.length === 0 &&
      !line.toUpperCase().includes("SPECIFICATIONS")
    ) {
      introLines.push(line);
    }
  }

  return { intro: introLines.slice(0, 1).join(" "), specs };
}

type LayoutVariant = "standard" | "reversed";

async function addItemAction(formData: FormData) {
  "use server";
  const variantId = formData.get("variantId") as string;
  await addItem(null, variantId);
}

async function CollectionSection({
  title,
  handle,
  variant = "standard",
  accentColor = "#ff0000",
}: {
  title: string;
  handle: string;
  variant?: LayoutVariant;
  accentColor?: string;
}) {
  const products = await getCollectionProducts({ collection: handle });

  if (!products || products.length === 0) return null;

  const product = products[0];
  if (!product) return null;

  const variantId = product.variants?.[0]?.id;
  const { intro, specs } = parseProductData(
    product.descriptionHtml || product.description,
  );

  return (
    <section className="relative w-full bg-off-white overflow-hidden border-b border-border-l">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-6 lg:px-16 pt-12 lg:pt-16">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <span
                className="absolute w-3 h-3 rounded-full blur-[4px] opacity-40 animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              <span
                className="relative w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <span className="font-nav text-[10px] uppercase tracking-[0.4em] text-muted">
              {title}
            </span>
          </div>

          <Link
            href={`/search/${handle}`}
            className="font-nav text-[9px] uppercase tracking-[0.3em] text-muted hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            See All {title}
          </Link>
        </div>

        <div
          className={`flex flex-col ${variant === "reversed" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-24 px-6 lg:px-16 py-16 lg:py-32`}
        >
          <div className="w-full lg:w-1/2 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={product.featuredImage?.url || ""}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h3 className="font-logo text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-tighter uppercase mb-8 text-primary">
              {product.title}
            </h3>

            {intro && (
              <p className="font-body text-[11px] lg:text-[13px] uppercase tracking-tight text-muted mb-10 max-w-[420px] leading-relaxed">
                {intro}
              </p>
            )}

            <div className="grid grid-cols-2 gap-x-12 gap-y-10 mb-12 border-t border-border-l pt-10">
              {specs.map((spec, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <span className="font-logo text-[9px] uppercase tracking-[0.2em] text-muted">
                    {spec.label}
                  </span>
                  <span className="font-body text-xs lg:text-[13px] uppercase tracking-tight text-primary font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <form action={addItemAction} className="w-full sm:w-auto">
                <input type="hidden" name="variantId" value={variantId} />
                <button
                  type="submit"
                  className="btn-nothing-primary px-12 text-[11px] h-[48px] rounded-[8px]"
                >
                  Buy {product.title}
                </button>
              </form>

              <Link
                href={`/product/${product.handle}`}
                className="btn-nothing-outline px-12 text-[11px] h-[48px] w-full sm:w-auto rounded-[8px]"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>

        {products.length > 1 && (
          <div className="border-t border-border-l">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {products.slice(1, 5).map((p, index) => (
                <ProductCard key={p.handle} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

async function FeaturedCollections() {
  const categories = [
    {
      title: "Phones",
      handle: "phones",
      variant: "standard",
      accent: "#ff0000",
    },
    { title: "Audio", handle: "audio", variant: "reversed", accent: "#ff0000" },
    {
      title: "Wearables",
      handle: "watches",
      variant: "standard",
      accent: "#ff6b00",
    },
  ];

  return (
    <div className="w-full bg-off-white">
      {categories.map((cat) => (
        <CollectionSection
          key={cat.handle}
          title={cat.title}
          handle={cat.handle}
          variant={cat.variant as LayoutVariant}
          accentColor={cat.accent}
        />
      ))}
    </div>
  );
}

export default FeaturedCollections;
