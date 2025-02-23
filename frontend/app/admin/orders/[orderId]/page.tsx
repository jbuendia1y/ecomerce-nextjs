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
import { getOrderDetails } from "@/modules/orders/services/getOrderDetails";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { displayPrice } from "@/lib/utils";
import { OrderState } from "@/modules/orders/interfaces";

const displayOrderState = (state: OrderState): string => {
  switch (state) {
    case OrderState.wait:
      return "en espera";
    case OrderState.process:
      return "en proceso";
    case OrderState.completed:
      return "completado";
    case OrderState.cancelled:
      return "cancelado";
    default:
      return "No establecido";
  }
};

export default async function AdminOrderDetailsPage(props: {
  params: Promise<{ orderId: string }>;
}) {
  const order = await getOrderDetails((await props.params).orderId);
  if (!order) return <></>;

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
                <BreadcrumbLink href="/admin/orders">pedidos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>{order.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="px-4">
        <div className="flex justify-between items-end pb-4">
          <div>
            <h1 className="text-2xl font-bold">Detalles del pedido</h1>
            <p>Información adicional del pedido realizado</p>
          </div>
        </div>
        <section className="max-w-96">
          <h2 className="text-xl font-bold">Detalles del envio</h2>
          <ul className="[&>li]:my-1.5 [&>li]:last:mb-0">
            <li className="flex justify-between items-center">
              <span>Estado</span>
              <span>{displayOrderState(order.status)}</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Ciudad</span>
              <span>{order.delivery.city}</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Provincia</span>
              <span>{order.delivery.province}</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Distrito</span>
              <span>{order.delivery.district}</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Avenida</span>
              <span>{order.delivery.direction}</span>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold">Productos comprados</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead className="text-right">Precio c/u</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={"order-item-" + item.product.id}>
                  <TableCell className="font-medium">
                    {item.product.name}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    S/.{displayPrice(item.product.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">
                  S/.{displayPrice(order.totalPrice)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      </main>
    </div>
  );
}
