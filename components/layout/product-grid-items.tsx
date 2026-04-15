import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { COLOR_MAP } from "lib/constants";
import { Product } from "lib/shopify/types";
import Link from "next/link";

/**
 * Enhanced hex mapper.
 * Scans the string for any known color keywords from our COLOR_MAP.
 */
const getHexColor = (colorName: string): string => {
  const normalizedName = colorName.toLowerCase().trim();

  // 1. Check for exact match
  if (normalizedName in COLOR_MAP) {
    return COLOR_MAP[normalizedName as keyof typeof COLOR_MAP] as string;
  }

  // 2. Check if the string contains any of our known keys
  const keyMatch = Object.keys(COLOR_MAP).find((key) =>
    normalizedName.includes(key),
  );

  // Use a fallback and ensure return type is string
  if (keyMatch) {
    return COLOR_MAP[keyMatch as keyof typeof COLOR_MAP] as string;
  }

  return "#FFFFFF";
};

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => {
        // 1. Collect all possible values from all options (Color, Style, Material, etc.)
        const allOptionValues = product.options.flatMap((opt) => opt.values);

        // 2. Filter these values based on whether we actually have a hex code for them
        const colorValues = allOptionValues.filter((val) => {
          const normalized = val.toLowerCase().trim();
          return Object.keys(COLOR_MAP).some((key) => normalized.includes(key));
        });

        // 3. Fallback: If options are weirdly nested, grab from variants
        if (colorValues.length === 0) {
          const variantValues = product.variants.flatMap((v) =>
            v.selectedOptions.map((o) => o.value),
          );
          const matchedVariants = variantValues.filter((val) => {
            const normalized = val.toLowerCase().trim();
            return Object.keys(COLOR_MAP).some((key) =>
              normalized.includes(key),
            );
          });
          colorValues.push(...matchedVariants);
        }

        // Deduplicate and map
        const uniqueColors = Array.from(new Set(colorValues));
        const colorOptions = uniqueColors.map((val) => getHexColor(val));

        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <Link
              className="relative inline-block h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.minVariantPrice.amount,
                  currencyCode: product.priceRange.minVariantPrice.currencyCode,
                  compareAtPrice:
                    product.compareAtPriceRange?.minVariantPrice.amount,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                colorOptions={colorOptions}
              />
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}
