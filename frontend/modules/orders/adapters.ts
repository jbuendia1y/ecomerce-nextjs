import { Order } from "./interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrderAddapted = (data: any): Order => {
  return {
    id: data.documentId,
    client: data.client,
    items: data.order_items,
    status: data.status,
    totalPrice: data.totalPrice,
    totalProducts: data.totalProducts,
  };
};
