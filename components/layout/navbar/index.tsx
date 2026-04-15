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
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex w-1/3 items-center justify-start -ml-2 gap-0 md:gap-2">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} collections={collections} />
            </Suspense>
            <div className="flex h-10 w-10 md:w-full md:max-w-[200px] lg:max-w-[280px] items-center justify-center">
              {/* FIXED: Wrapped Search in Suspense to prevent build error on static pages */}
              <Suspense
                fallback={
                  <div className="h-4 w-full animate-pulse bg-neutral-200" />
                }
              >
                <Search />
              </Suspense>
            </div>
          </div>

          <div className="flex w-1/3 justify-center">
            <Link href="/" className="group/logo relative flex items-center">
              <h1 className="font-logo font-logo-heavy text-lg uppercase tracking-[0.3em] text-primary md:text-xl">
                {SITE_NAME}
              </h1>
              <span className="ml-1 h-1 w-1 rounded-full bg-accent-red opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100" />
            </Link>
          </div>

          <div className="flex w-1/3 items-center justify-end -mr-2 gap-0">
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
    </NavbarClient>
  );
}
