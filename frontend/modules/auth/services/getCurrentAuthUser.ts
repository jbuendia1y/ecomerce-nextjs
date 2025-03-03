import { auth } from "@/lib/auth";
import { getUserProfile } from "@/modules/users/services/getUserProfile";

export const getCurrentAuthUser = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: new Error("Needs to be logged") };
  }

  const user = await getUserProfile(session.user.id);
  return { user, error: null };
};
