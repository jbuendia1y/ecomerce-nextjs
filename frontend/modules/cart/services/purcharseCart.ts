"use server";
import { queryStrapi } from "@/modules/core/strapi";
import { CartState } from "../cart.context";

export const purcharseCart = async (data: {
  cart: CartState;
  userId: string;
}) => {
  const res = await queryStrapi("orders", {
    method: "POST",
    body: JSON.stringify({
      order_items: data.cart.items.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      })),
      totalProducts: data.cart.totalProducts,
      totalPrice: data.cart.totalPrice,
      client: data.userId,
    }),
  });

  return await res.json();
};
