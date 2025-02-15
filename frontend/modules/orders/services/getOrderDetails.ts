"use server";

import { auth } from "@/auth";
import { strapiHost } from "@/modules/core/config";
import { Order } from "../interfaces";
import { createOrderAddapted } from "../adapters";

export const getOrderDetails = async (
  orderId: string
): Promise<Order | null> => {
  const session = await auth();
  if (!session) return null;
  const res = await fetch(strapiHost + "/api/orders/" + orderId, {
    headers: { Authorization: "Bearer " + session.strapiToken },
  });
  const { data }: { data: Order } = await res.json();

  return createOrderAddapted(data);
};
