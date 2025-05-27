"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface CustomerAcquisitionProps {
  timeframe: string
}

export function CustomerAcquisition({ timeframe }: CustomerAcquisitionProps) {
  // Generate data based on timeframe
  const generateData = () => {
    switch (timeframe) {
      case "7d":
        return [
          { name: "Mon", new: 40, returning: 24 },
          { name: "Tue", new: 30, returning: 28 },
          { name: "Wed", new: 50, returning: 35 },
          { name: "Thu", new: 27, returning: 33 },
          { name: "Fri", new: 68, returning: 42 },
          { name: "Sat", new: 83, returning: 55 },
          { name: "Sun", new: 44, returning: 36 },
        ]
      case "30d":
        return Array.from({ length: 10 }, (_, i) => ({
          name: `Week ${i + 1}`,
          new: Math.floor(Math.random() * 50) + 20,
          returning: Math.floor(Math.random() * 40) + 20,
        }))
      case "90d":
        return Array.from({ length: 12 }, (_, i) => ({
          name: `Week ${i + 1}`,
          new: Math.floor(Math.random() * 100) + 50,
          returning: Math.floor(Math.random() * 80) + 40,
        }))
      case "1y":
        return [
          { name: "Jan", new: 240, returning: 144 },
          { name: "Feb", new: 320, returning: 192 },
          { name: "Mar", new: 280, returning: 168 },
          { name: "Apr", new: 350, returning: 210 },
          { name: "May", new: 420, returning: 252 },
          { name: "Jun", new: 380, returning: 228 },
          { name: "Jul", new: 450, returning: 270 },
          { name: "Aug", new: 500, returning: 300 },
          { name: "Sep", new: 480, returning: 288 },
          { name: "Oct", new: 520, returning: 312 },
          { name: "Nov", new: 580, returning: 348 },
          { name: "Dec", new: 650, returning: 390 },
        ]
      default:
        return [
          { name: "Mon", new: 40, returning: 24 },
          { name: "Tue", new: 30, returning: 28 },
          { name: "Wed", new: 50, returning: 35 },
          { name: "Thu", new: 27, returning: 33 },
          { name: "Fri", new: 68, returning: 42 },
          { name: "Sat", new: 83, returning: 55 },
          { name: "Sun", new: 44, returning: 36 },
        ]
    }
  }

  const data = generateData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
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
          tick={{ fill: "#888888" }}
          tickMargin={8}
        />
        <Tooltip
          formatter={(value) => [value, "Customers"]}
          contentStyle={{
            backgroundColor: "white",
            borderColor: "#e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        />
        <Bar dataKey="new" name="New Customers" fill="#ec4899" radius={[4, 4, 0, 0]} />
        <Bar dataKey="returning" name="Returning Customers" fill="#9333ea" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
