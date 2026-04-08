import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import { User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import NavbarClient from "./navbar-client";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const accountUrl = shopifyDomain ? `https://${shopifyDomain}/account` : "#";

  return (
    <NavbarClient>
      <div className="relative mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-4 lg:px-6">
        {/* ── LEFT ── */}
        <div className="flex items-center justify-start">
          <div className="flex items-center mr-2 md:mr-4">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          <div className="flex items-center">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
        </div>

        {/* ── CENTER: Logo ── */}
        <div className="flex justify-center">
          <Link href="/" className="group/logo relative flex items-center">
            {/* Clean, Heavy Ndot Logo */}
            <h1 className="relative z-10 flex-none font-logo font-logo-heavy text-lg uppercase tracking-[0.3em] transition-colors duration-300 group-hover/logo:text-primary/70 md:text-xl">
              {SITE_NAME}
            </h1>

            {/* Static Red Indicator - Only shows on hover, no glow */}
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-accent-red opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100" />
          </Link>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex items-center justify-end gap-1 md:gap-2">
          <a
            href={accountUrl}
            className="flex h-11 w-11 items-center justify-center transition-all hover:-translate-y-0.5"
          >
            <User className="h-5 w-5" strokeWidth={1} />
          </a>
          <CartModal />
        </div>
      </div>
    </NavbarClient>
  );
}
