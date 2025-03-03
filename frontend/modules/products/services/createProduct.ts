"use server";
import { getCurrentAuthUser } from "@/modules/auth/services/getCurrentAuthUser";
import { CreateProduct } from "../interfaces";
import { ProductsRepository } from "../products.repository";

export const createProduct = async (data: CreateProduct) => {
  const isAdmin = await getCurrentAuthUser().then(
    (res) => res.user?.role === "admin"
  );
  if (!isAdmin) return { error: new Error("Needs authentication") };

  const exist = await ProductsRepository.findOneBySlug(data.slug);
  if (exist) return { error: new Error("Duplicate entry") };
  await ProductsRepository.create(data);
};
