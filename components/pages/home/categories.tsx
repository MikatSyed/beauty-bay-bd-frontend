"use client"
import type React from "react"

const DEFAULT_AVATAR = "/assets/default-avatar.jpg"

interface CategoriesItem {
  id: number
  image: string
  name: string
}

const Categories: React.FC = () => {
  const Categoriess: CategoriesItem[] = [
    { id: 1, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "Bestseller" },
    { id: 2, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "Face" },
    { id: 3, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "Makeup" },
    { id: 4, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "Eyes" },
    { id: 5, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "Lips" },
    { id: 6, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "MakeupBrush" },
    { id: 7, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "SkinCare" },
    { id: 8, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "BodyCare" },
    { id: 9, image:"https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "PerfumeAndFragrances" },
    { id: 11, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "HairCare" },
    { id: 15, image: "https://media.ulta.com/i/ulta/tools-brushes-bubble?w=200&h=200&fmt=auto", name: "BestsellerSkincare" },
    { id: 17, image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto", name: "NewArrivals" },
  ]

  return (
    <div className="my-[8rem] relative max-w-[2100px] mx-auto">

    <h2 className="relative text-center font-heading font-extrabold text-3xl md:text-4xl tracking-wide uppercase mb-20">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600">
    Shop By Category
  </span>
</h2>



      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {Categoriess.map((category) => (
          <div key={category.id} className="flex flex-col items-center text-center">
            <div className="w-[170px] h-[170px] rounded-full border bg-pink-100 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-200">
              <img
                src={category.image || DEFAULT_AVATAR}
                alt={`Image of ${category.name}`}
                className="w-full h-full object-cover p-4"
              />
            </div>
            <p className="mt-3 text-sm md:text-base font-medium text-gray-700 hover:text-pink-600 transition-colors duration-200">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
