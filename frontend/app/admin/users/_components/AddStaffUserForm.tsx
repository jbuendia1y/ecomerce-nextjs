"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addUserToStaff } from "@/modules/users/services/addUserToStaff";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  email: z.string().email(),
  rol: z.enum(["deliveryman", "admin"]),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AddStaffUserForm(props: { onClose: () => void }) {
  const { onClose } = props;
  const { register, handleSubmit, formState, setValue } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const { error } = await addUserToStaff(data.email, data.rol);
    if (error) toast({ title: error.name, description: error.message });
    else
      toast({
        title: "Actualizó correctamente!",
        description: "Se añadió un usuario a su equipo de ecomerce",
      });
  };

  const handleRoleValue = (value: string) => {
    if (value === "deliveryman" || value === "admin") setValue("rol", value);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Label>Correo electrónico</Label>
      <Input
        type="email"
        placeholder="example@example.com"
        {...register("email")}
      />
      <Select onValueChange={handleRoleValue}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Seleccione un rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="deliveryman">Delivery</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex justify-end items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onClose()}
          disabled={formState.isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={formState.isSubmitting}>
          Guardar
        </Button>
      </div>
    </form>
  );
}
