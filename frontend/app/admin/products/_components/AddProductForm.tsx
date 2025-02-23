"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProduct } from "@/modules/products/services/createProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import { toast } from "@/hooks/use-toast";
import { uploadImage } from "@/modules/core/services/uploadImage";
import type { UploadApiResponse } from "cloudinary";

const formSchema = z.object({
  slug: z.string().min(5),
  name: z.string(),
  description: z.string(),
  price: z.number().min(0).multipleOf(0.01),
  stock: z.number().min(0),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AddProductForm(props: { onClose: () => void }) {
  const { onClose } = props;
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { register, handleSubmit, watch, setValue, formState } =
    useForm<FormSchema>({
      resolver: zodResolver(formSchema),
    });

  const nameWatcher = watch("name");
  useEffect(() => {
    if (!nameWatcher || nameWatcher.length === 0) return;
    setValue(
      "slug",
      slugify(nameWatcher, { lower: true, trim: true, strict: true })
    );
  }, [nameWatcher, setValue]);

  const onSubmit = async (data: FormSchema) => {
    if (!imageFile) return;
    const fileForm = new FormData();
    fileForm.set("file", imageFile);
    const uploadedImageResponse = await uploadImage(fileForm);
    if (uploadedImageResponse.error) {
      return;
    }

    const successRes = uploadedImageResponse as UploadApiResponse;

    const res = await createProduct({
      image: successRes.secure_url,
      ...data,
      price: data.price * 100,
    });
    if (res?.error)
      toast({ title: res.error.name, description: res.error.message });
    else {
      toast({
        title: "Producto creado !",
        description: "Producto añadido al sistema correctamente",
      });
      onClose();
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        {imageFile && (
          <span className="block h-24 w-24 relative">
            <Image
              src={URL.createObjectURL(imageFile)}
              alt={nameWatcher}
              fill
            />
          </span>
        )}
        <label className="flex items-center justify-center w-full h-24 border-[1px] border-slate-400 rounded-sm cursor-pointer">
          Sube una imágen
          <input
            type="file"
            accept="jpg,jpeg,png,webp"
            name="image"
            hidden
            className="hidden"
            onChange={(e) => {
              e.preventDefault();
              const file = e.target.files?.item(0);
              if (!file) return;
              setImageFile(file);
            }}
          />
        </label>
      </div>
      <Label>Slug</Label>
      <Input
        type="text"
        placeholder="Ingrese el UID del producto"
        {...register("slug")}
      />
      <Label>Nombre</Label>
      <Input
        type="text"
        placeholder="Ingrese el nombre del producto"
        {...register("name")}
      />
      <Label>Descripción</Label>
      <Input
        type="text"
        placeholder="Ingrese la descripción del producto"
        {...register("description")}
      />
      <div className="flex gap-3">
        <div>
          <Label>Precio</Label>
          <Input
            type="number"
            min="0.00"
            step=".01"
            placeholder="Ingrese su precio"
            {...register("price", {
              setValueAs(value) {
                return parseFloat(value);
              },
            })}
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            min={0}
            placeholder="Ingrese su stock"
            {...register("stock", {
              setValueAs(value) {
                return parseInt(value);
              },
            })}
          />
        </div>
      </div>
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
