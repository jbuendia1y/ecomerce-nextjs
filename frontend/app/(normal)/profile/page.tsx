import { Card } from "@/components/ui/card";
import ProfileContactInfo from "./_components/ProfileContactInfo";

export default function ProfilePage() {
  return (
    <main>
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
    </main>
  );
}
