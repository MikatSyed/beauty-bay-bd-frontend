import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <DashboardLayout>{children}</DashboardLayout>
    </ThemeProvider>
  );
}

export const metadata = {
  generator: "Beauty Bay BD Dashboard",
};
