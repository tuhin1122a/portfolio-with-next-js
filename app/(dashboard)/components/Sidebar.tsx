"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BookText,
  Bot,
  Briefcase,
  ChevronUp,
  FileText,
  Info,
  LayoutDashboard,
  MessageSquare,
  Projector,
  Settings,
  Sparkles,
  User2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

const portfolioTabs: SidebarItem[] = [
  { title: "Header", url: "/dashboard/header", icon: LayoutDashboard },
  { title: "About", url: "/dashboard/about", icon: Info },
  { title: "Skills", url: "/dashboard/skills", icon: Sparkles },
  { title: "Experience", url: "/dashboard/experience", icon: Briefcase },
  { title: "Services", url: "/dashboard/services", icon: FileText },
  {
    title: "Certifications",
    url: "/dashboard/certifications",
    icon: BadgeCheck,
  },
  { title: "Projects", url: "/dashboard/projects", icon: Projector },
  { title: "Blogs", url: "/dashboard/blogs", icon: BookText },
  { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
  { title: "Footer", url: "/dashboard/footer", icon: LayoutDashboard },
  { title: "AI Chat", url: "/dashboard/ai", icon: Bot },
  {
    title: "Conversations",
    url: "/dashboard/conversations",
    icon: MessageSquare,
  },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Users", url: "/dashboard/users", icon: Users },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar
      collapsible="icon"
      className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <Image
                  src="https://lh3.googleusercontent.com/a/ACg8ocKe9CPr6xoRQVgHzCMuUZSBx1Ox3ifYd_7TLBIykgJGhAJ3bJib=s288-c-no"
                  alt="logo"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="font-semibold text-sm">Tuhinur Rahman</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-gray-500 text-xs tracking-wider">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {portfolioTabs.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center px-3 py-2 rounded-md transition-all text-sm font-medium
                          ${
                            active
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white"
                              : "hover:bg-gray-100 hover:dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }
                        `}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Profile Menu */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center w-full text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-3 py-2 transition-all">
                  <User2 className="mr-2 h-4 w-4" />
                  Tuhinur Rahman
                  <ChevronUp className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="dark:bg-gray-900 dark:text-white"
              >
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
