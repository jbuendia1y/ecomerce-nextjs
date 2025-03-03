"use server";
import { UserRepository } from "@/modules/users/user.repository";
import encryptPassword from "@/modules/core/services/encryptPassword";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  const exist = await UserRepository.findOneByEmail(payload.email);
  if (exist) throw new Error("User is already taken");

  const password = await encryptPassword(payload.password);

  await UserRepository.create({
    name: payload.name,
    email: payload.email,
    password,
  });
};
