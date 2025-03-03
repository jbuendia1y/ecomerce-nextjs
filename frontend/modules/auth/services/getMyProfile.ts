"use server";
import { createAppUserExposed } from "@/modules/users/adapters";
import { UserRepository } from "@/modules/users/user.repository";

export const getMyProfile = async (userId: string) => {
  const user = await UserRepository.findOne(userId);
  if (!user) return null;
  const userData = createAppUserExposed(user);
  return userData;
};
