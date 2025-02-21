"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlusIcon from "@/modules/core/icons/PlusIcon";
import { useState } from "react";
import AddProductForm from "./AddProductForm";

export default function AddProductModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => (e ? handleOpen() : handleClose())}
    >
      <DialogTrigger asChild>
        <Button type="button">
          <PlusIcon fill="#fff" /> Añadir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <span className="text-2xl font-bold">Crear producto</span>
          </DialogTitle>
          <DialogDescription>
            Ingrese los datos del nuevo producto
          </DialogDescription>
        </DialogHeader>
        <AddProductForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
