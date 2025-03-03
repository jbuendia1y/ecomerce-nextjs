"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import AuthProvider from "../auth/provider";
import CartProvider from "../cart/cart.provider";

const qClient = new QueryClient();

export default function Providers(props: PropsWithChildren) {
  return (
    <QueryClientProvider client={qClient}>
      <AuthProvider>
        <CartProvider>{props.children}</CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
