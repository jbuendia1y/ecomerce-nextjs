import { db } from "@/lib/db";
import { Paginate } from "../core/interfaces";
import { AppUser, CreateAppUser } from "./interfaces";
import { WithId } from "mongodb";

const collection = db.collection<Omit<AppUser, "id">>("users");

const createAppUserAddapted = (doc: WithId<Omit<AppUser, "id">>): AppUser => {
  return {
    id: doc._id.toHexString(),
    email: doc.email,
    name: doc.name,
    password: doc.password,
    image: doc.image,
    emailVerified: doc.emailVerified,
    role: doc.role,
  };
};

export const UserRepository = {
  async find(options: {
    page: number;
    limit: number;
  }): Promise<Paginate<AppUser>> {
    const query = collection.find();
    const totalDocs = await collection.countDocuments(
      {},
      { skip: (options.page - 1) * options.limit }
    );
    const docs = await query.toArray();
    return {
      data: docs.map((doc) => createAppUserAddapted(doc)),
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
    const user = await collection.findOne({
      id: { $eq: userId },
    });
    return user ? createAppUserAddapted(user) : null;
  },
  async findOneByEmail(email: string) {
    const user = await collection.findOne({ email: { $eq: email } });
    return user ? createAppUserAddapted(user) : null;
  },
  async create(data: CreateAppUser) {
    await collection.insertOne({
      name: data.name,
      email: data.email,
      password: data.password,
      image: null,
      emailVerified: false,
    });
  },
};
