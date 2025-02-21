import { db } from "@/lib/db";
import { CreateProduct, Product } from "./interfaces";
import { BSON, Filter, WithId } from "mongodb";
import { Paginate } from "../core/interfaces";

const collection = db.collection<Omit<Product, "id">>("products");

const createProductAdapted = (doc: WithId<Omit<Product, "id">>): Product => {
  return {
    id: doc._id.toHexString(),
    image: doc.image,
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    price: doc.price,
    stock: doc.stock,

    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

export const ProductsRepository = {
  async find(options: {
    search: string | null;
    page: number;
    limit: number;
  }): Promise<Paginate<Product>> {
    let filter: Filter<Omit<Product, "id">> = {};
    if (options.search) {
      filter = {
        $text: { $search: options.search },
      };
    }

    const query = collection.find(filter, {
      limit: options.limit,
      skip: (options.page - 1) * options.limit,
    });
    const totalDocs = await collection.countDocuments(filter);
    const docs = await query.toArray();

    return {
      data: docs.map((v) => createProductAdapted(v)),
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
    return createProductAdapted(doc);
  },
  async findOneBySlug(slug: string): Promise<Product | null> {
    const product = await collection.findOne({
      slug: { $eq: slug },
    });
    if (!product) return null;
    return createProductAdapted(product);
  },
  async create(data: CreateProduct) {
    await collection.insertOne({
      slug: data.slug,
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      stock: data.stock,

      createdAt: new Date(),
      updatedAt: new Date(),
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
        $currentDate: { updatedAt: true },
      }
    );
  },
  async initialize() {
    await collection.createIndex({ slug: 1 });
  },
};
