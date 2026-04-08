import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
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
    <html
      lang="en"
      className={`
        ${ndot57.variable} 
        ${ndot57Caps.variable} 
        ${nType82.variable} 
        ${shareTechMono.variable} 
        ${spaceMono.variable}
      `}
    >
      {/* REMOVED: bg-white, text-black, dark:bg-black 
          The background and text colors are now handled by globals.css 
          using the --color-off-white and --color-primary tokens.
      */}
      <body className="antialiased">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
