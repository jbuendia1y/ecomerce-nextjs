"use server";
import { AppUser } from "@/modules/users/interfaces";
import { UserRepository } from "@/modules/users/user.repository";
import bcrypt from "bcryptjs";

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<AppUser | null> => {
  const user = await UserRepository.findOneByEmail(payload.email);
  if (!user) return null;

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) return null;

  return user;
};
