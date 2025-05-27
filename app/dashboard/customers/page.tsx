import type { Metadata } from "next"
import { CustomersTable } from "@/components/customers/customers-table"

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage your customer base",
}

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
      </div>
      <div className="space-y-4">
        <CustomersTable />
      </div>
    </div>
  )
}
