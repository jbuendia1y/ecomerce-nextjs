import FacebookIcon from "@/modules/core/icons/FacebookIcon";
import InstagramIcon from "@/modules/core/icons/InstagramIcon";
import MapIcon from "@/modules/core/icons/MapIcon";
import StoreIcon from "@/modules/core/icons/StoreIcon";
import TwitterIcon from "@/modules/core/icons/TwitterIcon";
import WhatsappIcon from "@/modules/core/icons/WhatsappIcon";
import Link from "next/link";

export default function CommonFooter() {
  const enterpriseNumber = "999444777";
  const contactMessage = `Hola!
  Vengo desde su tienda web, tengo una consulta.`;

  const contactLinks = [
    {
      icon: WhatsappIcon,
      name: "whatsapp",
      label: "Contáctanos",
      link: `https://wa.me/${enterpriseNumber}/?${new URLSearchParams({
        text: contactMessage,
      }).toString()}`,
    },
    {
      icon: StoreIcon,
      name: "google-map-direction",
      label: "Av. Lorem ipsum dolor sit amet consectetur adipisicing",
      link: "https://www.google.com/maps",
    },
    {
      icon: MapIcon,
      name: "google-map-location",
      label: "Ubícanos",
      link: "https://www.google.com/maps",
    },
  ];

  const socialNetworks = [
    {
      icon: FacebookIcon,
      name: "facebook",
      link: "https://www.facebook.com/#",
    },
    {
      icon: InstagramIcon,
      name: "instagram",
      link: "https://instagram.com/#",
    },
    {
      icon: TwitterIcon,
      name: "twitter",
      link: "https://x.com/#",
    },
  ];

  return (
    <footer className="bg-[#0F172A] py-16 px-8 lg:px-0">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-600 h-[1px] my-6"></div>
        <div className="flex flex-col lg:flex-row gap-8 text-white [&>ul>li]:my-2">
          <ul>
            <li>
              <Link href="/#">Home</Link>
            </li>
            <li>
              <Link href="/#productos-populares">Productos populares</Link>
            </li>
            <li>
              <Link href="/#explorar">Explorar</Link>
            </li>
            <li>
              <Link href="/#quienes-somos">¿Quienes somos?</Link>
            </li>
          </ul>
          <div className="hidden lg:block w-[1px] bg-slate-700"></div>
          <ul className="[&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2">
            {contactLinks.map((contact) => {
              return (
                <li key={`footer-contact-item-${contact.name}`}>
                  <Link href={contact.link}>
                    <contact.icon /> {contact.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center justify-end gap-3">
          {socialNetworks.map((social) => {
            return (
              <Link
                key={`footer-social-network-${social.name}`}
                href={social.link}
                aria-label={social.name}
              >
                <social.icon />{" "}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
