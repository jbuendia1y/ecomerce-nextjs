import EditProductForm from "./_components/EditProductForm";
import { getProductDetails } from "@/modules/products/services/getProductDetails";
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

export default async function EditProductPage(props: {
  params: Promise<{ productId: string }>;
}) {
  const product = await getProductDetails((await props.params).productId);
  if (!product) return <></>;

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
                <BreadcrumbLink href="/admin/products">products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>{product.slug}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="px-4">
        <div className="flex justify-between items-end pb-4">
          <div>
            <h1 className="text-2xl font-bold">Editar producto</h1>
            <p>Lista de los productos actuales del ecomerce</p>
          </div>
          {/* <div className="flex gap-2 items-center">
            <Button variant="outline">Descartar</Button>
            <Button>
              <SaveIcon />
              Guardar
            </Button>
          </div> */}
        </div>
        <EditProductForm defaultValues={product} />
      </main>
    </div>
  );
}
