"use client";

import * as React from "react";
import Link from "next/link";
import { Landmark, Settings, FolderSearch2 } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader,
  SidebarRail,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample data
const data = {
  navMain: [
    {
      title: "Consultas",
      url: "/",
      icon: FolderSearch2,
      isActive: true,
      items: [
        { title: "Individual", url: "/consulta-score-crediticio" },
        { title: "Batch", url: "/" },
      ],
    },
    {
      title: "Configuración",
      url: "/",
      icon: Settings,
      isActive: true,
      items: [{ title: "Perfil", url: "/" }],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Link href="/" className="flex items-center gap-2">
                    <Landmark className="size-6" />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Sistema Score Crediticio</span>
                      <span className="truncate text-xs">SBC</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
