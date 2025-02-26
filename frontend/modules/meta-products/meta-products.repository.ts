import { db } from "@/lib/db";
import { PopularProduct } from "./interfaces";
import { Paginate } from "../core/interfaces";
import { ObjectId, WithId, Long, SortDirection } from "mongodb";

interface DbPopularProduct {
  productId: ObjectId;
  visitCounter: Long;
  purcharseCounter: Long;
}
const collection =
  db.collection<Omit<DbPopularProduct, "id">>("popular_products");

const createPopularProductAddapted = (
  doc: WithId<Omit<DbPopularProduct, "id">>
): PopularProduct => {
  console.log(doc);
  return {
    productId: doc.productId.toHexString(),
    visitCounter: Number(doc.visitCounter),
    purcharseCounter: Number(doc.purcharseCounter),
  };
};

export const PopularProductsRepository = {
  async find(options: {
    page: number;
    limit: number;
    sort?: Partial<Record<keyof PopularProduct, SortDirection>>;
  }): Promise<Paginate<PopularProduct>> {
    const docs = await collection
      .find(
        {},
        {
          limit: options.limit,
          skip: (options.page - 1) * options.limit,
          sort: options.sort,
        }
      )
      .toArray();
    const totalDocs = await collection.countDocuments();

    return {
      data: docs.map((doc) => createPopularProductAddapted(doc)),
      meta: {
        pagination: {
          page: options.page,
          pageCount: Math.ceil(totalDocs / options.limit),
          pageSize: docs.length,
          total: totalDocs,
        },
      },
    };
  },
  async increseFieldValue(
    productId: string,
    field: "visitCounter" | "purcharseCounter"
  ) {
    await collection.updateOne(
      {
        productId: { $eq: ObjectId.createFromHexString(productId) },
      },
      { $inc: { [field]: Long.fromNumber(1) } },
      { upsert: true }
    );
  },
};
