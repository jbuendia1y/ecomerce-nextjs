import CartProvider from "@/modules/cart/cart.provider";
import { PropsWithChildren } from "react";

export default function NormalLayout(props: PropsWithChildren) {
  return <CartProvider>{props.children}</CartProvider>;
}
