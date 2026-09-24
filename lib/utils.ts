import { ReadonlyURLSearchParams } from "next/navigation";

import { ProductVariant } from "./shopify/types";

export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

/**
 * Validates that all required Shopify environment variables are present.
 * This prevents the app from crashing with cryptic errors during data fetching.
 */
export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    "SHOPIFY_STORE_DOMAIN",
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n",
      )}\n`,
    );
  }

  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (domain?.includes("[") || domain?.includes("]")) {
    throw new Error(
      "Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.",
    );
  }
};

/**
 * Helper to determine if a specific variant option is active based on the URL.
 */
export const isOptionActive = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string,
) => {
  return (
    searchParams.get(name.toLowerCase())?.toLowerCase() === value.toLowerCase()
  );
};

/** Search params in either client (URLSearchParams) or server (plain object) form. */
export type OptionSearchParams =
  | ReadonlyURLSearchParams
  | URLSearchParams
  | Record<string, string | string[] | undefined>;

const optionValue = (
  searchParams: OptionSearchParams,
  name: string,
): string | null => {
  const key = name.toLowerCase();
  if (searchParams instanceof URLSearchParams) {
    return searchParams.get(key);
  }
  const value = searchParams[key];
  return Array.isArray(value) ? null : (value ?? null);
};

/**
 * Finds the variant whose selected options match the chosen URL params.
 * Option names and values are compared case-insensitively.
 *
 * When `requireAll` is true, every option of the variant must be present in the
 * URL so an incomplete selection never resolves (used before adding to cart).
 * When false, options missing from the URL are ignored and the first matching
 * variant wins — this lets the gallery preview a variant image as soon as the
 * first option on a multi-option product is selected.
 */
export const findVariantByOptions = (
  variants: ProductVariant[],
  searchParams: OptionSearchParams,
  requireAll = false,
): ProductVariant | undefined =>
  variants.find((variant) =>
    variant.selectedOptions.every((option) => {
      const urlValue = optionValue(searchParams, option.name);
      if (urlValue === null) return !requireAll;
      return urlValue.toLowerCase() === option.value.toLowerCase();
    }),
  );
