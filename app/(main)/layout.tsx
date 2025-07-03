import ChatButton from "@/components/chat/chat-button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-provider";
import { getFooter, initializeDefaultFooter } from "@/lib/server/footer";
import { getHeader, initializeDefaultHeader } from "@/lib/server/header";
import { serializeData } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tuhin | Portfolio – Full Stack Web Developer",
  description:
    "Welcome to Tuhin's developer portfolio. Explore modern web projects, technologies, and software engineering case studies.",
  keywords: [
    "Tuhin Portfolio",
    "Web Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Tuhin", url: "https://tuhin-portfilio.vercel.app" }],
  openGraph: {
    title: "Tuhin | Portfolio – Full Stack Web Developer",
    description:
      "Showcasing modern web apps built with React, Next.js, and scalable backends.",
    url: "https://tuhin-portfilio.vercel.app",
    siteName: "Tuhin Portfolio",
    images: [
      {
        url: "https://tuhin-portfilio.vercel.app",
        width: 1200,
        height: 630,
        alt: "Tuhin Portfolio Open Graph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuhin | Portfolio",
    description:
      "Explore projects, skills, and services by full stack web developer Tuhin.",
    images: ["https://tuhin-portfilio.vercel.app/twitter-card.jpg"],
  },
  metadataBase: new URL("https://tuhin-portfilio.vercel.app"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await initializeDefaultHeader();
  await initializeDefaultFooter();

  const header = await getHeader();
  const footer = await getFooter();

  const serializedHeader = serializeData(header);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fabicon.png" />
        <link rel="canonical" href="https://tuhin-portfilio.vercel.app" />
      </head>
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
