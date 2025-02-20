"use server";
import bcrypt from "bcryptjs";
import { UserRepository } from "@/modules/users/user.repository";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  const exist = await UserRepository.findOneByEmail(payload.email);
  if (exist) throw new Error("User is already taken");

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(payload.password, salt);

  await UserRepository.create({
    name: payload.name,
    email: payload.email,
    password,
  });
};
