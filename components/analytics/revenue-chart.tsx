"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface RevenueChartProps {
  timeframe: string
}

export function RevenueChart({ timeframe }: RevenueChartProps) {
  // Generate data based on timeframe
  const generateData = () => {
    switch (timeframe) {
      case "7d":
        return [
          { name: "Mon", revenue: 4000, profit: 2400 },
          { name: "Tue", revenue: 3000, profit: 1800 },
          { name: "Wed", revenue: 5000, profit: 3000 },
          { name: "Thu", revenue: 2780, profit: 1668 },
          { name: "Fri", revenue: 6890, profit: 4134 },
          { name: "Sat", revenue: 8390, profit: 5034 },
          { name: "Sun", revenue: 4490, profit: 2694 },
        ]
      case "30d":
        return Array.from({ length: 30 }, (_, i) => ({
          name: `Day ${i + 1}`,
          revenue: Math.floor(Math.random() * 5000) + 2000,
          profit: Math.floor(Math.random() * 3000) + 1000,
        }))
      case "90d":
        return Array.from({ length: 12 }, (_, i) => ({
          name: `Week ${i + 1}`,
          revenue: Math.floor(Math.random() * 20000) + 10000,
          profit: Math.floor(Math.random() * 12000) + 6000,
        }))
      case "1y":
        return [
          { name: "Jan", revenue: 24000, profit: 14400 },
          { name: "Feb", revenue: 32000, profit: 19200 },
          { name: "Mar", revenue: 28000, profit: 16800 },
          { name: "Apr", revenue: 35000, profit: 21000 },
          { name: "May", revenue: 42000, profit: 25200 },
          { name: "Jun", revenue: 38000, profit: 22800 },
          { name: "Jul", revenue: 45000, profit: 27000 },
          { name: "Aug", revenue: 50000, profit: 30000 },
          { name: "Sep", revenue: 48000, profit: 28800 },
          { name: "Oct", revenue: 52000, profit: 31200 },
          { name: "Nov", revenue: 58000, profit: 34800 },
          { name: "Dec", revenue: 65000, profit: 39000 },
        ]
      default:
        return [
          { name: "Mon", revenue: 4000, profit: 2400 },
          { name: "Tue", revenue: 3000, profit: 1800 },
          { name: "Wed", revenue: 5000, profit: 3000 },
          { name: "Thu", revenue: 2780, profit: 1668 },
          { name: "Fri", revenue: 6890, profit: 4134 },
          { name: "Sat", revenue: 8390, profit: 5034 },
          { name: "Sun", revenue: 4490, profit: 2694 },
        ]
    }
  }

  const data = generateData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1} />
          </linearGradient>
        </defs>
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
          formatter={(value) => [`$${value}`, "Amount"]}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#ec4899"
          fillOpacity={1}
          fill="url(#colorRevenue)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#9333ea"
          fillOpacity={1}
          fill="url(#colorProfit)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
