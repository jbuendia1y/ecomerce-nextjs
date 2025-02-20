"use server";
import { auth } from "@/lib/auth";
import { CartState } from "../cart.context";
import { createOrder } from "@/modules/orders/services/createOrder";
import { OrderState } from "@/modules/orders/interfaces";

import { Preference } from "mercadopago";

export const purcharseCart = async (data: {
  cart: CartState;
  delivery: Record<"city" | "district" | "province" | "direction", string>;
}) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("Purcharse needs a logged user");

  const orderId = await createOrder({
    clientId: session.user.id,
    createdAt: new Date().toUTCString(),
    items: data.cart.items.map((v) => ({
      productId: v.product.id,
      quantity: v.quantity,
    })),
    totalPrice: data.cart.totalPrice,
    totalProducts: data.cart.totalProducts,
    delivery: data.delivery,
    status: OrderState.wait,
  });

  // Make purcharse logic with payment;
  const preference = await new Preference({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  }).create({
    body: {
      items: data.cart.items.map((item) => ({
        id: item.product.id,
        title: item.product.name,
        unit_price: item.product.price / 100,
        quantity: item.quantity,
        picture_url: item.product.image,
      })),
      metadata: { order_id: orderId, client_id: session.user.id },
    },
  });

  const urlToPay = preference.init_point;
  return { urlToPay };
};
