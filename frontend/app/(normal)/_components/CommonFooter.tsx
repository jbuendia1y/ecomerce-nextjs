import FacebookIcon from "@/modules/core/icons/FacebookIcon";
import InstagramIcon from "@/modules/core/icons/InstagramIcon";
import MapIcon from "@/modules/core/icons/MapIcon";
import StoreIcon from "@/modules/core/icons/StoreIcon";
import TwitterIcon from "@/modules/core/icons/TwitterIcon";
import WhatsappIcon from "@/modules/core/icons/WhatsappIcon";
import Link from "next/link";

export default function CommonFooter() {
  return (
    <footer className="bg-[#0F172A] py-16 px-8 lg:px-0">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-600 h-[1px] my-6"></div>
        <div className="flex flex-col lg:flex-row gap-8 text-white [&>ul>li]:my-2">
          <ul>
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#productos-populares">Productos populares</Link>
            </li>
            <li>
              <Link href="#explorar">Explorar</Link>
            </li>
            <li>
              <Link href="#quienes-somos">¿Quienes somos?</Link>
            </li>
          </ul>
          <div className="hidden lg:block w-[1px] bg-slate-700"></div>
          <ul className="[&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2">
            <li>
              <Link href="https://wa.me/STORE_PHONE_NUMBER/?text=Hola&20mundo">
                <WhatsappIcon /> Contáctanos
              </Link>
            </li>
            <li>
              <Link href="https://www.google.com/maps">
                <StoreIcon /> Av. Lorem ipsum dolor sit amet consectetur
                adipisicing
              </Link>
            </li>
            <li>
              <Link href="https://www.google.com/maps">
                <MapIcon /> Ubícanos
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-end gap-3">
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
        </div>
      </div>
    </footer>
  );
}
