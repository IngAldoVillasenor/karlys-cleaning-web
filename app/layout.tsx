import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karly's Cleaning Services | Top House Cleaning in West Chester, PA",
  description: "Dependable and detailed cleaning services in West Chester, PA. Specializing in family homes, move-ins, and move-outs. Get 20% off your first cleaning!",
  keywords: ["cleaning services West Chester PA", "house cleaning", "move out cleaning", "maid service", "local cleaners"],
  openGraph: {
    title: "Karly's Cleaning Services | West Chester, PA",
    description: "Professional residential cleaning services. Enjoy a sparkling home without the stress!",
    url: 'https://karlys-cleaning-web.vercel.app',
    siteName: "Karly's Cleaning Services",
    locale: 'en_US',
    type: 'website',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
