/**
 * payment service
 */

import { factories } from "@strapi/strapi";
import { Payment, Preference } from "mercadopago";

export default factories.createCoreService("api::payment.payment", {
  async makePurcharse(orderId: string): Promise<string> {
    // const order = await strapi.query("api::order.order").findOne({
    //   where: { documentId: orderId },
    //   populate: ["order_items", "order_items.product", "client"],
    // });
    const order = {} as any;

    const mpAccessToken = process.env.MP_ACCESS_TOKEN;
    console.log({ order });
    console.log({ order_items: order.order_items });
    const preference = await new Preference({
      accessToken: mpAccessToken,
    }).create({
      body: {
        items: order.order_items.map((item) => ({
          id: item.documentId,
          title: item.product.name,
          currency_id: "PEN",
          unit_price: item.product.price,
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
    if (payment.status !== "approved") return;

    const orderId = payment.metadata["orderId"];
    const exist = await this.findOne(orderId, {});
    if (exist) return;

    await this.create({
      data: {
        order: orderId,
        transactionId: payment.id,
      },
    });
  },
});
