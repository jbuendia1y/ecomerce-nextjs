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
  delivery: {
    city: string;
    province: string;
    district: string;
    direction: string;
  } | null;
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
  updateDeliveryLocation: (payload: {
    city: string;
    province: string;
    district: string;
    direction: string;
  }) => void;
  purcharse: () => Promise<void>;
}

export const CartContext = createContext<CartState & CartMethods>({
  totalProducts: 0,
  totalPrice: 0,
  items: [],
  delivery: null,
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
  updateDeliveryLocation: () => {},
  purcharse: () => Promise.resolve(),
});
