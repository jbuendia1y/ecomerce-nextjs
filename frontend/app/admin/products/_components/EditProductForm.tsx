import { Input } from "@/components/ui/input";
import { Product } from "@/modules/products/interfaces";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditProductForm(props: {
  defaultValues: Product;
  onClose: () => void;
}) {
  const { defaultValues, onClose } = props;

  return (
    <form action="">
      <div>
        <span># Imagen del producto</span>
        <button className="flex items-center justify-center">
          Sube una imágen
        </button>
      </div>
      <Label>Slug</Label>
      <Input
        type="text"
        name="slug"
        defaultValue={defaultValues.slug}
        placeholder="Ingrese el UID del producto"
      />
      <Label>Nombre</Label>
      <Input
        type="text"
        name="name"
        defaultValue={defaultValues.name}
        placeholder="Ingrese el nombre del producto"
      />
      <Label>Descripción</Label>
      <Input
        type="text"
        name="description"
        defaultValue={defaultValues.description}
        placeholder="Ingrese la descripción del producto"
      />
      <div className="flex gap-3">
        <div>
          <Label>Precio</Label>
          <Input
            type="number"
            name="price"
            min={0}
            defaultValue={defaultValues.price}
            placeholder="Ingrese su precio"
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            name="stock"
            min={0}
            defaultValue={defaultValues.stock}
            placeholder="Ingrese su stock"
          />
        </div>
      </div>
      <Button type="button" onClick={() => onClose()}>
        Cancelar
      </Button>
      <Button type="submit">Guardar</Button>
    </form>
  );
}
