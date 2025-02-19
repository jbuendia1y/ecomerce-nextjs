"use server";
import { queryStrapi } from "@/modules/core/strapi";
import { z } from "zod";

export const forgotPasswordAction = async (form: FormData) => {
  const email = await z.string().email().parseAsync(form.get("email"));
  const response = await queryStrapi("auth/forgot-password", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email }),
  });

  console.log(await response.json());
};
