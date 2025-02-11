"use client";
import { PropsWithChildren, Reducer, useReducer } from "react";
import { CartContext, CartState } from "./cart.context";
import { toast } from "@/hooks/use-toast";

type CartActions =
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "ADD_ITEM";
      payload: {
        id: string;
        slug: string;
        name: string;
        price: number;
        stock: number;
        image: string;
      };
    }
  | {
      type: "UPDATE_ITEM_QUANTITY";
      payload: { productId: string; quantity: number };
    };

const reducer: Reducer<CartState, CartActions> = (prevState, action) => {
  const state = structuredClone(prevState);
  switch (action.type) {
    case "REMOVE_ITEM": {
      const idx = state.items.findIndex((v) => v.product.id === action.payload);
      if (idx === -1) return prevState;
      const removedItem = state.items.splice(idx, 1);
      const quantityToRemove = removedItem[0].quantity ?? 0;

      state.totalProducts -= quantityToRemove;
      state.totalPrice -= quantityToRemove * removedItem[0].product.price;

      return state;
    }
    case "ADD_ITEM": {
      if (action.payload.stock < 1) return prevState;

      const idx = state.items.findIndex(
        (v) => v.product.id === action.payload.id
      );
      if (idx === -1) {
        state.items.push({ product: action.payload, quantity: 1 });
      } else {
        state.items[idx].quantity += 1;
        if (action.payload.stock < state.items[idx].quantity) {
          toast({
            title: "Límite alcanzado",
            description: "Alcanzó el límite del stock del producto",
          });
          return prevState;
        }
      }

      state.totalProducts += 1;
      state.totalPrice += action.payload.price;
      return state;
    }
    case "UPDATE_ITEM_QUANTITY": {
      const idx = state.items.findIndex(
        (v) => v.product.id === action.payload.productId
      );
      if (idx === -1 || action.payload.quantity <= 0) return prevState;
      if (action.payload.quantity > state.items[idx].product.stock) {
        toast({
          title: "Límite alcanzado",
          description: "Alcanzó el límite del stock del producto",
        });
        return prevState;
      }

      const difference = action.payload.quantity - state.items[idx].quantity;
      state.items[idx].quantity += difference;
      state.totalProducts += difference;
      state.totalPrice += difference * state.items[idx].product.price;
      return state;
    }
    default:
      return prevState;
  }
};

export default function CartProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    totalPrice: 0,
    totalProducts: 0,
  });

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };
  const addItem = (product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    stock: number;
    image: string;
  }) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };
  const updateItemQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: "UPDATE_ITEM_QUANTITY",
      payload: { productId, quantity },
    });
  };

  return (
    <CartContext.Provider
      value={{ ...state, removeItem, addItem, updateItemQuantity }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
