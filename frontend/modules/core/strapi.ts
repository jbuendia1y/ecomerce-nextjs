"use server";

import { getServerSession } from "next-auth";
import { strapiHost } from "./config";

const strapiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN!;

/**
 *
 * @param resource the reource not needs "/"
 * @param config can update fetch request but you cannot change the token
 */
export const queryStrapi = async (
  resource: string,
  config: RequestInit = {}
) => {
  const { headers, ...queryConfig } = config;
  const res = await fetch(strapiHost + "/api/" + resource, {
    headers: { ...headers, Authorization: "Bearer " + strapiToken },
    ...queryConfig,
  });
  return res;
};

/**
 *
 * @param resource the reource not needs "/"
 * @param config can update fetch request but you cannot change the token
 */
export const authQueryStrapi = async (
  resource: string,
  config: RequestInit = {}
) => {
  const session = await getServerSession();
  if (!session) return;
  console.log(session.provider, "SESSION");
  const { headers, ...queryConfig } = config;
  const res = await fetch(strapiHost + "/api/" + resource, {
    headers: { ...headers, Authorization: "Bearer " + session.strapiToken },
    ...queryConfig,
  });
  return res;
};
