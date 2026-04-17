import { Share_Tech_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

/**
 * GEIST MONO (Body Font)
 * Loaded as a local font so we control the CSS variable injection.
 * The `geist` package's GeistMono object does NOT have a .variable property
 * compatible with Next.js className spreading — it must be handled separately.
 */
export const geistMono = localFont({
  src: [
    {
      path: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

/**
 * GOOGLE FONTS
 */
export const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

/**
 * SPACE GROTESK (Product/Heading Font)
 * Load the full weight range so headings render correctly at any weight.
 */
export const nType82 = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-ntype",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * LOCAL NOTHING BRAND FONTS
 */
export const ndot57Caps = localFont({
  src: [
    {
      path: "../public/fonts/Ndot57Caps-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ndot-caps",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

export const ndot57 = localFont({
  src: [
    {
      path: "../public/fonts/Ndot57-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ndot",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});
