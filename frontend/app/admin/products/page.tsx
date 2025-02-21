import { getProducts } from "@/modules/products/services/getProducts";
import { ProductsDataTable } from "./data-table";
import AddProductModal from "./_components/AddProductModal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">/</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="px-4">
        <div className="flex justify-between items-end pb-4">
          <div>
            <h1 className="text-2xl font-bold">Productos</h1>
            <p>Lista de los productos actuales del ecomerce</p>
          </div>
          <AddProductModal />
        </div>
        <ProductsDataTable
          data={initialData.data}
          currentPage={initialData.meta.pagination.page}
          totalProducts={initialData.meta.pagination.total}
          totalPages={initialData.meta.pagination.pageCount}
        />
      </main>
    </div>
  );
}
