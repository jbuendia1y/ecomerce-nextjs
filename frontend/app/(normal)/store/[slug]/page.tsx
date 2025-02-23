import { getProductDetailsFromSlug } from "@/modules/products/services/getProductDetails";
import CommonFooter from "../../_components/CommonFooter";
import CommonNavbar from "../../_components/CommonNavbar";
import AddToCartButton from "./_components/AddToCartButton";
import { displayPrice } from "@/lib/utils";
import CldImage from "@/components/CldImage";
import { getCldOgImageUrl } from "next-cloudinary";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getProductDetailsFromSlug(slug);
  if (!product) return notFound();

  return {
    title: product.name,
    openGraph: {
      title: product.name,
      images: [getCldOgImageUrl({ src: product.image })],
      description: product.description,
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getProductDetailsFromSlug(slug);

  if (!product)
    return (
      <div>
        <CommonNavbar />
        <main>Producto no encontrado</main>
        <CommonFooter />
      </div>
    );

  return (
    <div>
      <CommonNavbar />
      <main className="block min-h-[400px] max-w-5xl mx-auto mt-10 py-12 border border-slate-300 rounded-t-xl">
        <div className="flex flex-col lg:flex-row gap-3 justify-center lg:justify-normal items-center">
          <CldImage
            src={product.image}
            alt={product.name}
            width={360}
            height={400}
          />

          <div className="max-w-md pt-5">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl my-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem iure excepturi harum ea recusandae asperiores
              dolorum nesciunt provident, suscipit, fuga nihil repellendus.
              Laborum, sed ipsa dicta eum hic cum suscipit.
            </p>
            <p className="text-2xl font-bold my-1">
              S/.{displayPrice(product.price)}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <AddToCartButton product={product} />
              <span className="text-lg font-light">
                {product.stock} unidades disponibles
              </span>
            </div>
          </div>
        </div>
        <div className="w-5/6 h-[1px] mx-auto bg-slate-200 mt-6 mb-6"></div>
        <section>
          <h2>Información</h2>
        </section>
      </main>
      <CommonFooter />
    </div>
  );
}
