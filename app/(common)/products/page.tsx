"use client"

import { useState, useEffect } from "react"
import { FaChevronDown, FaHeart, FaMapMarkerAlt, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa"
import { BsGrid, BsGrid1X2, BsGrid3X3, BsGrid3X3Gap, BsGrid3X3GapFill, BsListUl } from "react-icons/bs"
import { AiFillStar, AiOutlineHeart, AiOutlineShopping, AiOutlineClose, AiOutlineFilter } from "react-icons/ai"

const BeautyProductsPage = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [cardsPerRow, setCardsPerRow] = useState<3 | 4 | 5>(4)
  const [selectedOption, setSelectedOption] = useState<"asc" | "desc">("asc")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Static data for beauty products
  const products = [
    {
      id: "1",
      name: "Duo Brush-On Adhesive (Lash Glue)",
      brand: "DUO",
      price: "$0.00",
      previousPrice: "",
      discount: "Sold out",
      rating: 0,
      image: "https://media.ulta.com/i/ulta/2639705?w=400&$ProductCardNeutralBGLight$&fmt=autog",
      category: "NAILS",
      location: "New York, USA",
      isFavorite: true,
      isNew: false,
      isTopSelling: false,
    },
    {
      id: "2",
      name: "Fenty Beauty Diamond Bomb All Over Diamond Veil Highlighter - How Many Carats",
      brand: "FENTY BEAUTY",
      price: "$68.50",
      previousPrice: "$72.50",
      discount: "6% OFF",
      rating: 4.7,
      image: "https://fentybeauty.com/cdn/shop/files/64646_472x562.jpg?v=1689963948",
      category: "MAKEUP",
      location: "Los Angeles, USA",
      isFavorite: false,
      isNew: true,
      isTopSelling: true,
    },
    {
      id: "3",
      name: "SEPHORA COLLECTION 12H Colorful Contour Eye Pencil Waterproof Eyeliner",
      brand: "SEPHORA",
      price: "$26.50",
      previousPrice: "$28.50",
      discount: "7% OFF",
      rating: 4.5,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      category: "MAKEUP",
      location: "Paris, France",
      isFavorite: false,
      isNew: false,
      isTopSelling: true,
    },
    {
      id: "4",
      name: "Huda Beauty #FAUXFILTER Under Eye Color Corrector",
      brand: "HUDA BEAUTY",
      price: "$52.50",
      previousPrice: "$56.50",
      discount: "7% OFF",
      rating: 4.8,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      category: "MAKEUP",
      location: "Dubai, UAE",
      isFavorite: true,
      isNew: true,
      isTopSelling: false,
    },
    {
      id: "5",
      name: "Summer Fridays Lip Butter Balm 0.5oz",
      brand: "SUMMER FRIDAYS",
      price: "$42.50",
      previousPrice: "$46.50",
      discount: "9% OFF",
      rating: 4.6,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      category: "LIPS",
      location: "Miami, USA",
      isFavorite: false,
      isNew: true,
      isTopSelling: true,
    },
    {
      id: "6",
      name: "Rare Beauty Soft Pinch Liquid Blush",
      brand: "RARE BEAUTY",
      price: "$23.00",
      previousPrice: "$28.00",
      discount: "18% OFF",
      rating: 4.9,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      category: "MAKEUP",
      location: "Los Angeles, USA",
      isFavorite: true,
      isNew: false,
      isTopSelling: true,
    },
    {
      id: "7",
      name: "Glow Recipe Watermelon Glow Niacinamide Dew Drops",
      brand: "GLOW RECIPE",
      price: "$34.00",
      previousPrice: "$38.00",
      discount: "10% OFF",
      rating: 4.7,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      category: "SKINCARE",
      location: "Seoul, Korea",
      isFavorite: false,
      isNew: true,
      isTopSelling: false,
    },
    {
      id: "8",
      name: "Olaplex No. 3 Hair Perfector",
      brand: "OLAPLEX",
      price: "$28.00",
      previousPrice: "$30.00",
      discount: "7% OFF",
      rating: 4.8,
      image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      category: "HAIR",
      location: "New York, USA",
      isFavorite: false,
      isNew: false,
      isTopSelling: true,
    },
  ]

  // Static categories data
  const categories = [
    { id: "1", name: "MAKEUP" },
    { id: "2", name: "SKINCARE" },
    { id: "3", name: "HAIR" },
    { id: "4", name: "NAILS" },
    { id: "5", name: "FRAGRANCE" },
  ]

  // Static rating counts
  const ratingCounts = {
    5: 42,
    4: 28,
    3: 15,
    2: 7,
    1: 3,
  }

  const tabs = [
    { id: "all", label: "All" },
    { id: "latest", label: "Latest" },
    { id: "top-selling", label: "Top Selling" },
  ]

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleOptionClick = (option: "asc" | "desc") => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }

  // Close mobile sidebar when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && showMobileSidebar) {
        setShowMobileSidebar(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [showMobileSidebar])

  // Simple rating component
  const Rating = ({ rating }: { rating: number }) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />)
      }
    }
    return <div className="flex">{stars}</div>
  }

  const renderStars = (count: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= count) {
        stars.push(<FaStar key={i} className="text-yellow-400 ml-2" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 ml-2" />)
      }
    }
    return stars
  }

  // Filter products based on active tab
  const filteredProducts =
    activeTab === "all"
      ? products
      : activeTab === "latest"
        ? products.filter((product) => product.isNew)
        : products.filter((product) => product.isTopSelling)

  // Get grid columns class based on cardsPerRow
  const getGridColumnsClass = () => {
    switch (cardsPerRow) {
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      case 5:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
    }
  }

  // Sidebar filter component
  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div
      className={`${
        isMobile
          ? "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex md:hidden"
          : "col-span-4 md:col-span-1 mx-4 md:mx-0 rounded-md"
      } ${isMobile && !showMobileSidebar ? "hidden" : ""}`}
    >
      <div
        className={`${
          isMobile ? "w-[280px] max-w-[80vw] h-full bg-white overflow-y-auto relative" : "w-full md:block"
        }`}
      >
        {isMobile && (
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-lg">Filters</h3>
            <button onClick={() => setShowMobileSidebar(false)} className="p-2 rounded-full hover:bg-gray-100">
              <AiOutlineClose className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="p-4">
          {/* Keyword Search */}
          <div className="bg-pink-100 rounded-lg">
            <div className="p-6">
              <p className="text-lg font-semibold text-gray-800 mb-4">Keyword</p>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-[#FF80AB] focus:shadow-outline transition duration-300 ease-in-out font-md"
                placeholder="What are you looking for?"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="w-full py-4">
            <div className="flex flex-col rounded-md py-6 bg-pink-100">
              <p className="text-[#32353C] py-1 px-4 font-semibold text-lg">Categories</p>
              {categories.map((category) => (
                <div key={category.id} className="w-full px-5 py-2 rounded-md flex items-center">
                  <label className="cursor-pointer flex items-center">
                    <input className="checkbox checkbox-md" type="checkbox" style={{ accentColor: "#FF80AB" }} />
                    <span className="text-sm text-gray-500 font-sm ml-2">{category.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="bg-pink-100 rounded-lg py-4">
            <div className="p-6">
              <p className="text-xl font-semibold text-gray-800 mb-4">Brand</p>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-[#FF80AB] focus:shadow-outline transition duration-300 ease-in-out font-md"
                placeholder="Search brands"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="bg-pink-100 rounded-lg mt-4 p-6">
            <p className="text-lg font-semibold text-gray-800 mb-4">Rating</p>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`rating-${stars}${isMobile ? "-mobile" : ""}`}
                    className="mr-2 h-4 w-4 text-[#FF80AB] border-gray-300 rounded focus:ring-[#FF80AB]"
                  />
                  <label htmlFor={`rating-${stars}${isMobile ? "-mobile" : ""}`} className="flex items-center text-lg">
                    {renderStars(stars)}
                    <span className="pl-10 text-gray-600 text-sm font-normal">0</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {isMobile && (
            <div className="mt-6 p-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="w-full py-3 bg-[#FF80AB] text-white rounded-lg font-medium"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="md:px-[4rem] py-6">
      <section>
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center gap-2 text-sm ">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-700 hover:text-[#FF80AB] transition-colors ml-4 md:ml-0"
            >
              <AiOutlineFilter className="w-5 h-5" />
              <span className="font-medium">{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>

            <button
              onClick={() => setShowMobileSidebar(true)}
              className="md:hidden flex items-center gap-2 text-gray-700 hover:text-[#FF80AB] transition-colors ml-4"
            >
              <AiOutlineFilter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mr-4 md:mr-0">
            {/* View mode toggle - Fixed to always show regardless of current view mode */}
            <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-md p-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded ${viewMode === "list" ? "bg-gray-200" : ""}`}
                aria-label="List view"
              >
                <BsListUl size={18} />
              </button>
              <button
                onClick={() => {
                  setViewMode("grid")
                  setCardsPerRow(3)
                }}
                className={`p-1 rounded ${viewMode === "grid" && cardsPerRow === 3 ? "bg-gray-200" : ""}`}
                aria-label="3 cards per row"
              >
                <BsGrid1X2 size={18} />
              </button>
              <button
                onClick={() => {
                  setViewMode("grid")
                  setCardsPerRow(4)
                }}
                className={`p-1 rounded ${viewMode === "grid" && cardsPerRow === 4 ? "bg-gray-200" : ""}`}
                aria-label="4 cards per row"
              >
                <BsGrid size={18} />
              </button>
              <button
                onClick={() => {
                  setViewMode("grid")
                  setCardsPerRow(5)
                }}
                className={`p-1 rounded ${viewMode === "grid" && cardsPerRow === 5 ? "bg-gray-200" : ""}`}
                aria-label="5 cards per row"
              >
                <BsGrid3X3Gap size={18} />
              </button>
            </div>

            <div className="relative text-sm ">
              <button
                onClick={toggleDropdown}
                className={`text-black border border-gray-400 px-4 py-2 rounded flex items-center`}
              >
                {selectedOption === "asc" ? "Price Low to High" : "Price High to Low"}
                <FaChevronDown className={`ml-2 ${isDropdownOpen ? "transform rotate-180" : ""}`} size={14} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 w-48 bg-white border rounded shadow-lg z-10">
                  <p
                    onClick={() => handleOptionClick("asc")}
                    className={`block px-4 py-2 cursor-pointer ${
                      selectedOption === "asc"
                        ? "bg-[#FF80AB] text-white"
                        : "text-gray-700 hover:bg-pink-100 hover:text-black"
                    }`}
                  >
                    Price Low to High
                  </p>
                  <p
                    onClick={() => handleOptionClick("desc")}
                    className={`block px-4 py-2 cursor-pointer ${
                      selectedOption === "desc"
                        ? "bg-[#FF80AB] text-white"
                        : "text-gray-700 hover:bg-pink-100 hover:text-black"
                    }`}
                  >
                    Price High to Low
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-4">
          {/* Sidebar - only show when filters are visible */}
          {showFilters && <FilterSidebar />}

          {/* Mobile Sidebar */}
          <FilterSidebar isMobile={true} />

          {/* Main Content */}
          <div className={`col-span-4 ${showFilters ? "md:col-span-3" : "md:col-span-4"} mx-4 my-4 md:mx-0 md:my-0`}>
            {viewMode === "list" ? (
              // List View
              <>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white border px-3 rounded-lg overflow-hidden w-full mx-auto mb-3">
                    <div className="flex flex-col md:flex-row py-2">
                      <div
                        className="relative w-full md:w-1/3 group"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <div className="absolute top-0 left-0 z-10 flex gap-1">
                          {product.discount && (
                            <span className="bg-white text-black text-xs px-2 py-1">{product.discount}</span>
                          )}
                          {product.isNew && <span className="bg-[#FF80AB] text-white text-xs px-2 py-1">NEW</span>}
                        </div>

                        <img
                          className="w-full h-auto md:h-48 object-cover rounded-lg"
                          alt={product.name}
                          src={product.image || "/placeholder.svg"}
                        />

                        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer">
                          {product.isFavorite ? (
                            <FaHeart className="text-[#FF80AB]" />
                          ) : (
                            <FaRegHeart className="text-gray-500" />
                          )}
                        </div>
                      </div>

                      <div className="px-0 md:px-8 py-4 md:py-0 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-xl font-semibold mt-2">
                              <a
                                href={`#${product.id}`}
                                className="text-gray-900 hover:text-[#FF80AB] transition-colors"
                              >
                                {product.name}
                              </a>
                            </h3>
                            <p className="bg-[#f7f7ff] text-[#FF80AB] border border-transparent hover:border-[#FF80AB] px-4 py-2 rounded text-sm font-semibold hover:bg-white">
                              {product.category}
                            </p>
                          </div>

                          <p className="text-sm font-medium text-gray-500 mt-1">{product.brand}</p>

                          <p className="text-gray-600 mt-2 flex items-center text-sm">
                            <FaMapMarkerAlt className="mr-2" /> {product.location}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center">
                          <span className="text-yellow-500 flex items-center">
                            <Rating rating={product.rating} />
                            <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                          </span>
                        </div>

                        <div className="mt-2 flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold text-gray-900">{product.price}</span>
                            {product.previousPrice && (
                              <span className="line-through text-gray-500 ml-2 text-sm">{product.previousPrice}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                              <AiOutlineHeart className="w-4 h-4 text-gray-600" />
                            </button>
                            <a
                              href={`#${product.id}`}
                              className="text-white bg-[#FF80AB] hover:bg-[#AD1457] py-2 px-6 rounded-md flex items-center"
                            >
                              <AiOutlineShopping className="w-4 h-4 mr-2" />
                              Add to Cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // Grid View
              <div
                className={`grid ${getGridColumnsClass()} gap-4`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden h-[380px] flex flex-col">
                    <div className="relative group h-full flex flex-col">
                      <div className="relative overflow-hidden h-[220px]">
                        <div className="absolute top-0 left-0 z-10 flex gap-1">
                          {product.discount && (
                            <span className="bg-white text-black text-xs px-2 py-1">{product.discount}</span>
                          )}
                          {product.isNew && <span className="bg-[#FF80AB] text-white text-xs px-2 py-1">NEW</span>}
                        </div>

                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>

                      <div className="flex-grow flex flex-col py-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-semibold text-gray-700">{product.brand}</h4>
                          <div className="flex items-center">
                            <AiFillStar className="h-3.5 w-3.5 text-yellow-400" />
                            <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
                          </div>
                        </div>

                        <h5 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h5>

                        <div className="flex justify-between items-center mt-auto">
                          <div>
                            <span className="text-sm font-semibold text-gray-800">{product.price}</span>
                            {product.previousPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">{product.previousPrice}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <AiOutlineHeart className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500 transition-colors" />
                            <AiOutlineShopping className="w-5 h-5 cursor-pointer text-gray-600 hover:text-[#FF80AB] transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Static Pagination */}
            <div className="flex items-center justify-end mt-10">
              <nav className="flex items-center space-x-1">
                <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 rounded-md bg-[#FF80AB] text-white">1</button>
                <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BeautyProductsPage
