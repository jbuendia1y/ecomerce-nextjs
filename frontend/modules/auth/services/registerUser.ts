"use server";
import { toast } from "@/hooks/use-toast";
import { StrapiError } from "@/modules/core/interfaces";
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
      name: payload.username,
      username: payload.username,
      email: payload.email,
      password: payload.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const { error } = data as StrapiError;
    toast({
      title: error.name,
      description: error.message,
    });
  }
  return data;
};
