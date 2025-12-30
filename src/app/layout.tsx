import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Inspire Global Access - Bridging Africa & China",
    template: "%s | Inspire Global Access",
  },
  description:
    "Your trusted partner for cross-border opportunities between Africa and China. Education, employment, travel, and trade solutions.",
  keywords: [
    "China Africa",
    "education China",
    "study abroad",
    "trade consulting",
    "visa services",
    "employment abroad",
  ],
  authors: [{ name: "Inspire Global Access" }],
  creator: "Inspire Global Access",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inspireglobalaccess.com",
    siteName: "Inspire Global Access",
    title: "Inspire Global Access - Bridging Africa & China",
    description:
      "Your trusted partner for cross-border opportunities between Africa and China.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspire Global Access",
    description: "Bridging Africa & China for global success",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A2540",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
