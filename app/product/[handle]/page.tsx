import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import ToastDemo from "components/toast-demo";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
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

  const variant = product.variants.find((variant) =>
    variant.selectedOptions.every((option) => {
      const optionName = option.name.toLowerCase();
      const paramValue =
        searchParams[optionName] || searchParams[optionName.replace(/ /g, "+")];

      if (!paramValue) return false;

      const currentParam = Array.isArray(paramValue)
        ? paramValue[0]
        : paramValue;

      // Fixed: Added check to ensure currentParam exists before running string methods
      return (
        currentParam &&
        decodeURIComponent(currentParam.toLowerCase().replace(/\+/g, " ")) ===
          option.value.toLowerCase()
      );
    }),
  );

  const selectedVariantImage = variant?.image?.url ?? null;
  const isVariantSoldOut = variant ? !variant.availableForSale : false;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url || "",
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col p-8 md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-[55%]">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden bg-surface" />
              }
            >
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
                selectedVariantImage={selectedVariantImage}
                isSoldOut={isVariantSoldOut}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-[45%]">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
            <div className="mt-8">
              <ToastDemo />
            </div>
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
      <Footer />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-8 font-logo text-2xl uppercase tracking-widest text-off-white border-l border-border-l pl-4">
        Related Products
      </h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1 scrollbar-hide">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 border border-white/5 hover:border-white/20 transition-colors"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
