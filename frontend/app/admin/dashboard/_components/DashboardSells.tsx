import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLastSells } from "../actions";
import { displayDate, displayPrice } from "@/lib/utils";

export default async function DashboardSells() {
  const orders = await getLastSells();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Ventas realizadas</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="[&>li]:flex [&>li]:justify-between [&>li]:items-center [&>li]:py-1">
          {orders.data.map((order) => {
            return (
              <li key={`dashboard-sells-paid-${order.id}`}>
                <span className="font-semibold">
                  S/.{displayPrice(order.totalPrice)}
                </span>
                <span className="text-slate-500">
                  {displayDate(order.createdAt)}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
