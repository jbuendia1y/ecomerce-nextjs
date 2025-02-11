"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/cart/hooks/useCart";
import { Product } from "@/modules/products/interfaces";

export default function AddToCartButton(props: { product: Product }) {
  const { product } = props;
  const { addItem } = useCart();
  return (
    <Button
      size="lg"
      onClick={() => {
        addItem({
          id: product.id,
          name: product.name,
          image: product.image.url,
          price: product.price,
          slug: product.slug,
          stock: product.stock,
        });
      }}
    >
      Añadir al carrito
    </Button>
  );
}
