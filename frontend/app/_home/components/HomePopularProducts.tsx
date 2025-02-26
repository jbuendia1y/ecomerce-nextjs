import ProductCard from "@/app/(normal)/store/_components/ProductCard";
import { getPopularProducts } from "@/modules/meta-products/services/getPopularProducts";

export default async function HomePopularProducts() {
  const products = await getPopularProducts();

  return (
    <section
      id="productos-populares"
      className="w-[90%] max-w-[900px] mx-auto min-h-[600px] flex items-center py-16"
    >
      <div>
        <h2 className="text-3xl font-bold">Productos populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {products.map((product) => {
            return (
              <ProductCard
                key={`popular-product-${product.id}`}
                id={product.id}
                image={product.image}
                name={product.name}
                slug={product.slug}
                price={product.price}
                stock={product.stock}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
