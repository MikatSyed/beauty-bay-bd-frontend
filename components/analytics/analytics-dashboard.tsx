"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/analytics/date-range-picker"
import type { DateRange } from "react-day-picker"
import { format, subDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/analytics/sales-chart"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"
import { CustomerAcquisition } from "@/components/analytics/customer-acquisition"
import { PrinterIcon, FileDown } from "lucide-react"

export function AnalyticsDashboard() {
  // Default date range: last 30 days
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const [activeTab, setActiveTab] = useState("overview")
  const [timeframe, setTimeframe] = useState("30d")

  // Format date for display
  const formattedDateRange =
    dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
      : "Select date range"

  // Handle print report
  const handlePrintReport = () => {
    window.print()
  }

  // Handle export report
  const handleExportReport = () => {
    // In a real app, this would generate and download a CSV/PDF
    console.log("Exporting report for:", dateRange)
    alert("Report exported successfully!")
  }

  // Update timeframe based on date range selection
  const updateTimeframe = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return

    setDateRange(range)

    const diffDays = Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays <= 7) {
      setTimeframe("7d")
    } else if (diffDays <= 30) {
      setTimeframe("30d")
    } else if (diffDays <= 90) {
      setTimeframe("90d")
    } else {
      setTimeframe("1y")
    }
  }

  // Preset date ranges
  const setPresetRange = (days: number) => {
    const to = new Date()
    const from = subDays(to, days)
    setDateRange({ from, to })
    setTimeframe(days === 7 ? "7d" : days === 30 ? "30d" : days === 90 ? "90d" : "1y")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <DatePickerWithRange date={dateRange} onDateChange={updateTimeframe} />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPresetRange(7)}
              className={timeframe === "7d" ? "bg-pink-50 text-pink-700 border-pink-200" : ""}
            >
              7D
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPresetRange(30)}
              className={timeframe === "30d" ? "bg-pink-50 text-pink-700 border-pink-200" : ""}
            >
              30D
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPresetRange(90)}
              className={timeframe === "90d" ? "bg-pink-50 text-pink-700 border-pink-200" : ""}
            >
              90D
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPresetRange(365)}
              className={timeframe === "1y" ? "bg-pink-50 text-pink-700 border-pink-200" : ""}
            >
              1Y
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrintReport}>
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CardDescription>{formattedDateRange}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from previous period</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CardDescription>{formattedDateRange}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+12.2% from previous period</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <CardDescription>{formattedDateRange}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78.94</div>
            <p className="text-xs text-muted-foreground">+5.3% from previous period</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <CardDescription>{formattedDateRange}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Daily sales for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <SalesChart timeframe={timeframe} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by product category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CategoryBreakdown />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed revenue breakdown over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RevenueChart timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Top selling products and categories</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <CategoryBreakdown showDetails />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>New vs returning customers</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <CustomerAcquisition timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
