import { GeistMono } from "geist/font/mono";
import { Share_Tech_Mono } from "next/font/google";
import localFont from "next/font/local";

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
 * GEIST MONO
 */
export const geistMono = GeistMono;

/**
 * LOCAL NOTHING BRAND FONTS
 * Path: Starting from app/fonts.ts, go up one level to root, then into public/fonts
 */
export const nType82 = localFont({
  src: "../public/fonts/NtTpe82-Headline.woff2",
  variable: "--font-ntype",
  display: "swap",
  weight: "700",
  style: "normal",
});

export const ndot57Caps = localFont({
  src: "../public/fonts/Ndot57Caps-Regular.woff2",
  variable: "--font-ndot-caps",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const ndot57 = localFont({
  src: "../public/fonts/Ndot57-Regular.woff2",
  variable: "--font-ndot",
  display: "swap",
  weight: "400",
  style: "normal",
});
