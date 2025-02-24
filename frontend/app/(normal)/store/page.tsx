import ProductsCatalog from "@/app/(normal)/store/_components/ProductsCatalog";
import { Suspense } from "react";

export default function StorePage() {
  return (
    <main>
      <Suspense fallback={<p>loading</p>}>
        <ProductsCatalog />
      </Suspense>
    </main>
  );
}
