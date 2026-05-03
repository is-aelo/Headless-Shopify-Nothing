import Link from "next/link";
import { LiaBehance, LiaLinkedin } from "react-icons/lia";
import { LuMail } from "react-icons/lu";

export default function Footer() {
  const LIA_SIZE = 20;
  const LU_SIZE = 18;

  return (
    <footer className="w-full border-t border-border-l bg-off-white px-6 py-6 md:py-5 font-body text-surface">
      <div className="mx-auto max-w-(--breakpoint-2xl)">
        {/* Main Content Grid */}
        <div className="flex flex-col gap-y-6 md:flex-row md:items-end md:justify-between">
          {/* Brand Identity */}
          <div className="flex flex-col gap-1">
            <h2 className="font-body font-black text-2xl tracking-tighter uppercase leading-none text-surface">
              Nothing
            </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] uppercase tracking-[0.2em]">
              <span className="font-bold text-surface/80">
                UNSOLICITED CONCEPT BY Eloisa Jane Talingting
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-border-l md:block" />
              <span className="opacity-60 md:opacity-100">v01.2026</span>
            </div>
          </div>

          {/* Icons Only - Responsive Socials */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:talingting.eloise@gmail.com"
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              aria-label="Email"
            >
              <LuMail
                size={LU_SIZE}
                strokeWidth={1.5}
                color="var(--border-l)"
              />
              <span className="hidden text-[10px] uppercase tracking-widest xl:block">
                Email
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/eloisetalingting/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              aria-label="LinkedIn"
            >
              <LiaLinkedin size={LIA_SIZE} color="var(--border-l)" />
              <span className="hidden text-[10px] uppercase tracking-widest xl:block">
                LinkedIn
              </span>
            </a>
            <a
              href="https://www.behance.net/is_aelo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
              aria-label="Behance"
            >
              <LiaBehance size={LIA_SIZE} color="var(--border-l)" />
              <span className="hidden text-[10px] uppercase tracking-widest xl:block">
                Behance
              </span>
            </a>
          </div>

          {/* Disclaimer & Tech Stack */}
          <div className="flex flex-col gap-1.5 md:items-end md:gap-1">
            <p className="max-w-[220px] text-[8px] leading-tight uppercase tracking-tighter opacity-30 md:text-right">
              This is a non-commercial educational project. Not affiliated with,
              authorized, or endorsed by Nothing Technology Limited.
            </p>
            <div className="flex flex-col gap-1 text-[9px] uppercase tracking-tight sm:flex-row sm:items-center sm:gap-2">
              <Link
                href="https://github.com/vercel/commerce"
                className="hover:underline"
              >
                Powered by Vercel Commerce
              </Link>
              <span className="hidden text-border-l sm:block">/</span>
              <span className="opacity-70">Shopify Headless</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-6 border-t border-border-l pt-4 flex flex-col gap-3 md:mt-5 md:flex-row md:justify-between md:items-center text-[9px] uppercase tracking-[0.4em]">
          <span className="opacity-40 order-2 md:order-1">
            © 2026 All Rights Reserved
          </span>
          <span className="font-logo opacity-60 order-1 md:order-2">
            Built Different.
          </span>
        </div>
      </div>
    </footer>
  );
}
