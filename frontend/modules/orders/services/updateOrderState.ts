"use server";
import { auth } from "@/auth";
import { OrderState } from "../interfaces";
import { getOrderDetails } from "./getOrderDetails";
import { OrdersRepository } from "../orders.repository";

export const updateOrderState = async (orderId: string, state: OrderState) => {
  const session = await auth();
  if (!session) return null;
  const order = await getOrderDetails(orderId);
  if (!order) return null;

  await OrdersRepository.update(orderId, { status: state });
};
