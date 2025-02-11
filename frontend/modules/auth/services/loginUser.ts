"use server";
import { StrapiLoginResponse } from "@/modules/core/interfaces";
import { queryStrapi } from "@/modules/core/strapi";

export const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<StrapiLoginResponse> => {
  const res = await queryStrapi("auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: payload.email,
      password: payload.password,
    }),
  });
  const data = await res.json();

  return data;
};
