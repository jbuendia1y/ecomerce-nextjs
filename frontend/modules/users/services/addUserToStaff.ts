"use server";

import { getCurrentAuthUser } from "@/modules/auth/services/getCurrentAuthUser";
import { AppUser } from "@/modules/users/interfaces";
import { UserRepository } from "@/modules/users/user.repository";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  role: z.enum(["deliveryman", "admin"]),
});

export const addUserToStaff = async (
  userEmail: string,
  role: AppUser["role"]
) => {
  const isAdmin = await getCurrentAuthUser().then(
    (res) => res.user?.role === "admin"
  );
  if (!isAdmin) return { error: new Error("Needs authentication") };

  const { data, success, error } = schema.safeParse({ email: userEmail, role });
  if (!success || error) return { error };

  const user = await UserRepository.findOneByEmail(data.email);
  if (!user) return { error: new Error(`Not found user with that email`) };

  await UserRepository.update(user.id, { role: data.role });
  return { error: null };
};
