"use server";

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
