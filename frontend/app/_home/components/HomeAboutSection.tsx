import Image from "next/image";

export default function HomeAboutSection() {
  return (
    <section
      id="quienes-somos"
      className="w-[90%] max-w-[900px] mx-auto min-h-[400px] grid place-content-center py-52"
    >
      <div className="flex flex-col-reverse gap-7 lg:flex-row lg:gap-32">
        <div className="[&>p>strong]:text-yellow-500">
          <h2 className="text-3xl font-bold">¿Quienes somos?</h2>
          <p className="text-xl">
            En MI_TIENDA, nos apasiona el bienestar de las mascotas. Ofrecemos
            una
            <strong>
              variedad de alimentos de calidad para perros y gatos
            </strong>{" "}
            en Perú, adaptándonos a diferentes necesidades y preferencias.
            Queremos que tu mascota disfrute de una{" "}
            <strong>alimentación saludable y deliciosa</strong> todos los días.
          </p>
          <p className="text-xl">
            Puedes visitarnos en nuestra tienda o contactarnos para recibir
            asesoría sobre los mejores productos para tu compañero de cuatro
            patas. ¡Estaremos encantados de ayudarte!
          </p>
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/about.png"
            alt="perro curioso"
            width={339}
            height={408}
            className="relative block lg:min-w-[339px] lg:min-h-[408px] w-full h-full z-10"
          />
          <div className="absolute z-0 bottom-0 right-0 block w-full h-full bg-[#50B6FF] rounded-tl-full rounded-tr-[500px]"></div>
        </div>
      </div>
    </section>
  );
}
