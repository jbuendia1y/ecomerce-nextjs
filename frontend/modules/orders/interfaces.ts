export enum OrderState {
  wait = "wait",
  process = "process",
  completed = "completed",
  cancelled = "cancelled",
}

export interface OrderDelivery {
  city: string;
  province: string;
  district: string;
  direction: string;
}

export interface CreateOrder {
  totalProducts: number;
  totalPrice: number;
  status: OrderState;
  items: Array<{
    product: { id: string; image: string; name: string; price: number };
    quantity: number;
  }>;
  delivery: OrderDelivery;
  clientId: string;
  createdAt: string;
}

export interface Order {
  id: string;
  status: OrderState;
  totalProducts: number;
  totalPrice: number;
  items: Array<{
    product: { id: string; image: string; name: string; price: number };
    quantity: number;
  }>;
  clientId: string;
  delivery: OrderDelivery;
  paymentId?: string | null;
  createdAt: string;
}
