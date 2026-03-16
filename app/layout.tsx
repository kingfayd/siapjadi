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
  title: {
    default: "SiapJadi - Platform Joki Tugas Mahasiswa Terpercaya",
    template: "%s | SiapJadi",
  },
  description: "Platform joki tugas terpercaya, aman, dan profesional untuk mahasiswa dan pelajar. Solusi tugas kuliah, makalah, coding, dan desain dengan hasil berkualitas.",
  keywords: ["joki tugas", "joki tugas mahasiswa", "joki makalah", "joki coding", "joki tugas kuliah", "siap jadi", "siapjadi id", "jasa pengerjaan tugas", "joki skripsi", "joki terpercaya"],
  authors: [{ name: "SiapJadi" }],
  creator: "SiapJadi",
  publisher: "SiapJadi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.siapjadi.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SiapJadi - Platform Joki Tugas Mahasiswa Terpercaya",
    description: "Platform joki tugas terpercaya, aman, dan profesional untuk mahasiswa dan pelajar. Solusi penyelesaian tugas secara tepat waktu.",
    url: 'https://www.siapjadi.id',
    siteName: 'SiapJadi',
    images: [
      {
        url: '/og-image.png', // We should create this image later or assume user will
        width: 1200,
        height: 630,
        alt: 'SiapJadi - Joki Tugas Terpercaya',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiapJadi - Platform Joki Tugas Terpercaya',
    description: 'Solusi tugas kuliah, makalah, coding, dan desain dengan hasil berkualitas dan tepat waktu.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
