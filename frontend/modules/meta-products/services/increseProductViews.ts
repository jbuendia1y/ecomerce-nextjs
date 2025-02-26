"use server";

import { cookies } from "next/headers";
import { PopularProductsRepository } from "../meta-products.repository";

export const increseProductViews = async (productId: string) => {
  "use server";
  const cookieHandler = await cookies();

  const visitedProducts =
    cookieHandler.get("PRODUCTS_VIEWED")?.value.split(",") ?? [];

  if (visitedProducts.includes(productId)) return;
  else {
    cookieHandler.set(
      "PRODUCTS_VIEWED",
      visitedProducts.concat(productId).join(",")
    );
  }

  await PopularProductsRepository.increseFieldValue(productId, "visitCounter");
};
