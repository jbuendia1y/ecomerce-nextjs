"use server";
import { Preference } from "mercadopago";
import { getOrderDetails } from "./getOrderDetails";

export const createOrderPaymentURL = async (orderId: string) => {
  const order = await getOrderDetails(orderId);
  if (!order) return { error: new Error("Wrong orderId value") };

  const mpAccessToken = process.env.MP_ACCESS_TOKEN!;
  const preference = await new Preference({
    accessToken: mpAccessToken,
  }).create({
    body: {
      items: order.items.map((item) => ({
        id: orderId + "-" + item.product.id,
        title: item.product.name,
        currency_id: "PEN",
        unit_price: item.product.price,
        quantity: item.quantity,
      })),
      metadata: {
        order_id: order.id,
        client_id: order.clientId,
      },
    },
  });

  const urlToPay = preference.init_point as string;
  return { urlToPay };
};
