import type { Metadata } from "next"
import { ProductsTable } from "@/components/products/products-table"

export const metadata: Metadata = {
  title: "Products",
  description: "Manage your beauty and skincare products",
}

export default function ProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
      </div>
      <div className="space-y-4">
        <ProductsTable />
      </div>
    </div>
  )
}
