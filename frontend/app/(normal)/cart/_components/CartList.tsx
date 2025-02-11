"use client";

import { useCart } from "@/modules/cart/hooks/useCart";
import EmptyCart from "./EmptyCart";
import { Card } from "@/components/ui/card";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import MakiArrow from "@/modules/core/icons/MakiArrow";
import Link from "next/link";

export default function CartList() {
  const { items, totalProducts } = useCart();

  if (totalProducts === 0) return <EmptyCart />;

  return (
    <Card className="p-6">
      <style>
        {`
            /* Hide the arrows in number input fields */
  .no-arrows::-webkit-outer-spin-button,
  .no-arrows::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .no-arrows {
    -moz-appearance: textfield;
  }
            `}
      </style>
      <h1 className="text-3xl font-bold">Carrito de compras</h1>
      <div className="flex flex-col gap-3 mt-5">
        {items.map((item) => {
          // Image default w170 h115
          return <CartItem key={"cart-item-" + item.product.id} item={item} />;
        })}
      </div>
      <Link href="/store" className="inline-block mt-3">
        <Button variant="link">
          Seguir explorando <MakiArrow fill="black" />
        </Button>
      </Link>
    </Card>
  );
}
