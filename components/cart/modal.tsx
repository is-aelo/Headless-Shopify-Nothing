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
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-border-l bg-off-white p-6 text-primary md:w-[420px]">
              <div className="flex items-center justify-between border-b border-border-l pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-border-l bg-white">
                    <ShoppingBag size={16} strokeWidth={1.5} />
                  </div>
                  <p className="font-logo text-xl tracking-widest">BAG</p>
                </div>
                <button
                  aria-label="Close Bag"
                  onClick={closeCart}
                  className="group"
                >
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center">
                  <div className="mb-6 opacity-20">
                    <ShoppingBag size={64} strokeWidth={1} />
                  </div>
                  <p className="font-nav text-center text-xl uppercase tracking-tighter opacity-50">
                    Bag is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="grow overflow-auto py-4 scrollbar-hide">
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

                        return (
                          <li
                            key={i}
                            className="group flex w-full flex-col border-b border-border-l/50 last:border-0"
                          >
                            <div className="relative flex w-full flex-row justify-between py-6">
                              <div className="absolute z-40 -left-2 -top-1 opacity-0 transition-opacity group-hover:opacity-100">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>

                              <div className="flex flex-row gap-4">
                                <div className="relative h-20 w-20 overflow-hidden rounded-[10px] border border-border-l bg-white">
                                  <Image
                                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
                                    width={80}
                                    height={80}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                </div>

                                <div className="flex flex-col justify-center">
                                  <Link
                                    href={merchandiseUrl}
                                    onClick={closeCart}
                                    className="font-product text-sm leading-none hover:underline"
                                  >
                                    {item.merchandise.product.title}
                                  </Link>
                                  {item.merchandise.title !==
                                    DEFAULT_OPTION && (
                                    <p className="mt-1 font-ui text-[11px] uppercase tracking-wider text-muted">
                                      {item.merchandise.title}
                                    </p>
                                  )}
                                  <div className="mt-3 flex h-7 w-fit items-center rounded-[6px] border border-border-l bg-white">
                                    <EditItemQuantityButton
                                      item={item}
                                      type="minus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                    <span className="w-8 text-center font-ui text-[12px]">
                                      {item.quantity}
                                    </span>
                                    <EditItemQuantityButton
                                      item={item}
                                      type="plus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end justify-center">
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

                  <div className="border-t border-primary/10 pt-6 pb-2">
                    <div className="font-ui text-[11px] uppercase tracking-[0.2em] text-muted space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <Price
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
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
                      <span className="font-logo text-lg tracking-widest">
                        TOTAL
                      </span>
                      <Price
                        className="font-nav text-xl"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>

                    <form action={redirectToCheckout} className="mt-4">
                      <CheckoutButton />
                    </form>

                    <p className="mt-4 text-center font-body text-[10px] text-muted uppercase tracking-tighter">
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

function CloseCart() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border-l bg-white transition-all hover:bg-primary hover:text-white">
      <X size={20} strokeWidth={1.5} />
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
