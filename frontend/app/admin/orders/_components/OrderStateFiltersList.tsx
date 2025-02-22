"use client";

import { Badge } from "@/components/ui/badge";
import { OrderState } from "@/modules/orders/interfaces";
import { useRouter, useSearchParams } from "next/navigation";

const items = [
  {
    value: OrderState.wait,
    label: "En espera",
  },
  {
    value: OrderState.process,
    label: "En proceso",
  },
  {
    value: OrderState.completed,
    label: "Completados",
  },
  {
    value: OrderState.cancelled,
    label: "Cancelados",
  },
];

export default function OrderStateFiltersList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentState = searchParams.get("state");

  const handleValue = (value: string) => {
    const params = new URLSearchParams();
    params.set("state", value);
    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-1 mb-3">
      {items.map((item) => {
        return (
          <Badge
            className={"rounded-full py-1 cursor-pointer"}
            variant={currentState === item.value ? "default" : "outline"}
            key={"order-state-option-filter-" + item.value}
            onClick={() => handleValue(item.value)}
          >
            {item.label}
          </Badge>
        );
      })}
    </div>
  );
}
