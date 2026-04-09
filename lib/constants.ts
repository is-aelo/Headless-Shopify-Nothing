export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Trending",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Latest arrivals",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  },
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-01/graphql.json";

/**
 * Nothing & CMF Official Color Palette
 * Includes regional spelling variations (Grey vs Gray)
 */
export const COLOR_MAP: Record<string, string> = {
  // Nothing Flagship Colors
  white: "#FFFFFF",
  black: "#000000",
  milk: "#F2F2F2",
  blue: "#4966AE",
  yellow: "#FFEF00",
  pink: "#FFADAD",

  // CMF by Nothing Colors
  orange: "#FF5C00",
  "light green": "#A2DDCA",

  // Grey Variations (Covers Ash, Dark, Light, Metallic)
  "light grey": "#E5E5E5",
  "light gray": "#E5E5E5",
  "dark grey": "#202020",
  "dark gray": "#202020",
  "ash grey": "#6E6E6E",
  "ash gray": "#6E6E6E",
  "metallic grey": "#919191",
  "metallic gray": "#919191",
  silver: "#E5E5E5",

  // Misc
  mint: "#AAF0D1",
};

/**
 * Returns a hex code for a given color name from Shopify.
 * Defaults to the name itself if it's already a hex, or white if not found.
 */
export function getHexColor(colorName: string): string {
  if (!colorName) return "#FFFFFF";

  const normalized = colorName.toLowerCase().trim();

  // If the map has the color, return it.
  // Otherwise, if it starts with #, it's already a hex.
  // Else, return white as a safe fallback.
  return (
    COLOR_MAP[normalized] ||
    (normalized.startsWith("#") ? normalized : "#FFFFFF")
  );
}
