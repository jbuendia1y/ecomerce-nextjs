"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { SaveIcon } from "lucide-react";
import { ExposedAppUser } from "@/modules/users/interfaces";
import { updateStaffUser } from "@/modules/users/services/updateStaffUser";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  rol: z.enum(["deliveryman", "admin"]),
  password: z.string().min(4).optional(),
  confirmPassword: z.string().min(4).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function EditStaffUserForm(props: {
  defaultValues: ExposedAppUser;
}) {
  const { defaultValues } = props;
  const { register, handleSubmit, formState } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const { error } = await updateStaffUser(props.defaultValues.id, data);
    if (error) {
      toast({ title: error.name, description: error.message });
    } else {
      toast({
        title: "Usuario actualizado !",
        description: "Información del usuario del equipo ecomerce actualizado",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="name">Nombre</Label>
      <Input
        type="text"
        id="name"
        defaultValue={defaultValues.name}
        placeholder="Ingrese el nombre del usuario"
        {...register("name")}
      />
      <div className="my-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          type="text"
          id="email"
          defaultValue={defaultValues.email}
          placeholder="Ingrese la descripción del producto"
          {...register("email")}
        />
      </div>
      <div className="flex gap-2">
        <div>
          <Label htmlFor="password" className="inline-block">
            Contraseña
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="***********"
            required={false}
            {...register("password")}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="inline-block">
            Confirmar contraseña
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="***********"
            required={false}
            {...register("confirmPassword")}
          />
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={formState.isSubmitting}
        >
          Descartar
        </Button>
        <Button
          type="submit"
          disabled={!formState.isDirty || formState.isSubmitting}
        >
          <SaveIcon />
          Guardar
        </Button>
      </div>
    </form>
  );
}
