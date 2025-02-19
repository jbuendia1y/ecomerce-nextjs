"use server";
import { Paginate } from "@/modules/core/interfaces";
import { Product } from "../interfaces";
import { ProductsRepository } from "../products.repository";

export const getProducts = async (
  options: { search: string | null; page: number; limit: number } = {
    search: null,
    page: 1,
    limit: 100,
  }
): Promise<Paginate<Product>> => {
  const res = await ProductsRepository.find({
    search: options.search,
    limit: options.limit,
    page: options.page,
  });
  return res;
};
