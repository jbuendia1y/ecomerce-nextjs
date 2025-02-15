"use server";

import { auth } from "@/auth";
import { strapiHost } from "@/modules/core/config";
import { Paginate } from "@/modules/core/interfaces";
import { Order } from "../interfaces";
import { createOrderAddapted } from "../adapters";

export const getOrders = async (): Promise<Paginate<Order> | null> => {
  const session = await auth();
  if (!session) return null;
  const res = await fetch(strapiHost + "/api/orders", {
    headers: { Authorization: "Bearer " + session.strapiToken },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, meta }: Paginate<any> = await res.json();

  return { data: data.map((v) => createOrderAddapted(v)), meta };
};
