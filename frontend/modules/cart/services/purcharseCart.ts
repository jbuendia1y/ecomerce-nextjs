"use server";
import { auth } from "@/auth";
import { CartState } from "../cart.context";
import { createOrder } from "@/modules/orders/services/createOrder";
import { OrderState } from "@/modules/orders/interfaces";

export const purcharseCart = async (data: {
  cart: CartState;
  delivery: Record<"city" | "district" | "province" | "direction", string>;
}) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("Purcharse needs a logged user");

  await createOrder({
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

  // MAKE PURCHARSE LOGIC WITH PAYMENT;
};
