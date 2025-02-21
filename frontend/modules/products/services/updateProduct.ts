"use server";
import { Product } from "../interfaces";
import { ProductsRepository } from "../products.repository";

type UpdateProduct = Omit<Product, "id">;

export const updateProduct = async (productId: string, data: UpdateProduct) => {
  const res = await ProductsRepository.update(productId, data)
    .then(() => ({}))
    .catch((err) => ({ error: err }));
  return res;
};
