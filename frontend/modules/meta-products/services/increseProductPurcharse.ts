"use server";
import { PopularProductsRepository } from "../meta-products.repository";

export const increseProductPurcharse = async (productId: string) => {
  await PopularProductsRepository.increseFieldValue(
    productId,
    "purcharseCounter"
  );
};
