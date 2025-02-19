/**
 * payment service
 */

import { factories } from "@strapi/strapi";
import { Payment, Preference } from "mercadopago";

export default factories.createCoreService("api::payment.payment", {
  async makePurcharse(orderId: string): Promise<string> {
    const order = await strapi.query("api::order.order").findOne({
      where: { documentId: orderId },
      populate: ["order_items", "order_items.product", "client"],
    });

    const mpAccessToken = process.env.MP_ACCESS_TOKEN;

    const preference = await new Preference({
      accessToken: mpAccessToken,
    }).create({
      body: {
        items: order.order_items.map((item) => ({
          id: item.documentId,
          title: item.product.name,
          currency_id: "PEN",
          unit_price: item.product.price / 100,
          quantity: item.quantity,
        })),
        metadata: {
          orderId: order.documentId,
          clientId: order.client.documentId,
        },
      },
    });

    const urlToPay = preference.init_point as string;
    return urlToPay;
  },

  async addPayment(paymentId: string) {
    const mpAccessToken = process.env.MP_ACCESS_TOKEN;
    const payment = await new Payment({ accessToken: mpAccessToken }).get({
      id: paymentId,
    });
    console.log(payment);
    if (payment.status !== "approved") return;

    const orderId = payment.metadata["order_id"];
    const exist = await this.find({ filters: { order: orderId } });
    console.log({ exist, orderId });
    if (exist?.results?.length > 0) return;
    console.log("CREATING PAYMENT");
    try {
      await strapi.service("api::payment.payment").create({
        data: {
          order: orderId,
          transactionId: payment.id.toString(),
        },
      });
    } catch (err) {
      console.error("ON CREATE PAYMENT ERROR", err);
    }
    console.log("PAYMENT CREATED");
  },
});
