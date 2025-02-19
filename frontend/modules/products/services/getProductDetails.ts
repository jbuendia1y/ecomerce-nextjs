"use server";
import { Product } from "../interfaces";
import { ProductsRepository } from "../products.repository";

export const getProductDetails = async (
  productId: string
): Promise<Product | null> => {
  return await ProductsRepository.findOne(productId);
};

export const getProductDetailsFromSlug = async (
  slug: string
): Promise<Product | null> => {
  return await ProductsRepository.findOneBySlug(slug);
};
