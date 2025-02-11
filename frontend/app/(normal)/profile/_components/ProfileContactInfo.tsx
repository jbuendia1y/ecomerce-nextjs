"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  name: z.string().nonempty(),
  phone: z.string().min(9).max(9),
});

type FormSchema = z.infer<typeof formSchema>;

export default function ProfileContactInfo() {
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Información de contacto</h2>
      <Label htmlFor="name">Nombre</Label>
      <Input
        type="text"
        id="name"
        placeholder="Ingrese su nombre completo"
        {...register("name")}
      />
      <Label htmlFor="phone">Teléfono</Label>
      <Input
        type="text"
        id="phone"
        placeholder="Ingrese su teléfono"
        {...register("phone")}
      />
      <div className="flex justify-end">
        <Button type="submit">Guardar cambios</Button>
      </div>
    </form>
  );
}
