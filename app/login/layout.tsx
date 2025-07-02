import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login / Register | MyApp",
  description:
    "Securely login or create a new account on MyApp. Fast, safe, and easy.",
  keywords: ["login", "register", "signup", "authentication", "Next.js app"],
  authors: [{ name: "MyApp Team", url: "https://myapp.com" }],
  creator: "MyApp",
  metadataBase: new URL("https://myapp.com"),
  openGraph: {
    title: "Login / Register - MyApp",
    description: "Access your account or join MyApp to explore features.",
    url: "https://myapp.com",
    siteName: "MyApp",
    type: "website",
    images: [
      {
        url: "https://myapp.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MyApp Login Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login / Register - MyApp",
    description: "Access your account or join MyApp to explore features.",
    images: ["https://myapp.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fabicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
