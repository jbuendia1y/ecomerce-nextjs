import { OrderState } from "./interfaces";

export const displayOrderState = (state: OrderState): string => {
  switch (state) {
    case OrderState.wait:
      return "en espera";
    case OrderState.process:
      return "en proceso";
    case OrderState.completed:
      return "completado";
    case OrderState.cancelled:
      return "cancelado";
    default:
      return "No establecido";
  }
};

export const isOrderState = (value: string): value is OrderState => {
  if (
    value === OrderState.wait ||
    value === OrderState.process ||
    value === OrderState.completed ||
    value === OrderState.cancelled
  ) {
    return true;
  }
  return false;
};
