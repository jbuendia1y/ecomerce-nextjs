"use server";
import { queryStrapi } from "@/modules/core/strapi";

interface LoginAuthResponse {
  jwt: string;
  user: {
    id: string;
    username: string;
    email: string;
    confirmed: boolean;
  };
}

export const registerUser = async (payload: {
  username: string;
  email: string;
  password: string;
}): Promise<LoginAuthResponse> => {
  const res = await queryStrapi("auth/local/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: payload.username,
      email: payload.email,
      password: payload.password,
    }),
  });

  const data = await res.json();

  return data;
};
