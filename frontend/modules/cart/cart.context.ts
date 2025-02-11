"use client";
import { createContext } from "react";

export interface CartState {
  totalProducts: number;
  totalPrice: number;
  items: Array<{
    product: {
      id: string;
      slug: string;
      name: string;
      price: number;
      image: string;
      stock: number;
    };
    quantity: number;
  }>;
}

export interface CartMethods {
  addItem: (product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    stock: number;
    image: string;
  }) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
}

export const CartContext = createContext<CartState & CartMethods>({
  totalProducts: 0,
  totalPrice: 0,
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
});
