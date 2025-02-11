"use client";
import { Button } from "@/components/ui/button";
import UserIcon from "@/modules/core/icons/UserIcon";
import LogoutIcon from "@/modules/core/icons/LogoutIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminNavbar() {
  return (
    <header>
      <nav className="flex flex-row justify-between items-center p-2 max-w-7xl mx-auto border-b-[1px] border-slate-200">
        <div></div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <UserIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-48 bg-white">
              {/* <DropdownMenuItem className="py-2 px-4">
                <Link href="/my-orders">
                  <div className="flex flex-row gap-3 items-center">
                    <DeliveryBoxIcon />
                    Mis pedidos
                  </div>
                </Link>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-2 px-4">
                <div className="flex flex-row gap-3 items-center">
                  <LogoutIcon />
                </div>
                Cerrar sessión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
