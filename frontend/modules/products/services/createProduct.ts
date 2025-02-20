import { CreateProduct } from "../interfaces";
import { ProductsRepository } from "../products.repository";

export const createProduct = async (data: CreateProduct) => {
  await ProductsRepository.create(data);
};
