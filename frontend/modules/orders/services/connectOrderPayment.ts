"use server";

import { OrdersRepository } from "../orders.repository";

export const connectOrderPayment = async (
  orderId: string,
  paymentId: string
) => {
  await OrdersRepository.update(orderId, { paymentId });
};
