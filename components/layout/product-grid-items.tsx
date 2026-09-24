import { ProductCard } from "components/product/product-card";
import { Product } from "lib/shopify/types";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="grid grid-cols-2 gap-px border border-border-l bg-border-l sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product.handle}
          product={product}
          index={index}
          cell
        />
      ))}
    </div>
  );
}
