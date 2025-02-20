"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import GoogleIcon from "@/modules/core/icons/GoogleIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response && !response?.ok) {
      toast({
        title: "Algo salió mal",
        description: "Intentelo dentro de un rato",
      });
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <CardContent className="w-full max-w-[400px] py-12 lg:py-0">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Bienvenido de vuelta!</h1>
        <p className="text-base text-slate-400 max-w-[340px] mx-auto">
          Accede a tu cuenta para tener acceso a las compras y pedidos
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
        <div className="my-3.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className={cn({
                "text-red-500": !!formState.errors.password,
              })}
            >
              Contraseña
            </Label>
            <Link href="/forgot-password" className="text-sm">
              Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
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
              Iniciando sessión
            </>
          ) : (
            <>Iniciar sessión</>
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
        onClick={handleGoogleLogin}
      >
        <GoogleIcon /> Continua con Google
      </Button>

      <p className="text-sm text-center mt-2">
        No tienes una cuenta ?{" "}
        <Link href="/register" className="underline">
          Registrate gratis!
        </Link>
      </p>
    </CardContent>
  );
}
