import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "../../../components/layout/breadcrumbs";
import { Gallery } from "../../../components/product/gallery";
import { ProductCard } from "../../../components/product/product-card";
import { ProductDescription } from "../../../components/product/product-description";
import ToastDemo from "../../../components/toast-demo";
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
    <div className="mx-auto max-w-screen-2xl px-4 relative">
      <ToastDemo />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col rounded-lg border border-border-l bg-off-white p-8 md:p-12 lg:flex-row lg:gap-8">
        <div className="h-full w-full basis-full lg:basis-4/6">
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
        <div className="basis-full lg:basis-2/6">
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
    <div className="py-24 lg:py-32">
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
