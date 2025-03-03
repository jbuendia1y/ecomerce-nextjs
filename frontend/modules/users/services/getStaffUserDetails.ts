"use server";

import { UserRepository } from "../user.repository";
import { ExposedAppUser } from "../interfaces";
import { createAppUserExposed } from "../adapters";

export const getStaffUserDetails = async (
  userId: string
): Promise<ExposedAppUser | null> => {
  const response = await UserRepository.findOne(userId);
  if (!response) return null;
  if (response.role !== "deliveryman") return null;

  return createAppUserExposed(response);
};
