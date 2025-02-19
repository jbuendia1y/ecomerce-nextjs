"use server";
import { queryStrapi } from "@/modules/core/strapi";
import { z } from "zod";

export const resetPasswordAction = async (form: FormData) => {
  const code = await z.string().parseAsync(form.get("code"));
  const password = await z.string().parseAsync(form.get("password"));
  const passwordConfirmation = await z
    .string()
    .parseAsync(form.get("passwordConfirmation"));

  const response = await queryStrapi("auth/reset-password", {
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ code, password, passwordConfirmation }),
  });

  console.log(await response.json());
};
