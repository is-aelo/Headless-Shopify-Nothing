import { CartProvider } from "components/cart/cart-context";
import Footer from "components/layout/footer";
import { MainWrapper } from "components/layout/main-wrapper";
import { Navbar } from "components/layout/navbar";
import { GeistMono } from "geist/font/mono";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";
import { ndot57, ndot57Caps, nType82, shareTechMono, spaceMono } from "./fonts";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();

  return (
    <html lang="en" className={GeistMono.variable}>
      <body
        className={`
          ${ndot57.variable}
          ${ndot57Caps.variable}
          ${nType82.variable}
          ${shareTechMono.variable}
          ${spaceMono.variable}
          antialiased font-body
        `}
      >
        <CartProvider cartPromise={cart}>
          <Navbar />
          <MainWrapper>
            {children}
            <Suspense fallback={<div className="h-40 w-full" />}>
              <Footer />
            </Suspense>
            <Toaster closeButton />
          </MainWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
