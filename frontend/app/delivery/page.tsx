import { getOrders } from "@/modules/orders/services/getOrders";

export default async function DeliveryHome() {
  const orders = await getOrders();
  console.log(orders);
  return <div>orders</div>;
}
