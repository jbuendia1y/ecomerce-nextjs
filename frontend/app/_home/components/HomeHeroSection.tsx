import { Button } from "@/components/ui/button";
import MakiArrow from "@/modules/core/icons/MakiArrow";
import Image from "next/image";
import Link from "next/link";

export default function HomeHeroSection() {
  return (
    <header className="w-[90%] max-w-[900px] mx-auto min-h-[450px] flex flex-col-reverse gap-7 lg:flex-row lg:gap-32 items-center py-16">
      <div>
        <h1 className="text-5xl font-bold">
          La mejor tienda de comida para tu mascota
        </h1>
        <p className="text-xl my-2.5">
          Tenemos produuctos para gatos y perros a un precio ascecible para
          mantener a tu mascota con buena salud
        </p>
        <Link href="/store">
          <Button size="sm">
            Compra ahora <MakiArrow />
          </Button>
        </Link>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/hero.png"
          alt="perro contento"
          height={450}
          width={320}
          className="block z-10 relative"
        />
        <div className="absolute z-0 bottom-0 left-0 block w-[320px] h-[350px] bg-[#50B6FF]"></div>
      </div>
    </header>
  );
}
