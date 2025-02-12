"use server";

import { authQueryStrapi } from "@/modules/core/strapi";

export const getOrders = async () => {
  const response = await authQueryStrapi("orders");
  const data = await response?.json();
  if (!data) return null;

  return data;
};
