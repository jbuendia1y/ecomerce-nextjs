import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardPopularProducts } from "@/modules/meta-products/services/getDashboardPopularProducts";
import Image from "next/image";

export default async function DashboardPopularProducts() {
  const data = await getDashboardPopularProducts({ limit: 3 });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Productos populares</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {data.map(({ product, meta }) => {
            return (
              <div
                key={`dashboard-popular-product-${product.id}`}
                className="flex items-center justify-between"
              >
                <div className="relative w-9 h-9">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    loading="lazy"
                    className="rounded-full"
                  />
                </div>
                <span>{meta.purcharseCounter}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
