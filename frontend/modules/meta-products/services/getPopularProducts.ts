"use server";

import { ProductsRepository } from "@/modules/products/products.repository";
import { PopularProductsRepository } from "../meta-products.repository";

export const getPopularProducts = async () => {
  const populars = await PopularProductsRepository.find({
    page: 1,
    limit: 10,
    sort: { purcharseCounter: "desc" },
  });

  const products = await Promise.all(
    populars.data.map(async (popular) => {
      const product = await ProductsRepository.findOne(popular.productId);
      if (!product) throw new Error("Wrong productId " + popular.productId);
      return product;
    })
  );

  return products;
};
