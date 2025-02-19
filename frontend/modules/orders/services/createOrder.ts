"use server";

import { CreateOrder, OrderState } from "../interfaces";
import { auth } from "@/auth";
import { OrdersRepository } from "../orders.repository";

export const createOrder = async (data: CreateOrder) => {
  const session = await auth();
  if (!session) return null;
  if (!session.user?.id) return null;

  return await OrdersRepository.create({
    totalPrice: data.totalPrice,
    totalProducts: data.totalProducts,
    items: data.items,
    status: data.status ?? OrderState.wait,
    clientId: session.user.id,
    createdAt: data.createdAt,
    delivery: data.delivery,
  });
};
