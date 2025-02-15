"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/modules/cart/hooks/useCart";
import CartIcon from "@/modules/core/icons/CartIcon";
import SearchIcon from "@/modules/core/icons/SearchIcon";
import UserIcon from "@/modules/core/icons/UserIcon";
import { useRouter } from "next/navigation";
import DeliveryUbicationModal from "./DeliveryUbicationModal";
import DeliveryBoxIcon from "@/modules/core/icons/DeliveryBoxIcon";
import LogoutIcon from "@/modules/core/icons/LogoutIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function CommonNavbar() {
  const { totalProducts } = useCart();
  const { status, data } = useSession();
  const router = useRouter();

  const handleSearch = (search: string | null) => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);

    router.push("/store?" + params);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header>
      <nav className="flex flex-row justify-between items-center p-2 max-w-7xl mx-auto border-b-[1px] border-slate-200">
        <div></div>
        <div className="flex items-center gap-3">
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.target as HTMLFormElement);
              const search = data.get("search");
              handleSearch(search?.toString() ?? null);
            }}
          >
            <div className="absolute top-2.5 left-3">
              <SearchIcon />
            </div>
            <Input
              type="search"
              name="search"
              aria-label="Busca un producto"
              placeholder="Busca la mejor comida..."
              className="rounded-full pl-9"
            />
          </form>
          {status !== "authenticated" ? (
            <Link href="/login">
              <Button variant="outline" size="icon" className="rounded-full">
                <UserIcon />
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <UserIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-48 bg-white">
                {data.userRole.type === "deliveryman" ? (
                  <DropdownMenuItem className="py-2 px-4">
                    <Link href="/delivery">
                      <div className="flex flex-row gap-3 items-center">
                        <DeliveryBoxIcon />
                        Delivery
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem className="py-2 px-4">
                  <Link href="/my-orders">
                    <div className="flex flex-row gap-3 items-center">
                      <DeliveryBoxIcon />
                      Mis pedidos
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2 px-4" onClick={handleLogout}>
                  <div className="flex flex-row gap-3 items-center">
                    <LogoutIcon />
                  </div>
                  Cerrar sessión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link href="/cart">
            <Button
              variant="outline"
              size="icon"
              className="relative rounded-full"
            >
              <CartIcon />
              {totalProducts > 0 ? (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center rounded-full">
                  {totalProducts}
                </Badge>
              ) : (
                <></>
              )}
            </Button>
          </Link>
        </div>
      </nav>
      <div className="p-2 px-3 max-w-7xl mx-auto border-b-[1px] border-slate-200">
        <DeliveryUbicationModal />
      </div>
    </header>
  );
}
