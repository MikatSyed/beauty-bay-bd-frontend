"use client";


import Footer from "@/components/pages/home/footer";

import { Navbar } from "@/components/pages/home/Navbar";
import TopHeader from "@/components/pages/home/top-header";






export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
    <TopHeader/>
    <Navbar />
      {children}
    <Footer/>
    </>
  );
}
