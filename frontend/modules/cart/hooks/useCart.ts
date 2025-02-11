import { useContext } from "react";
import { CartContext } from "../cart.context";

export const useCart = () => {
  const ctx = useContext(CartContext);
  return ctx;
};
