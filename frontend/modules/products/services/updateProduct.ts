"use server";
import { getCurrentAuthUser } from "@/modules/auth/services/getCurrentAuthUser";
import { Product } from "../interfaces";
import { ProductsRepository } from "../products.repository";

type UpdateProduct = Omit<Omit<Omit<Product, "id">, "createdAt">, "updatedAt">;

export const updateProduct = async (productId: string, data: UpdateProduct) => {
  const isAdmin = await getCurrentAuthUser().then(
    (res) => res.user?.role === "admin"
  );
  if (!isAdmin) return { error: new Error("Needs authentication") };

  const res = await ProductsRepository.update(productId, data)
    .then(() => null)
    .catch((err) => ({ error: err }));
  return res;
};
