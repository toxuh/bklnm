import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BKLNM - K-pop Duo | Coming Soon",
  description: "BKLNM - An exciting new K-pop duo bringing fresh energy and cyberpunk vibes to the music scene. Coming soon.",
  keywords: ["BKLNM", "K-pop", "duo", "music", "cyberpunk", "neon", "coming soon"],
  authors: [{ name: "BKLNM" }],
  creator: "BKLNM",
  publisher: "BKLNM",
  openGraph: {
    title: "BKLNM - K-pop Duo | Coming Soon",
    description: "An exciting new K-pop duo bringing fresh energy and cyberpunk vibes to the music scene.",
    type: "website",
    locale: "en_US",
    siteName: "BKLNM",
  },
  twitter: {
    card: "summary_large_image",
    title: "BKLNM - K-pop Duo | Coming Soon",
    description: "An exciting new K-pop duo bringing fresh energy and cyberpunk vibes to the music scene.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
