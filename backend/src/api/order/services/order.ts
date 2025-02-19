/**
 * order service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::order.order", {
  async create(params) {
    if (!params.data.delivery) throw new Error("delivery object is required");
    if (
      !(params.data.delivery as Record<string, string>).city ||
      !(params.data.delivery as Record<string, string>).province ||
      !(params.data.delivery as Record<string, string>).district ||
      !(params.data.delivery as Record<string, string>).direction
    )
      throw new Error(
        "delivery needs city, district, province and direction properties"
      );
    return await super.create(params);
  },
});
