"use server";
import { Product } from "../interfaces";
import { ProductsRepository } from "../products.repository";

type UpdateProduct = Omit<Omit<Omit<Product, "id">, "createdAt">, "updatedAt">;

export const updateProduct = async (productId: string, data: UpdateProduct) => {
  const res = await ProductsRepository.update(productId, data)
    .then(() => null)
    .catch((err) => ({ error: err }));
  return res;
};
