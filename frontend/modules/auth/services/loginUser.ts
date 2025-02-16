"use server";
import { StrapiLoginResponse } from "@/modules/core/interfaces";
import { UserRepository } from "@/modules/users/user.repository";

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<StrapiLoginResponse> => {
  const exist = UserRepository.findOneByEmail(payload.email);

  return data;
};
