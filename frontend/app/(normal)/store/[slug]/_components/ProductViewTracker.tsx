"use client";

import { increseProductViews } from "@/modules/meta-products/services/increseProductViews";
import { useEffect } from "react";

export default function ProductViewTracker({
  productId,
}: {
  productId: string;
}) {
  useEffect(() => {
    increseProductViews(productId);
  }, [productId]);

  return null;
}
