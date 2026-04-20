import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DesignFlow — AI-Powered Creative Production Platform",
  description:
    "The first AI-powered creative production platform that connects your entire design workflow — from prompt to Figma to motion to export — in one unified system.",
  keywords: [
    "design automation",
    "AI design",
    "Figma plugin",
    "motion design",
    "creative production",
    "design workflow",
  ],
  openGraph: {
    title: "DesignFlow — AI-Powered Creative Production Platform",
    description:
      "From prompt to Figma to motion to export. One unified creative production platform.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
