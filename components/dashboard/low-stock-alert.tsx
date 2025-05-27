import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface LowStockItem {
  id: number
  name: string
  category: string
  currentStock: number
  minStock: number
  image: string
}

const lowStockItems: LowStockItem[] = [
  {
    id: 1,
    name: "Rose Gold Highlighter",
    category: "Makeup",
    currentStock: 8,
    minStock: 15,
    image: "/placeholder-tsrr3.png",
  },
  {
    id: 2,
    name: "Hyaluronic Acid Serum",
    category: "Skincare",
    currentStock: 5,
    minStock: 20,
    image: "/placeholder-t7rda.png",
  },
  {
    id: 3,
    name: "Matte Foundation SPF 15",
    category: "Makeup",
    currentStock: 12,
    minStock: 25,
    image: "/placeholder-fgey2.png",
  },
  {
    id: 4,
    name: "Vitamin E Night Oil",
    category: "Skincare",
    currentStock: 3,
    minStock: 10,
    image: "/placeholder-pnxeh.png",
  },
  {
    id: 5,
    name: "Charcoal Face Mask",
    category: "Skincare",
    currentStock: 7,
    minStock: 15,
    image: "/placeholder.svg?height=50&width=50&query=face mask tube",
  },
]

export function LowStockAlert() {
  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.id} className="flex items-center">
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>
          <div className="ml-4 flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.category}</p>
          </div>
          <div className="ml-auto text-right">
            <Badge variant={item.currentStock <= 5 ? "destructive" : "outline"} className="mb-1">
              {item.currentStock} left
            </Badge>
            <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
