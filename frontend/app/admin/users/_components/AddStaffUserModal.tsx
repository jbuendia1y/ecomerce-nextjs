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
import AddStaffUserForm from "./AddStaffUserForm";

export default function AddStaffUserModal() {
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
            <span className="text-2xl font-bold">Añadir usuario</span>
          </DialogTitle>
          <DialogDescription>
            Ingrese el correo del nuevo miembro del equipo del ecomerce. Dicho
            usuario ya debe haberse registrado
          </DialogDescription>
        </DialogHeader>
        <AddStaffUserForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
