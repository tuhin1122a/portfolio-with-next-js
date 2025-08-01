"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, UserCircle } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SignInButton() {
  const { data: session } = useSession();
  // একটা state রাখা হচ্ছে imageUrl-এর জন্য
  const [imageUrl, setImageUrl] = useState<string>("");

  // session থেকে ইমেজ পাওয়া গেলে টাইমস্ট্যাম্প যুক্ত করে আপডেট করব

  useEffect(() => {
    if (session) {
      fetch("/api/users/profile")
        .then(async (res) => {
          const data = await res.json();
          setImageUrl(data.image || "");
          // যদি ইমেজ URL থাকে, তাহলে সেটি আপডেট করব
          if (data.image) {
            setImageUrl(data.image + `?t=${Date.now()}`); // টাইমস্ট্যাম্প যুক্ত করে ইমেজ আপডেট
          } else {
            setImageUrl(""); // ইমেজ না থাকলে ফাঁকা রাখব
          }
        })
        .catch((err) => console.error("❌ Profile fetch error:", err));
    }
  }, [session]);

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={imageUrl || ""}
                alt={session.user?.name || ""}
              />
              <AvatarFallback>
                {session.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              {session.user?.name && (
                <p className="font-medium">{session.user.name}</p>
              )}
              {session.user?.email && (
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          {session.user?.isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(event) => {
              event.preventDefault();
              signOut();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button variant="default" size="sm" onClick={() => signIn()}>
      <LogIn className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button variant="destructive" size="sm" onClick={() => signOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}

export function UserButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login">
          <UserCircle className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="sm" asChild>
      <Link href="/profile">
        <UserCircle className="mr-2 h-4 w-4" />
        Profile
      </Link>
    </Button>
  );
}
