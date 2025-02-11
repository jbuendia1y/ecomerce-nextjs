import CommonFooter from "@/app/(normal)/_components/CommonFooter";
import CommonNavbar from "@/app/(normal)/_components/CommonNavbar";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main>
      <CommonNavbar />
      <Card className="flex max-w-max mx-auto my-12 flex-col items-center lg:flex-row gap-6 rounded-lg">
        <ForgotPasswordForm />
        <Image
          src="/cat-forgot-password.jpg"
          alt="gato gris"
          width={430}
          height={540}
          className="hidden lg:block w-full h-full max-w-[430px] max-h-[540px]"
        />
      </Card>
      <CommonFooter />
    </main>
  );
}
