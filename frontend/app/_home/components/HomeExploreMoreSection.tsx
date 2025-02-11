import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomeExploreMoreSection() {
  return (
    <section
      id="explorar"
      className="w-[90%] max-w-5xl mx-auto min-h-[520px] bg-[#0F172A] grid place-content-center rounded-2xl"
    >
      <div className="max-w-[800px] mx-auto flex flex-col-reverse items-center gap-7 lg:flex-row lg:gap-16">
        <div className="text-center lg:text-left pb-12 lg:pb-0">
          <h2 className="text-3xl text-white font-bold mb-4">
            Descubre la tienda para ver todos los productos
          </h2>
          <Link href="/store">
            <Button variant="outline" size="lg">
              Explorar
            </Button>
          </Link>
        </div>
        <div className="relative h-full w-full max-w-[280px] max-h-[380px]">
          <Image
            src="/explore-more.png"
            alt="perro feliz"
            width={215}
            height={380}
            className="block relative z-10 translate-x-7 translate-y-7"
          />
          <div className="absolute z-0 bottom-0 right-0 w-[280px] h-[280px] bg-[#2794D3] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
