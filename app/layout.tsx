import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/Providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Beauty Bay BD",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${playfair.variable} antialiased`}>
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
