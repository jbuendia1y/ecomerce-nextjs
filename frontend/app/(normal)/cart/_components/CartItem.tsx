import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { displayPrice } from "@/lib/utils";
import { useCart } from "@/modules/cart/hooks/useCart";
import CrossIcon from "@/modules/core/icons/CrossIcon";
import MinusIcon from "@/modules/core/icons/MinusIcon";
import PlusIcon from "@/modules/core/icons/PlusIcon";
import Image from "next/image";

export default function CartItem(props: {
  item: ReturnType<typeof useCart>["items"][number];
}) {
  const { item } = props;
  const { updateItemQuantity, removeItem } = useCart();

  const increseInputValue = (isIncrese: boolean) => {
    updateItemQuantity(item.product.id, item.quantity + (isIncrese ? 1 : -1));
  };
  const handleChange = (value: number) => {
    updateItemQuantity(item.product.id, value);
  };

  return (
    <article
      key={"cart-item-" + item.product.id}
      className="flex relative border-b border-b-slate-300 pb-2"
    >
      <Image
        src={item.product.image}
        width={120}
        height={120}
        alt={item.product.name}
      />
      <div className="grid grid-cols-10 gap-10">
        <div className="col-span-7 pt-2">
          <h2 className="text-lg font-semibold">{item.product.name}</h2>
          <p className="text-lg font-bold">
            S/.{displayPrice(item.product.price)}
          </p>
        </div>
        <div className="col-span-3 place-content-center">
          <Label>Cantidad</Label>
          <div className="relative w-24 [&>button]:absolute [&>button]:top-0">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => increseInputValue(true)}
              className="left-0"
            >
              <PlusIcon />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => increseInputValue(false)}
              className="right-0"
            >
              <MinusIcon />
            </Button>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const value = e.target.valueAsNumber;
                handleChange(value);
              }}
              className="no-arrows w-full px-6 text-center"
            />
          </div>
        </div>
      </div>
      <Button
        size="icon"
        variant="destructive"
        className="absolute top-0 right-0 rounded-full h-7 w-7 p-0"
        onClick={() => {
          removeItem(item.product.id);
        }}
      >
        <CrossIcon stroke="white" />
      </Button>
    </article>
  );
}
