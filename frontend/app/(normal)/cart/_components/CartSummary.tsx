"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { displayPrice } from "@/lib/utils";
import { useCart } from "@/modules/cart/hooks/useCart";
import MastercardIcon from "@/modules/core/icons/MastercardIcon";
import VisaIcon from "@/modules/core/icons/VisaIcon";
import YapeIcon from "@/modules/core/icons/YapeIcon";

export default function CartSummary() {
  const { totalProducts, totalPrice, purcharse } = useCart();

  return (
    <Card className="max-h-max">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold">
          Resumen de compra
        </CardTitle>
      </CardHeader>
      <CardContent className="[&>p]:flex [&>p]:justify-between [&>p]:font-medium [&>p>span]:font-normal min-w-80">
        <p>
          N° de productos <span>{totalProducts}</span>
        </p>
        <p>
          Total a pagar <span>S/.{displayPrice(totalPrice)}</span>
        </p>
        <div className="flex items-center justify-center gap-2 my-2">
          <VisaIcon />
          <MastercardIcon />
          <YapeIcon />
        </div>
        <Button
          className="w-full"
          disabled={totalProducts === 0 || totalPrice === 0}
          onClick={async () => {
            await purcharse();
          }}
        >
          Realizar pedido
        </Button>
      </CardContent>
    </Card>
  );
}
