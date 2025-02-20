import { Card } from "@/components/ui/card";
import EditProductForm from "./EditProductForm";
import { getProductDetails } from "@/modules/products/services/getProductDetails";

export default async function EditProductCard(props: {
  productId: string;
  open: boolean;
}) {
  const product = await getProductDetails(props.productId);
  if (!product) return <></>;

  return (
    <Card className="p-3">
      <h1>Editar producto</h1>
      <EditProductForm defaultValues={product} onClose={() => {}} />
    </Card>
  );
}
