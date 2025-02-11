import { Product } from "../products/interfaces";

export enum OrderState {
  wait = "wait",
  process = "process",
  completed = "completed",
  cancelled = "cancelled",
}

export interface Order {
  id: string;
  totalProducts: number;
  totalPrice: number;
  items: Array<{ product: Product; quantity: number }>;
}
