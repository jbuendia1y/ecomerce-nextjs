import { OrdersRepository } from "../orders.repository";

/**
 * Needs to be used into a route callback for payments
 * @param orderId
 * @param paymentId
 */
export const connectOrderPayment = async (
  orderId: string,
  paymentId: string
) => {
  await OrdersRepository.update(orderId, { paymentId });
};
