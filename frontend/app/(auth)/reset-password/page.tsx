import CommonFooter from "@/app/(normal)/_components/CommonFooter";
import CommonNavbar from "@/app/(normal)/_components/CommonNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { resetPasswordAction } from "./action";

export default function ResetPasswordPage(props: {
  searchParams: { code: string };
}) {
  return (
    <main>
      <CommonNavbar />
      {props.searchParams.code ? (
        <form className="min-h-48" action={resetPasswordAction}>
          <h1>Reinicio de contraseña</h1>
          <p>Ingrese su nueva contraseña para reiniciar su contraseña actual</p>
          <Label>Contraseña</Label>
          <Input
            type="password"
            name="password"
            placeholder="******"
            required
          />
          <Label>Confirmar contraseña</Label>
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="******"
            required
          />

          <Button type="submit" size="lg" className="w-full">
            Reiniciar contraseña
          </Button>
        </form>
      ) : (
        <h1>Debe ingresar con el código enviado a su correo electrónico</h1>
      )}

      <CommonFooter />
    </main>
  );
}
