import HomePage from "@/components/pages/home-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Beauty Bay BD",
  description: "beauty and skincare e-commerce",
}

export default function Home() {
  return <HomePage/>
}
