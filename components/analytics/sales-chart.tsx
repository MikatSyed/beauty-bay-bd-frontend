"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface SalesChartProps {
  timeframe: string
}

export function SalesChart({ timeframe }: SalesChartProps) {
  // Generate data based on timeframe
  const generateData = () => {
    switch (timeframe) {
      case "7d":
        return [
          { name: "Mon", sales: 4000 },
          { name: "Tue", sales: 3000 },
          { name: "Wed", sales: 5000 },
          { name: "Thu", sales: 2780 },
          { name: "Fri", sales: 6890 },
          { name: "Sat", sales: 8390 },
          { name: "Sun", sales: 4490 },
        ]
      case "30d":
        return Array.from({ length: 30 }, (_, i) => ({
          name: `Day ${i + 1}`,
          sales: Math.floor(Math.random() * 5000) + 2000,
        }))
      case "90d":
        return Array.from({ length: 12 }, (_, i) => ({
          name: `Week ${i + 1}`,
          sales: Math.floor(Math.random() * 20000) + 10000,
        }))
      case "1y":
        return [
          { name: "Jan", sales: 24000 },
          { name: "Feb", sales: 32000 },
          { name: "Mar", sales: 28000 },
          { name: "Apr", sales: 35000 },
          { name: "May", sales: 42000 },
          { name: "Jun", sales: 38000 },
          { name: "Jul", sales: 45000 },
          { name: "Aug", sales: 50000 },
          { name: "Sep", sales: 48000 },
          { name: "Oct", sales: 52000 },
          { name: "Nov", sales: 58000 },
          { name: "Dec", sales: 65000 },
        ]
      default:
        return [
          { name: "Mon", sales: 4000 },
          { name: "Tue", sales: 3000 },
          { name: "Wed", sales: 5000 },
          { name: "Thu", sales: 2780 },
          { name: "Fri", sales: 6890 },
          { name: "Sat", sales: 8390 },
          { name: "Sun", sales: 4490 },
        ]
    }
  }

  const data = generateData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#888888" }}
          tickMargin={8}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          tick={{ fill: "#888888" }}
          tickMargin={8}
        />
        <Tooltip
          formatter={(value) => [`$${value}`, "Sales"]}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#ec4899"
          strokeWidth={2}
          dot={{ fill: "#ec4899", r: 4 }}
          activeDot={{ r: 6, fill: "#ec4899", stroke: "white", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
