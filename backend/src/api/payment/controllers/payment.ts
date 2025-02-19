/**
 * payment controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::payment.payment", {
  async makePurcharse(ctx) {
    const { orderId } = ctx.request.body;
    if (!orderId || typeof orderId !== "string")
      throw new Error("orderId string property is need in req.body");

    const urlToPay = await strapi
      .service("api::payment.payment")
      .makePurcharse(orderId);
    ctx.body = { urlToPay };
  },
  async webhookPayment(ctx) {
    const body = ctx.request.body as {
      action: "payment.updated";
      api_version: "v1";
      data: { id: string };
      date_created: string;
      id: string;
      live_mode: boolean;
      type: "payment";
      user_id: number;
    };
    console.log(body);
    await strapi.service("api::payment.payment").addPayment(body.data.id);

    ctx.status = 200;
  },
});
