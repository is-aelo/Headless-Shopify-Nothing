import { LiaBehance, LiaLinkedin } from "react-icons/lia";
import { LuMail } from "react-icons/lu";

const socials = [
  {
    label: "Email",
    href: "mailto:talingting.eloise@gmail.com",
    icon: (size: number) => <LuMail size={size} strokeWidth={1.5} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eloisetalingting/",
    icon: (size: number) => <LiaLinkedin size={size} />,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/is_aelo",
    icon: (size: number) => <LiaBehance size={size} />,
  },
];

const shopLinks = [
  { label: "All Products", href: "/search" },
  { label: "Phones", href: "/search/phones" },
  { label: "Audio", href: "/search/audio" },
  { label: "CMF", href: "/search/cmf" },
  { label: "Smart Watches", href: "/search/smart-watches" },
  { label: "Accessories", href: "/search/accessories" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
      {children}
    </p>
  );
}

export default function Footer() {
  const SIZE = 18;

  return (
    <footer className="border-t border-white/10 bg-primary text-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Wordmark band */}
        <div className="pb-10 pt-8 md:pb-12 md:pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
            Unsolicited concept by Eloisa Jane Talingting
          </p>
          <p className="mt-4 font-logo text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-[0.85] tracking-tighter text-white">
            Nothing
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 border-t border-white/10 pb-12 pt-10 sm:grid-cols-2 md:pb-14 md:pt-12 lg:grid-cols-4 lg:gap-x-14">
          <div>
            <ColumnHeading>Shop</ColumnHeading>
            <ul className="mt-6 flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Connect</ColumnHeading>
            <ul className="mt-6 flex flex-col gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                  >
                    {social.icon(SIZE)}
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <ColumnHeading>About</ColumnHeading>
            <p className="mt-6 max-w-md font-mono text-[11px] leading-relaxed uppercase tracking-wide text-white/50">
              This is a non-commercial educational project. Not affiliated with,
              authorized, or endorsed by Nothing Technology Limited.
            </p>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Shopify Headless / v01.2026
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col gap-3 border-t border-white/10 pb-7 pt-7 font-mono text-[9px] uppercase tracking-[0.35em] text-white/40 md:flex-row md:items-center md:justify-between md:gap-6 md:pb-6 md:pt-7">
          <span>© 2026 All Rights Reserved</span>
          <span className="font-logo text-white/70">Built Different.</span>
        </div>
      </div>
    </footer>
  );
}
