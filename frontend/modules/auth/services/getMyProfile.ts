import { strapiHost } from "@/modules/core/config";
import { getServerSession } from "next-auth";

export const getMyProfile = async () => {
  const session = await getServerSession();
  if (!session) return null;
  console.log(session.strapiToken);
  const res = await fetch(strapiHost + "/api/users/me", {
    headers: { Authorization: "Bearer " + session.strapiToken },
  });
  return res;
};
