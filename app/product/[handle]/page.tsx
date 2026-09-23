import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "../../../components/layout/breadcrumbs";
import { Gallery } from "../../../components/product/gallery";
import { ProductCard } from "../../../components/product/product-card";
import { ProductDescription } from "../../../components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "../../../lib/constants";
import { getProduct, getProductRecommendations } from "../../../lib/shopify";
import { Image, ProductVariant } from "../../../lib/shopify/types";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();
  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: { index: indexable, follow: indexable },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const variant = product.variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams[option.name.toLowerCase()],
    ),
  );

  const breadcrumbItems = [
    {
      label: (product as any).collections?.[0]?.title || "Products",
      url: `/search/${(product as any).collections?.[0]?.handle || ""}`,
    },
    { label: product.title, url: `/product/${product.handle}` },
  ];

  return (
    <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-12 lg:gap-16 lg:py-14">
        <div className="lg:col-span-7">
          <Suspense
            fallback={
              <div className="relative aspect-square h-full w-full overflow-hidden bg-white animate-pulse" />
            }
          >
            <Gallery
              images={product.images.map((img: Image) => ({
                src: img.url,
                altText: img.altText,
              }))}
              selectedVariantImage={variant?.image?.url}
              isSoldOut={!variant?.availableForSale}
            />
          </Suspense>
        </div>
        <div className="lg:col-span-5 lg:border-l lg:border-black/[0.06] lg:pl-14">
          <ProductDescription product={product} />
        </div>
      </div>

      <Suspense>
        <RelatedProducts id={product.id} />
      </Suspense>
    </div>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);
  if (!relatedProducts.length) return null;

  return (
    <div className="border-t border-black/[0.06] py-16 lg:py-24">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-logo text-[24px] lg:text-[32px] uppercase tracking-tighter text-primary">
          Related Products
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-border-l">
        {relatedProducts.slice(0, 4).map((p, i) => (
          <ProductCard key={p.handle} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
