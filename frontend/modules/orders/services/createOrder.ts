"use server";

import { strapiHost } from "@/modules/core/config";
import { CreateOrder } from "../interfaces";
import { auth } from "@/auth";

const createOrderItems = async (
  token: string,
  data: CreateOrder["items"]
): Promise<string[]> => {
  return await Promise.all(
    data.map(async (item) => {
      const response = await fetch(strapiHost + "/api/order-items", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          data: item,
        }),
      });

      const body = await response.json();

      return body.data.documentId;
    })
  );
};

export const createOrder = async (data: CreateOrder) => {
  const session = await auth();
  if (!session) return null;

  const orderItems = await createOrderItems(session.strapiToken, data.items);
  const res = await fetch(strapiHost + "/api/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + session.strapiToken,
    },
    body: JSON.stringify({
      data: {
        order_items: orderItems,
        client: data.client,
        totalProducts: data.totalProducts,
        totalPrice: data.totalPrice,
      },
    }),
  });
  return res;
};
