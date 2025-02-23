import { OrdersDataTable } from "./data-table";
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
import { getOrders } from "@/modules/orders/services/getOrders";
import OrderStateFiltersList from "./_components/OrderStateFiltersList";
import { OrderState } from "@/modules/orders/interfaces";

const isOrderState = (value: string): value is OrderState => {
  if (
    value === OrderState.wait ||
    value === OrderState.process ||
    value === OrderState.completed ||
    value === OrderState.cancelled
  ) {
    return true;
  }
  return false;
};

export default async function AdminOrdersPage(props: {
  searchParams: Promise<{ page?: string; q?: string; state?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentOrderState = searchParams.state
    ? isOrderState(searchParams.state)
      ? searchParams.state
      : undefined
    : undefined;
  const page = parseInt(searchParams.page ?? "1");

  const initialData = (await getOrders({
    orderState: currentOrderState,
    page: page,
    limit: 10,
  })) ?? {
    data: [],
    meta: { pagination: { page: 1, pageCount: 1, pageSize: 0, total: 0 } },
  };

  if (!initialData) return <></>;

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
                <BreadcrumbPage>pedidos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="px-4">
        <div className="flex justify-between items-end pb-4">
          <div>
            <h1 className="text-2xl font-bold">Pedidos</h1>
            <p>Lista de los pedidos del ecomerce</p>
          </div>
        </div>
        <OrderStateFiltersList />
        <OrdersDataTable
          data={initialData.data}
          currentPage={initialData.meta.pagination.page}
          totalProducts={initialData.meta.pagination.total}
          totalPages={initialData.meta.pagination.pageCount}
        />
      </main>
    </div>
  );
}
