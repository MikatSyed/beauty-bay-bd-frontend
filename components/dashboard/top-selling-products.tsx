import Image from "next/image"

interface Product {
  id: number
  name: string
  category: string
  sales: number
  revenue: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Hydrating Face Serum",
    category: "Skincare",
    sales: 342,
    revenue: 17100,
    image: "/skincare-serum-bottle.png",
  },
  {
    id: 2,
    name: "Matte Lipstick Collection",
    category: "Makeup",
    sales: 276,
    revenue: 8280,
    image: "/assorted-lipsticks.png",
  },
  {
    id: 3,
    name: "Anti-Aging Night Cream",
    category: "Skincare",
    sales: 213,
    revenue: 10650,
    image: "/cream-jar.png",
  },
  {
    id: 4,
    name: "Volumizing Mascara",
    category: "Makeup",
    sales: 198,
    revenue: 5940,
    image: "/placeholder-674uv.png",
  },
  {
    id: 5,
    name: "Vitamin C Brightening Set",
    category: "Skincare",
    sales: 187,
    revenue: 14960,
    image: "/skincare-set.png",
  },
]

export function TopSellingProducts() {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center">
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="ml-4 flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium">{product.sales} sold</p>
            <p className="text-xs text-muted-foreground">${product.revenue.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
