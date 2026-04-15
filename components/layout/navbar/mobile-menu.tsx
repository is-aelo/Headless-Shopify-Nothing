"use client";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import StatusDot from "components/status-dot";
import { Collection, Menu } from "lib/shopify/types";
import { Grip, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function MobileMenu({
  menu,
  collections,
}: {
  menu: Menu[];
  collections: Collection[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open navigation"
        className="flex h-10 w-10 items-center justify-center text-primary transition-transform active:scale-90"
      >
        <Grip size={16} strokeWidth={1.5} className="opacity-90" />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeMobileMenu} className="relative z-[999]">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-off-white shadow-2xl">
              <div className="flex flex-col h-full p-8">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12">
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-l bg-white text-primary"
                    onClick={closeMobileMenu}
                  >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Collections Navigation */}
                <nav className="flex-1 overflow-y-auto">
                  <p className="mb-8 font-nav text-[11px] font-bold uppercase tracking-[0.5em] text-primary">
                    Collections
                  </p>
                  <ul className="flex flex-col gap-5">
                    {collections.map((collection) => {
                      const active = pathname === collection.path;
                      return (
                        <li
                          key={collection.handle}
                          className="flex items-center gap-3 group"
                        >
                          {/* Dot is now placed BEFORE the link */}
                          <div className="w-4 flex items-center justify-center">
                            {active ? (
                              <StatusDot className="opacity-100" />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/5 transition-colors group-hover:bg-primary/20" />
                            )}
                          </div>

                          <Link
                            href={collection.path}
                            onClick={closeMobileMenu}
                            className={clsx(
                              "font-nav text-lg uppercase tracking-wider transition-all duration-300",
                              active
                                ? "text-primary font-bold"
                                : "text-primary/40 hover:text-primary",
                            )}
                          >
                            {collection.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Hardware Footer */}
                <div className="mt-auto border-t border-border-l pt-8">
                  <p className="font-nav text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
                    NOTHING (R) CONCEPT PROJECT
                  </p>
                  <p className="font-nav text-[8px] uppercase tracking-[0.1em] text-primary/40">
                    BY ELOISA JANE TALINGTING
                  </p>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
