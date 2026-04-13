"use client";

import { Dialog, Transition } from "@headlessui/react";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import { ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { EditItemVariantSelector } from "./edit-item-variant-selector";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open Bag" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-400 cubic-bezier(0.16, 1, 0.3, 1)"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-border-l bg-off-white p-6 text-primary md:w-[400px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-border-l">
                <p className="font-logo text-xl tracking-widest">BAG</p>
                <button aria-label="Close Bag" onClick={closeCart}>
                  <X
                    size={18}
                    strokeWidth={1.5}
                    className="text-muted hover:text-primary transition-colors"
                  />
                </button>
              </div>

              {/* Empty state */}
              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center gap-4">
                  <ShoppingBag
                    size={48}
                    strokeWidth={1}
                    className="opacity-20"
                  />
                  <p className="font-nav text-[11px] uppercase tracking-[0.2em] text-muted">
                    Your bag is empty
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  {/* Cart items */}
                  <ul className="grow overflow-auto py-2 scrollbar-hide">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title,
                        ),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;
                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          },
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        );

                        const thumbnailSrc =
                          item.merchandise.image?.url ||
                          item.merchandise.product.featuredImage.url;

                        const thumbnailAlt =
                          item.merchandise.image?.altText ||
                          item.merchandise.product.featuredImage.altText ||
                          item.merchandise.product.title;

                        const hasMultipleVariants =
                          item.merchandise.product.variants?.length > 1;

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-row items-start gap-4 border-b border-border-l/50 py-5 last:border-0"
                          >
                            {/* Square thumbnail with Skeleton */}
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="shrink-0"
                            >
                              <ThumbnailWithSkeleton
                                src={thumbnailSrc}
                                alt={thumbnailAlt}
                              />
                            </Link>

                            {/* Info */}
                            <div className="flex flex-1 flex-col gap-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="font-product text-sm leading-snug hover:underline line-clamp-2"
                                >
                                  {item.merchandise.product.title}
                                </Link>
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>

                              {/* Variant selector */}
                              {hasMultipleVariants && (
                                <EditItemVariantSelector
                                  item={item}
                                  variants={item.merchandise.product.variants}
                                  optimisticUpdate={updateCartItem}
                                />
                              )}

                              {/* Fallback: show title if only one variant */}
                              {!hasMultipleVariants &&
                                item.merchandise.title !== DEFAULT_OPTION && (
                                  <p className="font-ui text-[11px] uppercase tracking-wider text-muted">
                                    {item.merchandise.title}
                                  </p>
                                )}

                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex h-7 w-fit items-center rounded-[6px] border border-border-l bg-white">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <span className="w-7 text-center font-ui text-[12px]">
                                    {item.quantity}
                                  </span>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>

                                <Price
                                  className="font-nav text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>

                  {/* Footer */}
                  <div className="pt-4 border-t border-border-l">
                    <div className="space-y-2 font-ui text-[11px] uppercase tracking-[0.15em] text-muted">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <Price
                          amount={cart.cost.subtotalAmount.amount}
                          currencyCode={cart.cost.subtotalAmount.currencyCode}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <Price
                          amount={cart.cost.totalTaxAmount.amount}
                          currencyCode={cart.cost.totalTaxAmount.currencyCode}
                        />
                      </div>
                    </div>

                    <div className="my-4 flex items-center justify-between border-t border-border-l pt-4">
                      <span className="font-logo text-base tracking-widest">
                        TOTAL
                      </span>
                      <Price
                        className="font-nav text-lg"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>

                    <form action={redirectToCheckout}>
                      <CheckoutButton />
                    </form>

                    <p className="mt-3 text-center font-body text-[10px] uppercase tracking-tighter text-muted">
                      Shipping and discounts calculated at checkout.
                    </p>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function ThumbnailWithSkeleton({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);

  // Re-trigger loading state if src changes (variant change)
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return (
    <div className="relative h-[72px] w-[72px] overflow-hidden rounded-[8px] border border-border-l bg-white">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-off-white">
          <div className="h-full w-full animate-pulse bg-neutral-200" />
          {/* Subtle accent dot to match Nothing UI */}
          <div className="absolute h-1 w-1 bg-accent-red rounded-full" />
        </div>
      )}
      <Image
        className={`h-full w-full object-contain p-1.5 transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        width={72}
        height={72}
        alt={alt}
        src={src}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn-nothing-primary py-4 text-lg"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "PROCEED TO CHECKOUT"}
    </button>
  );
}
