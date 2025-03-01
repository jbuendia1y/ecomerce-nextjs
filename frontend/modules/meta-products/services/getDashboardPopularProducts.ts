"use server";
import { ProductsRepository } from "@/modules/products/products.repository";
import { PopularProductsRepository } from "../meta-products.repository";

export const getDashboardPopularProducts = async (
  options: { limit: number } = { limit: 10 }
) => {
  const populars = await PopularProductsRepository.find({
    page: 1,
    limit: options.limit,
    sort: { purcharseCounter: "desc" },
  });

  const products = await Promise.all(
    populars.data.map(async (popular) => {
      const product = await ProductsRepository.findOne(popular.productId);
      if (!product) throw new Error("Wrong productId " + popular.productId);
      return { product, meta: popular };
    })
  );

  return products;
};
