import { db } from "@/lib/db";
import { CreateOrder, Order } from "./interfaces";
import { Filter, ObjectId, WithId } from "mongodb";

const collection = db.collection<Omit<Order, "id">>("products");

const createOrderAddapted = (doc: WithId<Omit<Order, "id">>): Order => {
  return {
    id: doc._id.toHexString(),
    items: doc.items,
    clientId: doc.clientId,
    status: doc.status,
    totalPrice: doc.totalPrice,
    totalProducts: doc.totalProducts,
    delivery: doc.delivery,

    createdAt: doc.createdAt,
  };
};

export const OrdersRepository = {
  async find(options: { page: number; limit: number; clientId?: string }) {
    let filter: Filter<Omit<Order, "id">> = {};
    if (options.clientId) filter = { clientId: { $eq: options.clientId } };

    const query = collection.find(filter, {
      limit: options.limit,
      skip: (options.page - 1) * options.limit,
    });
    const totalDocs = await collection.countDocuments(filter);
    const docs = await query.toArray();

    return {
      data: docs.map((v) => createOrderAddapted(v)),
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
  async findOne(id: string) {
    const doc = await collection.findOne({
      _id: { $eq: ObjectId.createFromBase64(id) },
    });
    return doc ? createOrderAddapted(doc) : null;
  },
  async create(data: CreateOrder) {
    await collection.insertOne({
      clientId: data.clientId,
      createdAt: data.createdAt,
      items: data.items,
      status: data.status,
      totalPrice: data.totalPrice,
      totalProducts: data.totalProducts,
      delivery: data.delivery,
    });
  },
  async update(
    id: string,
    data: Partial<Omit<Omit<Order, "id">, "createdAt">>
  ) {
    await collection.updateOne(
      { _id: ObjectId.createFromBase64(id) },
      { $set: { ...data } }
    );
  },
};
