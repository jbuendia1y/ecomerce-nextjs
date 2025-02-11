import ProductsCatalog from "@/app/(normal)/store/_components/ProductsCatalog";
import CommonFooter from "../_components/CommonFooter";
import CommonNavbar from "../_components/CommonNavbar";
import { Suspense } from "react";

export default function StorePage() {
  return (
    <div>
      <CommonNavbar />
      <main>
        <Suspense fallback={<p>loading</p>}>
          <ProductsCatalog />
        </Suspense>
      </main>
      <CommonFooter />
    </div>
  );
}
