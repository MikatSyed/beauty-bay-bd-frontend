"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    total: 18000,
  },
  {
    name: "Feb",
    total: 22000,
  },
  {
    name: "Mar",
    total: 25000,
  },
  {
    name: "Apr",
    total: 28000,
  },
  {
    name: "May",
    total: 32000,
  },
  {
    name: "Jun",
    total: 38000,
  },
  {
    name: "Jul",
    total: 42000,
  },
  {
    name: "Aug",
    total: 45000,
  },
  {
    name: "Sep",
    total: 48000,
  },
  {
    name: "Oct",
    total: 52000,
  },
  {
    name: "Nov",
    total: 58000,
  },
  {
    name: "Dec",
    total: 65000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Bar dataKey="total" fill="#ec4899" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
