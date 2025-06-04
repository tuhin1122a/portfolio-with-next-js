"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SignInButton } from "./auth/auth-buttons";
import type { INavItem } from "@/lib/models/header";

interface NavbarProps {
  navItems?: INavItem[];
  logoText?: string;
}

export default function Navbar({
  navItems = [],
  logoText = "Masudur Rahman",
}: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use default nav items if none are provided
  const displayNavItems =
    navItems.length > 0
      ? navItems
      : [
          { label: "About", href: "/#about" },
          { label: "Skills", href: "/#skills" },
          { label: "Experience", href: "/#experience" },
          { label: "Projects", href: "/projects" },
          { label: "Services", href: "/#services" },
          { label: "Certifications", href: "/#certifications" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/#contact" },
        ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-3 px-4 md:px-8",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-bold text-2xl text-primary font-['Caveat'] tracking-wider">
            {logoText}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {displayNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              {...(item.isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          <SignInButton />

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle mobile menu"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed inset-x-0 top-[60px] bg-background/95 backdrop-blur-md border-b border-border/40 py-4 px-4"
        >
          <nav className="flex flex-col space-y-4">
            {displayNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "text-sm font-medium transition-colors p-2 hover:bg-accent rounded-md",
                  pathname === item.href
                    ? "text-primary bg-accent/50"
                    : "text-muted-foreground"
                )}
                {...(item.isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
