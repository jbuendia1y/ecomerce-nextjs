import { Card } from "@/components/ui/card";
import CommonFooter from "../_components/CommonFooter";
import CommonNavbar from "../_components/CommonNavbar";
import ProfileContactInfo from "./_components/ProfileContactInfo";

export default function ProfilePage() {
  return (
    <main>
      <CommonNavbar />
      <Card>
        <h1 className="text-2xl">Mi perfil</h1>
        <p>
          Ingresa tu correo registrado y enviaremos un link para que reinicies
          tu contraseña
        </p>
        <div>
          <ProfileContactInfo />
        </div>
      </Card>
      <CommonFooter />
    </main>
  );
}
