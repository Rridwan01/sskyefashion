import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SKYE FASHION",
    default: "SKYE FASHION | Luxury Urban Fashion & Designer Streetwear",
  },
  description: "SKYE FASHION is a digital fashion house and modern luxury streetwear boutique. Explore exclusive collections, avant-garde pieces, and personalized concierge sourcing.",
  keywords: ["Luxury Urban Fashion", "Designer Streetwear", "Exclusive Men's Apparel", "High-End Streetwear", "Avant-Garde Fashion", "SKYE FASHION"],
  openGraph: {
    title: "SKYE FASHION | Luxury Urban Fashion",
    description: "A digital fashion house and modern luxury streetwear boutique.",
    url: "https://skyefashion.com",
    siteName: "SKYE FASHION",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "SKYE FASHION Editorial Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKYE FASHION",
    description: "Modern luxury streetwear and editorial fashion experience.",
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"],
  },
};

import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <NextAuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
