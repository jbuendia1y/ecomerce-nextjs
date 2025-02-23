"use server";

import { auth } from "@/lib/auth";
import { Paginate } from "@/modules/core/interfaces";
import { Order, OrderState } from "../interfaces";
import { OrdersRepository } from "../orders.repository";

export const getOrders = async (options: {
  orderState?: OrderState;
  page: number;
  limit: number;
}): Promise<Paginate<Order> | null> => {
  const session = await auth();
  if (!session) return null;
  return await OrdersRepository.find({
    orderState: options.orderState,
    page: options.page,
    limit: options.limit,
  });
};
