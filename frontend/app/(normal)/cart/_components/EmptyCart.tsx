import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <Card className="flex flex-col lg:flex-row gap-4 items-center py-12">
      <div className="w-full max-w-[420px] text-center px-6">
        <h1 className="text-3xl font-bold">¡El carrito está vacio!</h1>
        <p className="text-xl my-2">
          Puede escoger los mejores productos para verlos en su carrito
        </p>
        <Link href="/store">
          <Button size="lg">Seguir explorando</Button>
        </Link>
      </div>

      <div className="relative">
        <Image
          src="/dog-empty-cart.png"
          alt="perro negro"
          width={335}
          height={315}
          className="inline-block w-full h-full max-w-[335px] max-h-[315px] relative z-10"
        />
        <div className="absolute z-0 bottom-0 left-0 block w-[77%] h-[239px] bg-[#E1EF23]"></div>
      </div>
    </Card>
  );
}
