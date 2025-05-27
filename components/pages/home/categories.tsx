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
    {
      id: 1,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/Untitled-design-11-150x150.png",
      name: "Bestseller",
    },
    {
      id: 2,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/IMG_0772-1-150x150.jpeg",
      name: "Face",
    },
    {
      id: 3,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/IMG_0782-150x150.jpeg",
      name: "Makeup",
    },
    {
      id: 4,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/IMG_0772-1-150x150.jpeg",
      name: "Eyes",
    },
    {
      id: 5,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/IMG_0774-1-150x150.jpeg",
      name: "Lips",
    },
    {
      id: 6,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/Untitled-design-11-150x150.png",
      name: "MakeupBrush",
    },
    {
      id: 7,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/Untitled-design-11-150x150.png",
      name: "SkinCare",
    },
    {
      id: 8,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/IMG_0814-150x150.jpeg",
      name: "BodyCare",
    },
    {
      id: 9,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/IMG_0772-1-150x150.jpeg",
      name: "PerfumeAndFragrances",
    },
    {
      id: 11,
      image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto",
      name: "HairCare",
    },
    {
      id: 15,
      image: "https://media.ulta.com/i/ulta/tools-brushes-bubble?w=200&h=200&fmt=auto",
      name: "BestsellerSkincare",
    },
    {
      id: 17,
      image: "https://media.ulta.com/i/ulta/makeup-bubble?w=200&h=200&fmt=auto",
      name: "NewArrivals",
    },
  ]

  return (
    <div>
      <div className="px-6 py-10 md:py-14 relative main">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 font-heading">Shop By Category</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
          {Categoriess.map((category) => (
            <div key={category.id} className="bg-white rounded-lg w-[150px]">
              <div className="flex justify-center mb-2">
                <img
                  src={category.image || DEFAULT_AVATAR}
                  alt={`Image of ${category.name}`}
                  className="rounded-full w-[150px] h-[150px] p-1 object-cover"
                />
              </div>
              <div className="text-center px-2 pb-3">
                <h5 className="text-md font-medium text-gray-700">{category.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories;
