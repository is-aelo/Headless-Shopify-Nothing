import { redirectToCheckout } from "../../components/cart/actions";
import Price from "../../components/price";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "../../lib/shopify";

export const metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    redirect("/search");
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-12 lg:gap-16 lg:py-14">
        {/* Summary */}
        <div className="lg:col-span-7">
          <h1 className="font-logo text-[clamp(2rem,4vw,3.25rem)] uppercase leading-[0.9] tracking-tighter text-primary">
            Checkout
          </h1>
          <p className="mt-4 max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-wide text-muted">
            Review your order before continuing to the secured payment gateway.
          </p>

          <ul className="mt-10 border-t border-black/[0.06]">
            {cart.lines.map((line) => (
              <li
                key={line.id}
                className="flex items-center gap-5 border-b border-black/[0.06] py-6"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-black/[0.08] bg-white">
                  {line.merchandise.image ? (
                    <Image
                      src={line.merchandise.image.url}
                      alt={line.merchandise.image.altText || ""}
                      width={line.merchandise.image.width || 100}
                      height={line.merchandise.image.height || 100}
                      className="h-full w-full object-contain p-1.5"
                    />
                  ) : (
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                      {line.merchandise.product.title.slice(0, 3)}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-logo text-sm uppercase tracking-wide text-primary">
                    {line.merchandise.product.title}
                  </h3>
                  <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    {line.merchandise.title}
                  </p>
                </div>

                <div className="text-right">
                  <Price
                    className="font-mono text-sm tracking-tight text-primary"
                    amount={String(
                      parseFloat(line.cost.totalAmount.amount).toFixed(2),
                    )}
                    currencyCode={line.cost.totalAmount.currencyCode}
                  />
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    × {line.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Totals + gate */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 lg:border-l lg:border-black/[0.06] lg:pl-14">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Order Summary
            </h2>

            <dl className="mt-6 space-y-3 font-mono text-[11px] uppercase tracking-wide">
              <div className="flex items-center justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-primary">
                  <Price
                    amount={cart.cost.subtotalAmount.amount}
                    currencyCode={cart.cost.subtotalAmount.currencyCode}
                  />
                </dd>
              </div>

              {parseFloat(cart.cost.totalTaxAmount.amount) > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Tax</dt>
                  <dd className="text-primary">
                    <Price
                      amount={cart.cost.totalTaxAmount.amount}
                      currencyCode={cart.cost.totalTaxAmount.currencyCode}
                    />
                  </dd>
                </div>
              )}

              <div className="flex items-center justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-primary">Calculated next</dd>
              </div>

              <div className="my-4 flex items-center justify-between border-t border-black/[0.06] pt-4">
                <dt className="font-logo text-base uppercase tracking-wide text-primary">
                  Total
                </dt>
                <dd className="font-mono text-lg tracking-tight text-primary">
                  <Price
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </dd>
              </div>
            </dl>

            <form action={redirectToCheckout}>
              <button
                type="submit"
                className="group mt-8 flex w-full items-center justify-center gap-3 bg-primary py-5 font-mono text-[11px] uppercase tracking-[0.3em] text-white transition-colors hover:bg-black/90"
              >
                Pay Securely
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
              You will be redirected to our secure payment gateway to complete
              your order.
            </p>

            <p className="mt-8 text-center">
              <Link
                href="/search"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                ← Continue Shopping
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
