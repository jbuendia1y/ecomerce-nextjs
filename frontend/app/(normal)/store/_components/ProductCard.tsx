"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { cn, displayPrice } from "@/lib/utils";
import { useCart } from "@/modules/cart/hooks/useCart";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard(props: {
  className?: string;
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}) {
  const {
    id: productId,
    name: productName,
    image: imageURL,
    price,
    slug,
    stock,
  } = props;
  const { addItem } = useCart();

  return (
    <Card className={cn("block max-w-[320px]", props.className)}>
      <Image
        src={imageURL}
        alt={productName}
        width={300}
        height={300}
        className="object-contain"
      />
      <div className="p-2 mx-auto">
        <CardTitle className="text-2xl">
          <Link href={"/store/" + slug}>{productName}</Link>
        </CardTitle>
        <p className="text-2xl font-bold mt-2 py-1">S/.{displayPrice(price)}</p>
        <Button
          className="w-full"
          onClick={() => {
            addItem({
              id: productId,
              name: productName,
              image: imageURL,
              price,
              stock,
              slug,
            });
          }}
        >
          Añadir al carrito
        </Button>
      </div>
    </Card>
  );
}
