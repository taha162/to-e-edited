import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono, Tajawal } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CinemaChrome, { CinematicCursor } from "@/components/cinema/CinemaChrome";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const arabic = Tajawal({
  weight: ["400", "500", "700", "800"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Taha Jasim Mohammed — Mechatronics × Design",
  description:
    "A discipline of two minds. Taha Jasim Mohammed — Mechatronics Engineering student & graphic designer based in Mosul, Iraq.",
  metadataBase: new URL("https://tjd162.vercel.app"),
  openGraph: {
    title: "Taha Jasim Mohammed — Mechatronics × Design",
    description:
      "A discipline of two minds. Mechatronics, design, photography, and code from Mosul, Iraq.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} ${mono.variable} ${arabic.variable}`}
    >
      <body className="min-h-screen bg-ink text-paper antialiased">
        <LanguageProvider>
          <SmoothScroll />
          <CinemaChrome />
          <CinematicCursor />
          <Navigation />
          <main className="relative z-10">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
