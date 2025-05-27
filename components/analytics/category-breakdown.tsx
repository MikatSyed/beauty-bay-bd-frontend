"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "@/components/ui/chart"

interface CategoryBreakdownProps {
  showDetails?: boolean
}

export function CategoryBreakdown({ showDetails = false }: CategoryBreakdownProps) {
  const data = [
    { name: "Skincare", value: 45, color: "#ec4899" },
    { name: "Makeup", value: 30, color: "#9333ea" },
    { name: "Haircare", value: 15, color: "#3b82f6" },
    { name: "Fragrance", value: 10, color: "#10b981" },
  ]

  const detailedData = [
    { name: "Facial Serums", category: "Skincare", value: 20, color: "#ec4899" },
    { name: "Moisturizers", category: "Skincare", value: 15, color: "#f472b6" },
    { name: "Cleansers", category: "Skincare", value: 10, color: "#fbcfe8" },
    { name: "Lipsticks", category: "Makeup", value: 12, color: "#9333ea" },
    { name: "Foundations", category: "Makeup", value: 10, color: "#a855f7" },
    { name: "Eye Products", category: "Makeup", value: 8, color: "#c4b5fd" },
    { name: "Shampoos", category: "Haircare", value: 8, color: "#3b82f6" },
    { name: "Conditioners", category: "Haircare", value: 7, color: "#60a5fa" },
    { name: "Perfumes", category: "Fragrance", value: 6, color: "#10b981" },
    { name: "Body Sprays", category: "Fragrance", value: 4, color: "#34d399" },
  ]

  const displayData = showDetails ? detailedData : data

  return (
    <div className="flex h-full flex-col">
      <ResponsiveContainer width="100%" height={showDetails ? "60%" : "100%"}>
        <PieChart>
          <Pie
            data={displayData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Revenue Share"]}
            contentStyle={{
              backgroundColor: "white",
              borderColor: "#e5e7eb",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {showDetails && (
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Product Category</th>
                <th className="pb-2 text-left font-medium">Revenue</th>
                <th className="pb-2 text-left font-medium">Share</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      {item.name}
                    </div>
                  </td>
                  <td className="py-2">${(item.value * 1000).toLocaleString()}</td>
                  <td className="py-2">{item.value}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
