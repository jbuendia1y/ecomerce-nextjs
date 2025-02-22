"use client";
import { getMyProfile } from "@/modules/auth/services/getMyProfile";
import { AppUser } from "@/modules/users/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function RoleSideProtected(
  props: {
    role?: AppUser["role"];
    unAuthenticated?: PropsWithChildren["children"];
  } & PropsWithChildren
) {
  const { data } = useSession();
  const { data: user } = useQuery({
    queryKey: ["user-data-profile", data?.user?.id],
    queryFn: async () => {
      return data?.user?.id ? await getMyProfile(data.user.id) : null;
    },
    enabled: !!data?.user?.id,
  });
  if (!data && !props.role) return props.unAuthenticated ?? <></>;

  if (user?.role === props.role) return props.children;
  return <></>;
}
