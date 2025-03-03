import { db } from "@/lib/db";
import { Paginate } from "../core/interfaces";
import { AppUser, CreateAppUser, UpdateAppUser } from "./interfaces";
import { ObjectId, WithId } from "mongodb";

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
    role?: AppUser["role"] | Array<AppUser["role"]>;
  }): Promise<Paginate<AppUser>> {
    const query = collection.find({ role: options.role });
    const totalDocs = await collection.countDocuments(
      {
        role: Array.isArray(options.role)
          ? {
              $in: options.role,
            }
          : options.role,
      },
      { skip: (options.page - 1) * options.limit }
    );
    const docs = await query.toArray();
    return {
      data: docs.map((doc) => createAppUserAddapted(doc)),
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
  async findOne(userId: string) {
    const user = await collection.findOne({
      _id: { $eq: ObjectId.createFromHexString(userId) },
    });
    return user ? createAppUserAddapted(user) : null;
  },
  async findOneByEmail(email: string) {
    const user = await collection.findOne({ email: { $eq: email } });
    return user ? createAppUserAddapted(user) : null;
  },
  /**
   * This method has been called when user wants to create an account with him email
   * @param data
   */
  async create(data: CreateAppUser) {
    await collection.insertOne({
      name: data.name,
      email: data.email,
      password: data.password,
      image: null,
      emailVerified: false,
    });
  },
  async update(id: string, data: UpdateAppUser) {
    await collection.updateOne(
      { _id: { $eq: ObjectId.createFromHexString(id) } },
      { $set: data }
    );
  },
};
