"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PinMapIcon } from "@/modules/core/icons/PinMapIcon";
import DeliveryUbicationForm from "./DeliveryUbicationForm";
import { useCart } from "@/modules/cart/hooks/useCart";
import { useState } from "react";

export default function DeliveryUbicationModal() {
  const [open, setOpen] = useState(false);
  const { delivery } = useCart();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => (e ? handleOpen() : handleClose())}
    >
      <DialogTrigger asChild>
        <button className="flex items-center gap-2">
          <PinMapIcon />{" "}
          <p className="font-semibold">
            {delivery
              ? `Entrega en ${delivery.district}`
              : "Ingresa tu ubicación"}
          </p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <PinMapIcon />{" "}
            <span className="text-2xl font-bold">Ingrese una ubicación</span>
          </DialogTitle>
          <DialogDescription>
            Ingresa tu ubicación para poder realizar el delivery de forma
            precisa
          </DialogDescription>
        </DialogHeader>
        <DeliveryUbicationForm onSubmited={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
