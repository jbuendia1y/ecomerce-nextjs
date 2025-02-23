"use client";
import { Input } from "@/components/ui/input";
import { Product } from "@/modules/products/interfaces";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProduct } from "@/modules/products/services/updateProduct";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { displayPrice } from "@/lib/utils";
import { SaveIcon } from "lucide-react";
import { uploadImage } from "@/modules/core/services/uploadImage";
import { UploadApiResponse } from "cloudinary";

const formSchema = z.object({
  slug: z.string().min(5),
  name: z.string(),
  description: z.string(),
  price: z.number().min(0).multipleOf(0.01),
  stock: z.number().min(0),
});

type FormSchema = z.infer<typeof formSchema>;

export default function EditProductForm(props: { defaultValues: Product }) {
  const { defaultValues } = props;
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
    let newImage = props.defaultValues.image;
    if (imageFile) {
      const fileForm = new FormData();
      fileForm.set("file", imageFile);
      const uploadedImageResponse = await uploadImage(fileForm);
      if (uploadedImageResponse.error) {
        return;
      } else {
        newImage = (uploadedImageResponse as UploadApiResponse).secure_url;
      }
    }

    const res = await updateProduct(props.defaultValues.id, {
      image: newImage,
      ...data,
      price: data.price * 100,
    });
    if (res?.error)
      toast({ title: res.error.name, description: res.error.message });
    else {
      toast({
        title: "Producto guardado !",
        description: "Producto actualizado en el sistema correctamente",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        {(imageFile || defaultValues.image) && (
          <span className="block h-24 w-24 relative">
            <Image
              src={
                imageFile ? URL.createObjectURL(imageFile) : defaultValues.image
              }
              alt={(nameWatcher?.length ?? 0) === 0 ? "Product" : nameWatcher}
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
      <Label htmlFor="slug">Slug</Label>
      <Input
        type="text"
        id="slug"
        defaultValue={defaultValues.slug}
        placeholder="Ingrese el UID del producto"
        {...register("slug")}
      />
      <Label htmlFor="name">Nombre</Label>
      <Input
        type="text"
        id="name"
        defaultValue={defaultValues.name}
        placeholder="Ingrese el nombre del producto"
        {...register("name")}
      />
      <Label htmlFor="description">Descripción</Label>
      <Input
        type="text"
        id="description"
        defaultValue={defaultValues.description}
        placeholder="Ingrese la descripción del producto"
        {...register("description")}
      />
      <div className="flex gap-3">
        <div>
          <Label htmlFor="price">Precio</Label>
          <Input
            type="number"
            min="0.00"
            step=".01"
            id="price"
            defaultValue={displayPrice(defaultValues.price)}
            placeholder="Ingrese su precio"
            {...register("price", {
              setValueAs(value) {
                return parseFloat(value);
              },
            })}
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            type="number"
            min={0}
            id="stock"
            defaultValue={defaultValues.stock}
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
          disabled={formState.isSubmitting}
        >
          Descartar
        </Button>
        <Button type="submit" disabled={formState.isSubmitting}>
          <SaveIcon />
          Guardar
        </Button>
      </div>
    </form>
  );
}
