"use server";

import { OrdersRepository } from "@/modules/orders/orders.repository";
import { Payment } from "mercadopago";

export const POST = async (req: Request) => {
  const payload = await req.json();
  const payment = await new Payment({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  }).get({ id: payload.id });

  if (payment.status !== "approved") return new Response(null, { status: 200 });
  const orderId = payment.metadata.order_id;
  await OrdersRepository.update(orderId, { paymentId: payment.id?.toString() });
  console.log("PAYMENT CALLBACK SUCCESS");
};
