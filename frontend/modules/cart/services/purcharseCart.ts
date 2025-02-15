"use server";
import { auth } from "@/auth";
import { CartState } from "../cart.context";
import { createOrder } from "@/modules/orders/services/createOrder";
import { strapiHost } from "@/modules/core/config";

export const purcharseCart = async (data: {
  cart: CartState;
  delivery: Record<"city" | "district" | "province" | "direction", string>;
}) => {
  const session = await auth();
  if (!session || !session.user || !session.user.strapiUserId)
    throw new Error("Purcharse needs a logged user");

  const res = await createOrder({
    client: session.user.strapiUserId.toString(),
    items: data.cart.items.map((v) => ({
      product: v.product.id,
      quantity: v.quantity,
    })),
    totalPrice: data.cart.totalPrice,
    totalProducts: data.cart.totalProducts,
    delivery: data.delivery,
  });

  const { data: orderData } = await res?.json();
  console.log({ orderData });
  if (!res?.ok) return null;
  const purcharseRes = await fetch(strapiHost + "/api/purcharse", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + session.strapiToken,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      orderId: orderData.documentId,
    }),
  });
  const purcharseData = await purcharseRes.json();
  console.log({ purcharseData });
  return purcharseData;
};
