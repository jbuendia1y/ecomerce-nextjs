"use server";
import { auth } from "@/lib/auth";
import { CartState } from "../cart.context";
import { createOrder } from "@/modules/orders/services/createOrder";
import { OrderState } from "@/modules/orders/interfaces";

import { createOrderPaymentURL } from "@/modules/orders/services/createPaymentURL";
import { redirect } from "next/navigation";

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
      product: {
        id: v.product.id,
        image: v.product.image,
        name: v.product.name,
        price: v.product.price,
      },
      quantity: v.quantity,
    })),
    totalPrice: data.cart.totalPrice,
    totalProducts: data.cart.totalProducts,
    delivery: data.delivery,
    status: OrderState.wait,
  });

  // Make purcharse logic with payment;
  if (!orderId) {
    return { error: new Error("Something was wrong in createOrder") };
  }

  const payload = await createOrderPaymentURL(orderId);
  if (!payload.error) {
    redirect(payload.urlToPay);
  } else return payload;
};
