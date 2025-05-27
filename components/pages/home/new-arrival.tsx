"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Playfair_Display, Montserrat } from "next/font/google"
import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiFillStar,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClose,
  AiOutlineFilter,
} from "react-icons/ai"
import { FaEye } from "react-icons/fa"

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { MdArrowForward } from "react-icons/md"



// Motion animation component (simplified version of framer-motion)
const Motion = ({ children, className, layoutId, transition }: any) => {
  return (
    <div
      className={`${className} transition-all duration-500`}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "9999px",
      }}
    >
      {children}
    </div>
  )
}

const products = [
  {
    id: 1,
    name: "Duo Brush-On Adhesive (Lash Glue)",
    brand: "DUO",
    price: "$0.00",
    previousPrice: "",
    discount: "Sold out",
    rating: 0,
    image: "https://media.ulta.com/i/ulta/2639705?w=400&$ProductCardNeutralBGLight$&fmt=autog",
    category: "NAILS",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
    isNew: false,
    isTopSelling: false,
  },
  {
    id: 2,
    name: "Fenty Beauty Diamond Bomb All Over Diamond Veil Highlighter - How Many Carats",
    brand: "FENTY BEAUTY",
    price: "$68.50",
    previousPrice: "$72.50",
    discount: "6% OFF",
    rating: 4.7,
    image: "https://fentybeauty.com/cdn/shop/files/64646_472x562.jpg?v=1689963948",
    category: "MAKEUP",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
    isNew: true,
    isTopSelling: true,
  },
  {
    id: 3,
    name: "SEPHORA COLLECTION12H Colorful Contour Eye Pencil Waterproof Eyeliner",
    brand: "SEPHORA",
    price: "$26.50",
    previousPrice: "$28.50",
    discount: "7% OFF",
    rating: 4.5,
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "MAKEUP",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
    isNew: false,
    isTopSelling: true,
  },
  {
    id: 4,
    name: "Huda Beauty #FAUXFILTER Under Eye Color Corrector",
    brand: "HUDA BEAUTY",
    price: "$52.50",
    previousPrice: "$56.50",
    discount: "7% OFF",
    rating: 4.8,
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "MAKEUP",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
    isNew: true,
    isTopSelling: false,
  },
  {
    id: 5,
    name: "Summer Fridays Lip Butter Balm 0.5oz",
    brand: "SUMMER FRIDAYS",
    price: "$42.50",
    previousPrice: "$46.50",
    discount: "9% OFF",
    rating: 4.6,
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "LIPS",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://media.ulta.com/i/ulta/2639705?w=400&$ProductCardNeutralBGLight$&fmt=autog",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
    isNew: true,
    isTopSelling: true,
  },
  {
    id: 6,
    name: "Summer Fridays Lip Butter Balm 0.5oz",
    brand: "SUMMER FRIDAYS",
    price: "$42.50",
    previousPrice: "$46.50",
    discount: "9% OFF",
    rating: 4.6,
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "LIPS",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
    isNew: false,
    isTopSelling: false,
  },
  {
    id: 7,
    name: "Summer Fridays Lip Butter Balm 0.5oz",
    brand: "SUMMER FRIDAYS",
    price: "$42.50",
    previousPrice: "$46.50",
    discount: "9% OFF",
    rating: 4.6,
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "LIPS",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
    isNew: true,
    isTopSelling: false,
  },
]

