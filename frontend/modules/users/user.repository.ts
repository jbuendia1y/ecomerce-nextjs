import { db } from "@/lib/db";
import { User } from "next-auth";
import { Paginate } from "../core/interfaces";

const collection = db.collection<User>("users");

export const UserRepository = {
  async find(options: {
    page: number;
    limit: number;
  }): Promise<Paginate<User>> {
    const query = collection.find();
    const totalDocs = await collection.countDocuments(
      {},
      { skip: (options.page - 1) * options.limit }
    );
    const docs = await query.toArray();
    return {
      data: docs,
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
  async findOne(userId: string) {
    await collection.findOne({
      id: { $eq: userId },
    });
  },
  async findOneByEmail(email: string) {
    const user = await collection.findOne({ email: { $eq: email } });
    return user;
  },
};
