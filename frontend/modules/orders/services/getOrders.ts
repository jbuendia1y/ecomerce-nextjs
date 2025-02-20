"use server";

import { auth } from "@/lib/auth";
import { Paginate } from "@/modules/core/interfaces";
import { Order } from "../interfaces";
import { OrdersRepository } from "../orders.repository";

export const getOrders = async (): Promise<Paginate<Order> | null> => {
  const session = await auth();
  if (!session) return null;
  return await OrdersRepository.find({
    page: 1,
    limit: 10,
  });
};
