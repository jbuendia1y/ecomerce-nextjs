"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordAction } from "../action";

const ForgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordFormSchema>;

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState } = useForm<ForgotPasswordFormData>(
    {
      resolver: zodResolver(ForgotPasswordFormSchema),
    }
  );

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const formData = new FormData();
    formData.set("email", data.email);
    await forgotPasswordAction(formData);
  };

  return (
    <CardContent className="w-full max-w-[400px] py-12 lg:py-0">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">¿Olvidaste tu contraseña?</h1>
        <p className="text-base text-slate-400 max-w-[340px] mx-auto">
          Ingresa tu correo registrado y enviaremos un link para que reinicies
          tu contraseña
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label
            htmlFor="email"
            className={cn({
              "text-red-500": !!formState.errors.email,
            })}
          >
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            {...register("email")}
          />
        </div>
        <Button
          size="lg"
          className="w-full mt-3 mb-2"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Enviando link
            </>
          ) : (
            <>Enviar link</>
          )}
        </Button>
      </form>

      <p className="text-sm text-center mt-2">
        Recordaste tu contraseña ?{" "}
        <Link href="/login" className="underline">
          Ingresa ahora!
        </Link>
      </p>
    </CardContent>
  );
}
