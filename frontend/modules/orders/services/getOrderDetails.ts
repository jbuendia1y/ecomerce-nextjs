"use server";

import { auth } from "@/auth";
import { Order } from "../interfaces";
import { OrdersRepository } from "../orders.repository";

export const getOrderDetails = async (
  orderId: string
): Promise<Order | null> => {
  const session = await auth();
  if (!session) return null;
  return await OrdersRepository.findOne(orderId);
};
