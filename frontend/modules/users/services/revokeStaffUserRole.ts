"use server";
import { getCurrentAuthUser } from "@/modules/auth/services/getCurrentAuthUser";
import { updateStaffUser } from "./updateStaffUser";

export const revokeStaffUserRole = async (userId: string) => {
  const isAdmin = await getCurrentAuthUser().then(
    (res) => res.user?.role === "admin"
  );
  if (!isAdmin) return { error: new Error("Needs authentication") };

  if (typeof userId !== "string") {
    return { error: new Error("userId must be a string") };
  }

  await updateStaffUser(userId, { role: undefined });
  return { error: null };
};
