"use server";
import { CreateProduct } from "../interfaces";
import { ProductsRepository } from "../products.repository";

export const createProduct = async (data: CreateProduct) => {
  const exist = await ProductsRepository.findOneBySlug(data.slug);
  if (exist) return { error: new Error("Duplicate entry") };
  await ProductsRepository.create(data);
};
