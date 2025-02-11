import { AUTH_KEY_PROVIDE_USER_TOKEN } from "@/modules/auth/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyOrders() {
  const store = await cookies();
  const isAuth = store.get(AUTH_KEY_PROVIDE_USER_TOKEN);
  if (!isAuth) redirect("/login");
  return <></>;
}
