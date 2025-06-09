"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Eye, LogOut, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const userImage = session?.user?.image;
  const userInitial = session?.user?.name?.[0]?.toUpperCase() || "U";

  return (
    <nav className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
      {/* Left */}
      <SidebarTrigger className="text-white hover:bg-slate-800 rounded-md p-2" />

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* View Site Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/")}
          className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-white"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Site
        </Button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="relative text-slate-300 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userImage} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-slate-800 border-slate-700"
            align="end"
            sideOffset={10}
          >
            <DropdownMenuLabel className="text-white">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 hover:text-white">
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 hover:text-white">
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-900 hover:text-red-300">
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
