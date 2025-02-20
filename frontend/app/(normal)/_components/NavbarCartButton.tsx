"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/cart/hooks/useCart";
import CartIcon from "@/modules/core/icons/CartIcon";
import Link from "next/link";

export default function NavbarCartButton() {
  const { totalProducts } = useCart();

  return (
    <Link href="/cart">
      <Button variant="outline" size="icon" className="relative rounded-full">
        <CartIcon />
        {totalProducts > 0 ? (
          <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center rounded-full">
            {totalProducts}
          </Badge>
        ) : (
          <></>
        )}
      </Button>
    </Link>
  );
}
