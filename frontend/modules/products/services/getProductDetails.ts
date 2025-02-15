"use server";
import { queryStrapi } from "@/modules/core/strapi";
import { Product } from "../interfaces";
import { createProductAddapted } from "../adapters";
import { Paginate } from "@/modules/core/interfaces";
import { strapiHost } from "@/modules/core/config";

export const getProductDetails = async (
  productId: string
): Promise<Product> => {
  const res = await queryStrapi("products/" + productId);
  const body = await res.json();
  return createProductAddapted(body.data);
};

export const getProductDetailsFromSlug = async (
  slug: string
): Promise<Product | null> => {
  const qParams = new URLSearchParams({
    "filters[slug][$eq]": slug,
    populate: "image",
  });
  const res = await queryStrapi("products?" + qParams);
  const body: Paginate<Product> = await res.json();

  const firstDoc = body.data[0];
  if (!firstDoc) return null;

  const product = createProductAddapted(firstDoc);

  return {
    ...product,
    image: { ...product.image, url: strapiHost + product.image.url },
  };
};
