"use server";

import { strapiHost } from "@/modules/core/config";
import { CreateOrder } from "../interfaces";
import { auth } from "@/auth";

export const createOrder = async (data: CreateOrder) => {
  const session = await auth();
  if (!session) return null;
  console.log({
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + session.strapiToken,
    },
    body: JSON.stringify({
      data: {
        order_items: data.items.map((v) => ({
          product: { set: v.product },
          quantity: v.quantity,
        })),
        client: data.client,
        totalProducts: data.totalProducts,
        totalPrice: data.totalPrice,
      },
    }),
  });
  const res = await fetch(strapiHost + "/api/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + session.strapiToken,
    },
    body: JSON.stringify({
      data: {
        order_items: data.items.map((v) => ({
          product: { set: v.product },
          quantity: v.quantity,
        })),
        client: data.client,
        totalProducts: data.totalProducts,
        totalPrice: data.totalPrice,
      },
    }),
  });
  return res;
};
