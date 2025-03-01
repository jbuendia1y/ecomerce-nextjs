"use server";

import { OrdersRepository } from "@/modules/orders/orders.repository";

export const getLastSells = async () => {
  const result = await OrdersRepository.find({
    page: 1,
    limit: 10,
    isPaid: true,
    sort: { createdAt: "desc" },
  });
  return result;
};
