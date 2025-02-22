"use client";

import * as React from "react";
import {
  BoxIcon,
  Landmark,
  LayoutDashboardIcon,
  Settings,
  Store,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboardIcon,
      isActive: false,
    },
    {
      title: "Pedidos",
      url: "/admin/orders",
      icon: BoxIcon,
      isActive: false,
    },
    {
      title: "Pagos",
      url: "/admin/payments",
      icon: Landmark,
      isActive: false,
    },
    {
      title: "Productos",
      url: "/admin/products",
      icon: Store,
      isActive: false,
    },
    {
      title: "Usuarios",
      url: "/admin/users",
      icon: UsersIcon,
      isActive: false,
    },
  ],
  navSystem: [
    {
      title: "Configuración",
      url: "/admin/config",
      icon: Settings,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Plataforma" items={data.navMain} />
        <NavMain title="Sistema" items={data.navSystem}></NavMain>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
