import CartModal from "components/cart/modal";
import { getCollections, getMenu } from "lib/shopify";
import { User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import NavbarClient from "./navbar-client";
import Search from "./search";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menuPromise = getMenu("next-js-frontend-header-menu");
  const collectionsPromise = getCollections();

  const [menu, collections] = await Promise.all([
    menuPromise,
    collectionsPromise,
  ]);

  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const accountUrl = shopifyDomain ? `https://${shopifyDomain}/account` : "#";

  return (
    <NavbarClient>
      <div className="mx-auto max-w-[1440px] px-4 lg:px-10">
        <div className="relative flex h-16 items-center">
          {/* LEFT */}
          <div className="flex flex-1 items-center gap-1 sm:gap-2 min-w-0">
            <Suspense fallback={<div className="w-10" />}>
              <div className="shrink-0">
                <MobileMenu menu={menu} collections={collections} />
              </div>
            </Suspense>

            <div className="flex-1 min-w-0">
              <div className="w-full max-w-[120px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px]">
                <Suspense
                  fallback={
                    <div className="h-4 w-full animate-pulse bg-neutral-100 dark:bg-neutral-800" />
                  }
                >
                  <Search />
                </Suspense>
              </div>
            </div>
          </div>

          {/* CENTER (ABSOLUTE, ALWAYS CENTERED) */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="pointer-events-auto group/logo relative flex items-center"
            >
              <h1 className="font-body font-black text-sm sm:text-base md:text-xl lg:text-2xl tracking-tighter uppercase leading-none text-surface whitespace-nowrap">
                {SITE_NAME}
              </h1>
              <span className="ml-1 h-1 w-1 rounded-full bg-accent-red opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100" />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex flex-1 justify-end items-center min-w-0">
            <div className="flex shrink-0 items-center">
              <a
                href={accountUrl}
                className="flex h-10 w-10 items-center justify-center text-primary transition-transform active:scale-90"
              >
                <User size={18} strokeWidth={1.5} className="opacity-90" />
              </a>

              <div className="flex h-10 w-10 items-center justify-center scale-[0.85] origin-right">
                <CartModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarClient>
  );
}
