/**
 * order service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::order.order", {
  async create(data) {
    const order_items = data.data.order_items;
    console.log(order_items);
    const order_items_created = await strapi.db.entityManager.createMany(
      "api::order-items-items",
      {
        data: order_items,
        populate: ["product"],
      }
    );
    data.data.order_items = order_items_created.ids;
    const response = await super.create(data);
    return response;
  },
});
