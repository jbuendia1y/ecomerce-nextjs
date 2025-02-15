import { StrapiUser } from "../core/interfaces";
import { Product } from "../products/interfaces";

export enum OrderState {
  wait = "wait",
  process = "process",
  completed = "completed",
  cancelled = "cancelled",
}

export interface CreateOrder {
  totalProducts: number;
  totalPrice: number;
  items: Array<{ product: string; quantity: number }>;
  delivery: {
    city: string;
    province: string;
    district: string;
    direction: string;
  };
  client: string;
}

export interface Order {
  id: string;
  status: OrderState;
  totalProducts: number;
  totalPrice: number;
  items: Array<{ product: Product; quantity: number }>;
  client: StrapiUser;
}
