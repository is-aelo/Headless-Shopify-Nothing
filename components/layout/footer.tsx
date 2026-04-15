import FooterMenu from "components/layout/footer-menu";
import LogoSquare from "components/logo-square";
import { getMenu } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton = "w-full h-4 animate-pulse bg-border-l";
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="bg-white border-t border-border-l font-nav">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-16 md:flex-row md:px-16">
        <div className="flex flex-col gap-6">
          <Link className="flex items-center gap-3 text-primary" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase text-[11px] tracking-[0.4em] font-bold">
              {SITE_NAME}
            </span>
          </Link>
          <p className="text-[10px] text-muted max-w-[240px] leading-relaxed uppercase tracking-wider">
            Building the next generation of technical design systems.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex w-[200px] flex-col gap-3">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <div className="md:ml-24">
            <FooterMenu menu={menu} />
          </div>
        </Suspense>
      </div>

      <div className="border-t border-border-l py-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-4 px-6 md:flex-row md:items-center md:px-16">
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
            &copy; {copyrightDate} {copyrightName}. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6 md:ml-auto">
            <a
              href="https://github.com/vercel/commerce"
              className="text-[9px] uppercase tracking-[0.2em] text-muted hover:text-primary transition-colors"
            >
              Source
            </a>
            <span className="text-border-l">/</span>
            <Link
              href="/privacy-policy"
              className="text-[9px] uppercase tracking-[0.2em] text-muted hover:text-primary transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
