import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ChatButton from "@/components/chat/chat-button";
import { getHeader, initializeDefaultHeader } from "@/lib/server/header";
import { getFooter, initializeDefaultFooter } from "@/lib/server/footer";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { serializeData } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "your name | Portfolio",
  description: "Web Developer and Software Engineer Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize default header and footer if none exists
  await initializeDefaultHeader();
  await initializeDefaultFooter();

  // Fetch header and footer data
  const header = await getHeader();
  const footer = await getFooter();

  const serializedHeader = serializeData(header);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar
              navItems={serializedHeader?.navItems}
              logoText={serializedHeader?.logoText}
            />
            {children}
            <Footer footer={footer} />
            <ChatButton />
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
