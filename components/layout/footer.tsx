import Link from "next/link";
import { LiaBehance, LiaLinkedin } from "react-icons/lia";
import { LuMail } from "react-icons/lu";

export default function Footer() {
  const LIA_SIZE = 18;
  const LU_SIZE = 16;

  return (
    <footer className="w-full border-t border-border-l bg-off-white px-6 py-10 md:py-8 font-body text-surface">
      <div className="mx-auto max-w-(--breakpoint-2xl)">
        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-y-10 md:flex md:items-end md:justify-between md:gap-x-10">
          {/* Brand Identity */}
          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
            <h2 className="font-logo text-2xl tracking-tighter uppercase leading-none text-surface">
              Nothing (R)
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.2em]">
              <span className="font-bold text-surface/80">
                UNSOLICITED CONCEPT BY Eloisa Jane Talingting
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-border-l md:block" />
              <span className="opacity-60 md:opacity-100">v01.2026</span>
            </div>
          </div>

          {/* Compact Socials */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <span className="text-[9px] uppercase tracking-[0.3em] text-border-l md:hidden">
              Connect
            </span>
            <div className="flex flex-col gap-3 md:flex-row md:gap-6">
              <a
                href="mailto:talingting.eloise@gmail.com"
                className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              >
                <LuMail
                  size={LU_SIZE}
                  strokeWidth={1.5}
                  color="var(--border-l)"
                />
                <span className="text-[10px] uppercase tracking-widest">
                  Email
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/eloisetalingting/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              >
                <LiaLinkedin size={LIA_SIZE} color="var(--border-l)" />
                <span className="text-[10px] uppercase tracking-widest">
                  LinkedIn
                </span>
              </a>
              <a
                href="https://www.behance.net/is_aelo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              >
                <LiaBehance size={LIA_SIZE} color="var(--border-l)" />
                <span className="text-[10px] uppercase tracking-widest">
                  Behance
                </span>
              </a>
            </div>
          </div>

          {/* System & Disclaimer */}
          <div className="flex flex-col gap-4 md:items-end md:gap-1">
            <span className="text-[9px] uppercase tracking-[0.3em] text-border-l">
              System
            </span>
            <div className="flex flex-col gap-1 text-[10px] uppercase tracking-tight md:flex-row md:items-center md:gap-2">
              <Link
                href="https://github.com/vercel/commerce"
                className="hover:underline"
              >
                Powered by Vercel Commerce
              </Link>
              <span className="hidden text-border-l md:block">/</span>
              <span className="opacity-70">Shopify Headless</span>
            </div>
            {/* Disclaimer Text */}
            <p className="max-w-[200px] text-[8px] leading-tight uppercase tracking-tighter opacity-30 md:text-right">
              This is a non-commercial educational project. Not affiliated with,
              authorized, or endorsed by Nothing Technology Limited.
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-10 border-t border-border-l pt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:justify-between md:items-center text-[9px] uppercase tracking-[0.4em]">
          <span className="opacity-40 order-2 md:order-1">
            © 2026 All Rights Reserved
          </span>
          <span className="font-logo opacity-60 order-1 md:order-2">
            Built to be different.
          </span>
        </div>
      </div>
    </footer>
  );
}
