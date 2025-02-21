import { getProducts } from "@/modules/products/services/getProducts";
import { ProductsDataTable } from "./data-table";
import AddProductModal from "./_components/AddProductModal";

export default async function AdminProductsPage(props: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page ?? "1");
  const search = searchParams.q;
  const initialData = await getProducts({
    page: page,
    limit: 10,
    search: search ?? null,
  });

  return (
    <main className="p-4">
      <header className="flex justify-between items-end pb-4">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p>Lista de los productos actuales del ecomerce</p>
        </div>
        <AddProductModal />
      </header>
      <ProductsDataTable data={initialData.data} />
    </main>
  );
}
