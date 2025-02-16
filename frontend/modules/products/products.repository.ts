import { db } from "@/lib/db";
import { CreateProduct, Product } from "./interfaces";
import { BSON, WithId } from "mongodb";
import { Paginate } from "../core/interfaces";

const collection = db.collection<Omit<Product, "id">>("products");

const createAdaptedProduct = (doc: WithId<Omit<Product, "id">>): Product => {
  return {
    id: doc._id.toHexString(),
    image: doc.image,
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    price: doc.price,
    stock: doc.stock,
  };
};

export const ProductsRepository = {
  async find(options: {
    search: string;
    page: number;
    limit: number;
  }): Promise<Paginate<Product>> {
    const query = collection.find(
      { $text: { $search: options.search } },
      { limit: options.limit, skip: (options.page - 1) * options.limit }
    );
    const totalDocs = await collection.countDocuments({
      $text: { $search: options.search },
    });
    const docs = await query.toArray();

    return {
      data: docs.map((v) => createAdaptedProduct(v)),
      meta: {
        pagination: {
          page: options.page,
          pageCount: Math.floor(totalDocs / options.limit),
          pageSize: docs.length,
          total: totalDocs,
        },
      },
    };
  },
  async findOne(productId: string): Promise<Product | null> {
    const doc = await collection.findOne({
      _id: { $eq: BSON.ObjectId.createFromHexString(productId) },
    });
    if (!doc) return null;
    return createAdaptedProduct(doc);
  },
  async findOneBySlug(slug: string): Promise<Product | null> {
    const product = await collection.findOne({
      slug: { $eq: slug },
    });
    if (!product) return null;
    return createAdaptedProduct(product);
  },
  async create(data: CreateProduct) {
    await collection.insertOne({
      slug: data.slug,
      name: data.name,
      description: data.descriptiton,
      image: data.image,
      price: data.price,
      stock: data.stock,
    });
  },
  async update(productId: string, data: Partial<Omit<Product, "id">>) {
    await collection.updateOne(
      {
        _id: { $eq: BSON.ObjectId.createFromHexString(productId) },
      },
      {
        $set: {
          ...data,
        },
      }
    );
  },
};
