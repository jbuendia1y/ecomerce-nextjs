"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { registerUser } from "@/modules/auth/services/registerUser";
import GoogleIcon from "@/modules/core/icons/GoogleIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  name: z.string().min(4).max(30).trim(),
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const { register, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <CardContent className="w-full max-w-[400px] py-12 lg:py-0">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Empieza una nueva historia</h1>
        <p className="text-base text-slate-400 max-w-[340px] mx-auto">
          Cree una cuenta para tener acceso a las compras y pedidos
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label
            htmlFor="name"
            className={cn({
              "text-red-500": !!formState.errors.name,
            })}
          >
            Nombre
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Ingrese su nombre"
            {...register("name")}
          />
        </div>
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
        <div className="my-3.5">
          <Label
            htmlFor="password"
            className={cn({
              "text-red-500": !!formState.errors.password,
            })}
          >
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            maxLength={12}
            {...register("password")}
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
              Creando cuenta
            </>
          ) : (
            <>Registrarse</>
          )}
        </Button>
      </form>

      <p className='flex items-center gap-4 mt-2 before:content-[""] before:block before:w-full before:h-[1px] before:bg-slate-300 after:content-[""] after:block after:w-full after:h-[1px] after:bg-slate-300'>
        o
      </p>

      <Button
        size="lg"
        variant="outline"
        className="w-full my-2"
        disabled={formState.isSubmitting}
      >
        <GoogleIcon /> Continua con Google
      </Button>

      <p className="text-sm text-center mt-2">
        Ya tienes una cuenta ?{" "}
        <Link href="/login" className="underline">
          Accede ahora!
        </Link>
      </p>
    </CardContent>
  );
}
