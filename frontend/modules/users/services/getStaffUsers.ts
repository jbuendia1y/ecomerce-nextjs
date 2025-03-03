"use server";

import { Paginate } from "@/modules/core/interfaces";
import { UserRepository } from "../user.repository";
import { ExposedAppUser } from "../interfaces";
import { createAppUserExposed } from "../adapters";

export const getStaffUsers = async (options: {
  page: number;
  limit: number;
}): Promise<Paginate<ExposedAppUser>> => {
  const response = await UserRepository.find({
    role: ["deliveryman", "admin"],
    page: options.page,
    limit: options.limit,
  });
  return {
    data: response.data.map((user) => createAppUserExposed(user)),
    meta: response.meta,
  };
};
