import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const preview = process.env.VERCEL_ENV === "preview";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.karlyscleaning.com"),
  title: {
    default: "Karly's Cleaning | A cleaner home. More time for you.",
    template: "%s | Karly's Cleaning",
  },
  description:
    "Thoughtful residential cleaning for West Chester and neighboring Chester County communities. Locally based, liability insured, and focused on the details. Request a free quote.",
  alternates: { canonical: "/" },
  robots: preview
    ? { index: false, follow: false }
    : { index: true, follow: true },
  openGraph: {
    title: "Karly's Cleaning Services | West Chester, PA",
    description: "A cleaner home. More time for the things you love.",
    url: "/",
    siteName: "Karly's Cleaning Services",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero-image.jpg",
        alt: "Residential cleaning with Karly's Cleaning Services",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.VERCEL_ENV === "production" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
