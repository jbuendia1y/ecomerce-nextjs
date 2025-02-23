"use server";

import { connectOrderPayment } from "@/modules/orders/services/connectOrderPayment";
import { Payment } from "mercadopago";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const url = new URL(req.url);
  const queryId = url.searchParams.get("data.id");
  if (!queryId) {
    console.log("Missing paymentId [data.id] query param");
    return new NextResponse(null, { status: 200 });
  }

  const payment = await new Payment({
    accessToken: process.env.MP_ACCESS_TOKEN!,
  })
    .get({ id: queryId })
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!payment) {
    console.log("Payment not found ");
    return new Response(null, { status: 200 });
  }

  if (payment.status !== "approved") return new Response(null, { status: 200 });
  const orderId = payment.metadata.order_id;
  const paymentId = payment.id?.toString();
  if (!paymentId) {
    console.error("Payment doesn't have an payment.id property");
    return new NextResponse(null, { status: 200 });
  }

  await connectOrderPayment(orderId, paymentId);
  console.log("PAYMENT CALLBACK SUCCESS");
  return new NextResponse(null, { status: 200 });
};
