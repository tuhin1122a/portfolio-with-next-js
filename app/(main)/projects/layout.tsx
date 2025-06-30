// app/(main)/projects/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Tuhin Portfolio",
  description:
    "A showcase of web development projects by Tuhin using React, Next.js, and more.",
  keywords: [
    "Tuhin Projects",
    "Web Development",
    "Next.js Projects",
    "React Portfolio",
    "Full Stack Developer Work",
  ],
  openGraph: {
    title: "Projects | Tuhin Portfolio",
    description:
      "Explore a curated list of full-stack web development projects by Tuhin.",
    url: "https://tuhin-portfilio.vercel.app/projects",
    siteName: "Tuhin Portfolio",
    images: [
      {
        url: "https://tuhin-portfilio.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tuhin Portfolio Projects",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Tuhin Portfolio",
    description:
      "Discover modern web development projects by Tuhin using React, Next.js, and more.",
    images: ["https://tuhin-portfilio.vercel.app/twitter-card.jpg"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
