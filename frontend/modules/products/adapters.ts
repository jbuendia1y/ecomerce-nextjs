import { z } from "zod";

const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.any().array(),
  image: z.object({
    name: z.string(),
    url: z.string(),
  }),
  price: z.number(),
  stock: z.number(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProductAddapted = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, ...dataProduct } = data;
  return productSchema.parse({ id: dataProduct.documentId, ...dataProduct });
};
