"use client";
import {
  PropsWithChildren,
  Reducer,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CartContext, CartState } from "./cart.context";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { purcharseCart } from "./services/purcharseCart";

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
    }
  | {
      type: "UPDATE_DELIVERY_LOCATION";
      payload: {
        city: string;
        province: string;
        district: string;
        direction: string;
      };
    }
  | { type: "LOAD_SAVED_CART"; payload: CartState };

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
    case "UPDATE_DELIVERY_LOCATION": {
      state.delivery = action.payload;
      return state;
    }
    case "LOAD_SAVED_CART": {
      state.delivery = action.payload.delivery;
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalProducts = action.payload.totalProducts;
      return state;
    }
    default:
      return prevState;
  }
};

const getSavedCart = (): CartState => {
  const cartSchema = z.object({
    delivery: z
      .object({
        city: z.string(),
        province: z.string(),
        district: z.string(),
        direction: z.string(),
      })
      .nullable(),
    items: z.array(
      z.object({
        product: z.object({
          id: z.string(),
          slug: z.string(),
          name: z.string(),
          price: z.number().min(0),
          image: z.string(),
          stock: z.number().min(0),
        }),
        quantity: z.number().min(1),
      })
    ),
    totalPrice: z.number().min(0),
    totalProducts: z.number().min(0),
  });

  const defaultValue = {
    items: [],
    totalPrice: 0,
    totalProducts: 0,
    delivery: null,
  };

  const saved = localStorage.getItem("CART_BACKUP_SAVED");
  if (saved) return cartSchema.parse(JSON.parse(saved));
  else return defaultValue;
};

export default function CartProvider(props: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    totalPrice: 0,
    totalProducts: 0,
    delivery: null,
  });

  useEffect(() => {
    if (!isLoaded) {
      const saved = getSavedCart();
      dispatch({ type: "LOAD_SAVED_CART", payload: saved });
      setIsLoaded(true);
    } else {
      localStorage.setItem("CART_BACKUP_SAVED", JSON.stringify(state));
    }
  }, [isLoaded, state]);

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

  const updateDeliveryLocation = (payload: {
    city: string;
    province: string;
    district: string;
    direction: string;
  }) => {
    dispatch({ type: "UPDATE_DELIVERY_LOCATION", payload });
  };

  const purcharse = async () => {
    if (!state.delivery) throw new Error("The purcharse needs delivery data");

    const purcharse = await purcharseCart({
      cart: state,
      delivery: state.delivery,
    });
    console.log(purcharse);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        removeItem,
        addItem,
        updateItemQuantity,
        updateDeliveryLocation,
        purcharse,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
