"use client";

import type React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Add a small delay to allow NextAuth to fully initialize the session
    const timer = setTimeout(() => {
      if (status === "loading") return;

      if (!session) {
        router.push(
          `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
        );
      } else if (adminOnly && !session.user.isAdmin) {
        router.push("/");
      }

      setIsChecking(false);
    }, 500); // 500ms delay to ensure session is properly initialized

    return () => clearTimeout(timer);
  }, [session, status, router, adminOnly]);

  // Show loading state during both NextAuth loading and our additional check
  if (status === "loading" || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render children if unauthorized
  if (!session || (adminOnly && !session.user.isAdmin)) {
    return null;
  }

  return <>{children}</>;
}
