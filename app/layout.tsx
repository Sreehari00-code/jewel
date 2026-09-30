import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURELIA Fine Jewelry | Haute Joaillerie & Ethical Solitaires",
  description: "Handcrafted high jewelry, GIA certified diamonds, Colombian emeralds, and bespoke heirlooms created in our Parisian & Fifth Avenue ateliers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        playfair.variable,
        cormorant.variable,
        "font-sans selection:bg-amber-200 selection:text-amber-950"
      )}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#1c1917] selection:bg-amber-200 selection:text-amber-950 font-sans">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

