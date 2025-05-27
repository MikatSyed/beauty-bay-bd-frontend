import type { Metadata } from "next"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export const metadata: Metadata = {
  title: "Analytics",
  description: "Comprehensive analytics for your beauty e-commerce store",
}

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      <AnalyticsDashboard />
    </div>
  )
}
