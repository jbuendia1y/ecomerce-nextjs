import { auth } from "@/lib/auth";
import { updateStaffUser } from "./updateStaffUser";
import { getMyProfile } from "@/modules/auth/services/getMyProfile";

export const revokeStaffUserRole = async (userId: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: new Error("Unauthorizate") };
  }
  const isAdmin = await getMyProfile(session.user.id).then(
    (u) => u?.role === "admin"
  );
  if (!isAdmin) {
    return { error: new Error("Unauthorizate") };
  }

  if (typeof userId !== "string") {
    return { error: new Error("userId must be a string") };
  }

  await updateStaffUser(userId, { role: undefined });
  return { error: null };
};
