"use server";
import { auth } from "@/auth";
import { OrderState } from "../interfaces";
import { getOrderDetails } from "./getOrderDetails";
import { strapiHost } from "@/modules/core/config";

export const updateOrderState = async (orderId: string, state: OrderState) => {
  const session = await auth();
  if (!session) return null;
  const order = await getOrderDetails(orderId);
  if (!order) return null;

  const res = await fetch(strapiHost + "/api/orders/" + orderId, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + session.strapiToken,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      order_items: order.items,
      totalPrice: order.totalPrice,
      totalProducts: order.totalProducts,
      client: order.client.id,
      state,
    }),
  });
  return res;
};
