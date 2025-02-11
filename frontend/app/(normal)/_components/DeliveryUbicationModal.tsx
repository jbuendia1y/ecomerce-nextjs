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

export default function DeliveryUbicationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2">
          <PinMapIcon /> <p className="font-semibold">Ingresa tu ubicación</p>
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
        <DeliveryUbicationForm />
      </DialogContent>
    </Dialog>
  );
}