export default function NewArrival() {
  const [isHovering, setIsHovering] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [filteredProducts, setFilteredProducts] = useState(products)

  const tabs = [
    { id: "all", label: "All" },
    { id: "latest", label: "Latest" },
    { id: "top-selling", label: "Top Selling" },
  ]

  const categories = Array.from(new Set(products.map((product) => product.category)))

  useEffect(() => {
    let filtered = [...products]

    // Filter by tab
    if (activeTab === "latest") {
      filtered = filtered.filter((product) => product.isNew)
    } else if (activeTab === "top-selling") {
      filtered = filtered.filter((product) => product.isTopSelling)
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = Number.parseFloat(product.price.replace("$", ""))
      return price >= priceRange[0] && price <= priceRange[1]
    })

    setFilteredProducts(filtered)

    // Reset swiper when filters change
    if (swiperRef.current) {
      swiperRef.current.update()
      swiperRef.current.slideTo(0)
    }
  }, [activeTab, selectedCategories, priceRange])

  const handleQuickView = (product: any) => {
    setSelectedProduct(product)
    setSelectedImage(0)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleNext = () => swiperRef.current?.slideNext()
  const handlePrevious = () => swiperRef.current?.slidePrev()

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number.parseInt(e.target.value)
    setPriceRange((prev) => {
      const newRange = [...prev] as [number, number]
      newRange[index] = value
      return newRange
    })
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 100])
  }

  return (
    <div className="px-6 py-10 md:py-14 relative">
    
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 bg-white/80 rounded-full p-1.5 backdrop-blur-sm"
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-gray-50">
                <div className="relative w-full aspect-square">
                  <Image
                    src={
                      selectedProduct.images?.[selectedImage] ||
                      selectedProduct.image ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={`${selectedProduct.name} - View ${selectedImage + 1}`}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <div className="flex md:flex-row gap-2 p-4 overflow-x-auto md:overflow-y-auto md:h-[120px] md:max-h-[120px]">
                  {(selectedProduct.images || [selectedProduct.image]).map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative min-w-[60px] w-[60px] h-[60px] rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-black shadow-md" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{selectedProduct.brand}</p>
                    <h3 className="text-2xl font-semibold text-gray-900 font-heading">{selectedProduct.name}</h3>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <AiFillStar className="w-4 h-4 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{selectedProduct.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">• 142 Reviews</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">{selectedProduct.price}</span>
                      {selectedProduct.previousPrice && (
                        <span className="text-sm text-gray-500 line-through">{selectedProduct.previousPrice}</span>
                      )}
                    </div>
                    {selectedProduct.discount && selectedProduct.discount !== "Sold out" && (
                      <p className="text-sm text-green-600 font-medium mt-1">{selectedProduct.discount}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <p className="text-gray-700 font-body">{selectedProduct.description}</p>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-[#FF80AB] text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium">
                        Add to Cart
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium">
                        Checkout Now
                      </button>
                    </div>

                    <div className="pt-2">
                      <p className="text-sm text-gray-500">Free shipping on orders over $35</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedProduct.discount === "Sold out"
                          ? "Out of stock • Sign up for notifications"
                          : "In stock • Ships within 1-2 business days"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Section Header with Filtering */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex space-x-12">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Shop By Product</h2>
            <div className="flex space-x-1  p-1 rounded-full w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === tab.id ? "text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {activeTab === tab.id && (
                  <Motion
                    layoutId="activeTabIndicator"
                    className="bg-[#FF80AB] rounded-full"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
            </div>
            <p className="font-body text-sm text-gray-500 max-w-2xl mt-4">
              Explore our curated collection of premium beauty essentials and handpicked 
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
      <a
        href="#"
        className="flex items-center text-sm font-medium text-[#FF80AB] hover:text-[#AD1457] transition-colors duration-200"
      >
        <span>View All</span>
        <MdArrowForward className="ml-1 h-4 w-4" />
      </a>
    </div>
        </div>

        <div className="relative mt-6">
      

        

          <div className="h-px bg-gradient-to-r from-[#FF80AB]/20 via-[#FF80AB]/40 to-transparent mt-6" />
        </div>
      </div>

      <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-xl font-heading font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md font-body">
              Try adjusting your filters or browse our other collections to find what you're looking for.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2 bg-[#FF80AB] text-white rounded-full hover:bg-[#AD1457] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop={filteredProducts.length > 5}
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              992: { slidesPerView: 4, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className="h-[380px]"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id} className="bg-white rounded-lg">
                <div className="relative group h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 z-10 flex gap-1">
                      {product.discount && (
                        <span className="bg-white text-black text-xs px-2 py-1">{product.discount}</span>
                      )}
                      {product.isNew && <span className="bg-[#FF80AB] text-white text-xs px-2 py-1">NEW</span>}
                    </div>

                    <div className="w-full h-[300px] relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={`Image of ${product.name}`}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleQuickView(product)}
                          className="flex items-center gap-2 text-sm px-12 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-[#FF80AB] text-white hover:border"
                        >
                          <FaEye className="w-4 h-4" />
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col py-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-semibold text-gray-700 font-heading">{product.brand}</h4>
                      <div className="flex items-center">
                        <AiFillStar className="h-3.5 w-3.5 text-yellow-400" />
                        <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                      </div>
                    </div>

                    <h5 className="text-sm font-medium text-gray-900 mb-2 font-body">
                      {product.name.length > 60 ? `${product.name.slice(0, 60)}...` : product.name}
                    </h5>

                    <div className="flex justify-between items-center mt-auto">
                      <div>
                        <span className="text-sm font-semibold text-gray-800">{product.price}</span>
                        {product.previousPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">{product.previousPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <AiOutlineHeart className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FF80AB] hover:bg-[#AD1457] transition-colors">
                          <AiOutlineShopping className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {filteredProducts.length > 0 && (
          <>
            <button
              className={`text-black bg-white w-12 h-12 flex items-center justify-center rounded-full absolute top-[9rem] -translate-y-1/2 left-[-2.5rem] md:left-[0.5rem] z-20 shadow-md hover:bg-gray-100 transition ${
                isHovering ? "opacity-100" : "opacity-0"
              } duration-300`}
              onClick={handlePrevious}
            >
              <AiOutlineLeft className="w-6 h-6" />
            </button>

            <button
              className={`text-black bg-white w-12 h-12 flex items-center justify-center rounded-full absolute top-[9rem] -translate-y-1/2 right-[-2.5rem] md:right-[0.5rem] z-20 shadow-md hover:bg-gray-100 transition ${
                isHovering ? "opacity-100" : "opacity-0"
              } duration-300`}
              onClick={handleNext}
            >
              <AiOutlineRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
