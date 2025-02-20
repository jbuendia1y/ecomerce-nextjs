"use server";
import { UserRepository } from "@/modules/users/user.repository";

export const getMyProfile = async (userId: string) => {
  const user = await UserRepository.findOneByEmail(userId);
  if (!user) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userData } = user;
  return userData;
};
