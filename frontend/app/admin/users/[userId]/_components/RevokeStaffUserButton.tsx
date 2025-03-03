"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { revokeStaffUserRole } from "@/modules/users/services/revokeStaffUserRole";
import { Trash2Icon } from "lucide-react";

export default function RevokeStaffUserButton(props: { userId: string }) {
  const handleClick = async () => {
    const { error } = await revokeStaffUserRole(props.userId);
    if (error) {
      toast({ title: error.name, description: error.message });
    } else {
      toast({
        title: "Permisos de usuario revocados",
        description: "Actualización existosa del rol del usuario",
      });
    }
  };

  return (
    <Button variant="destructive" onClick={handleClick}>
      <Trash2Icon /> Eliminar
    </Button>
  );
}
