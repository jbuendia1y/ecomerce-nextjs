"use server";

import { auth } from "@/lib/auth";
import { getMyProfile } from "@/modules/auth/services/getMyProfile";
import { UserRepository } from "../user.repository";
import { UpdateAppUser } from "../interfaces";
import encryptPassword from "@/modules/core/services/encryptPassword";
import { z } from "zod";

const formSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4).optional(),
  confirmPassword: z.string().min(4).optional(),
});

export const updateStaffUser = async (userId: string, data: UpdateAppUser) => {
  const session = await auth();
  if (!session?.user?.id) return { error: new Error("Needs authentication") };

  const profile = await getMyProfile(session?.user.id);
  if (!profile) return { error: new Error("Needs authentication") };
  if (profile.role !== "admin")
    return { error: new Error("Needs authentication") };

  const {
    success,
    data: parsedData,
    error,
  } = formSchema.safeParse({ userId, ...data });

  if (!success || error) return { error };

  if (parsedData.password) {
    if (parsedData.password !== parsedData.confirmPassword) {
      return {
        error: new Error("Password and ConfirmPassword need to be the same"),
      };
    }

    data.password = await encryptPassword(parsedData.password);
  }
  const {
    userId: parsedUserId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    confirmPassword: _confirmPasword,
    ...dataToUpdate
  } = parsedData;

  await UserRepository.update(parsedUserId, dataToUpdate);
  return { error: null };
};
