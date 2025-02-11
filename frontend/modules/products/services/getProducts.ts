"use server";
import { Paginate } from "@/modules/core/interfaces";
import { queryStrapi } from "@/modules/core/strapi";
import { Product } from "../interfaces";
import { decodeProduct } from "../adapters";
import { strapiHost } from "@/modules/core/config";

export const getProducts = async (
  options: { search: string | null; page: number; limit: number } = {
    search: null,
    page: 1,
    limit: 100,
  }
) => {
  const params = new URLSearchParams({
    "pagination[page]": `${options.page}`,
    "pagination[pageSize]": `${options.limit}`,
    "pagination[withCount]": "true",
    populate: "image",
  });
  if (options.search) params.set("filters[name][$containsi]", options.search);

  const res = await queryStrapi(`products?${params}`);
  const body: Paginate<Product> = await res.json();

  const data = body.data.map((v) => {
    return decodeProduct({
      ...v,
      image: { ...v.image, url: strapiHost + v.image.url },
    });
  });
  return { ...body, data };
};
