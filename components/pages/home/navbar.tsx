"use client"

import * as React from "react"
import Link from "next/link"
import { RxCross1 } from "react-icons/rx"
import { CiMenuBurger } from "react-icons/ci"

const mainNavItems = [
  { title: "Brands", href: "/brands" },
  { title: "New & Tranding", href: "/new" },
  { title: "Offers", href: "/offers" },
  { title: "Make Up", href: "/men" },
  { title: "Hair", href: "/women" },
  { title: "Skin Care", href: "/mom-kids" },
  { title: "Fragrance", href: "/fragrance" },
  { title: "Body & Wellbeing", href: "/health-beauty" },
  { title: "Mini", href: "/health-beauty" },
  { title: "Men's", href: "/food-supplement" },
  { title: "Blog", href: "/combo" },
  { title: "More Products", href: "/combo" },
]

const brandLetters = [
  "ALL",
  "0-9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "Y",
  "Z",
]

const allBrands: any = {
  ALL: ["Adidas", "Armani", "Burberry", "Balenciaga", "Chanel", "Calvin Klein", "Dior", "Estee Lauder", "7Up", "3M"],
  A: ["Adidas", "Armani"],
  B: ["Burberry", "Balenciaga"],
  C: ["Chanel", "Calvin Klein"],
  D: ["Dior"],
  E: ["Estee Lauder"],
  "0-9": ["7Up", "3M"],
}

// Sample data for other dropdown categories
const categoryData: Record<string, any> = {
  "New & Tranding": {
    categories: ["New Arrivals", "Best Sellers", "Limited Edition", "Exclusive Collections"],
    featured: ["Spring Collection 2024", "Summer Essentials", "Celebrity Picks"],
  },
  Offers: {
    deals: ["Today's Deals", "Clearance", "Buy One Get One", "Flash Sale"],
    discounts: ["10% Off", "20% Off", "30% Off", "50% Off"],
  },
  "Make Up": {
    face: ["Foundation", "Concealer", "Powder", "Blush", "Highlighter", "Contour"],
    eyes: ["Eyeshadow", "Eyeliner", "Mascara", "Eyebrow"],
    lips: ["Lipstick", "Lip Gloss", "Lip Liner", "Lip Balm"],
  },
  Hair: {
    haircare: ["Shampoo", "Conditioner", "Hair Mask", "Hair Oil", "Scalp Treatment"],
    styling: ["Hair Spray", "Mousse", "Gel", "Heat Protectant", "Dry Shampoo"],
    tools: ["Hair Dryer", "Straightener", "Curling Iron", "Brushes & Combs"],
  },
  "Skin Care": {
    cleansers: ["Face Wash", "Cleansing Oil", "Micellar Water", "Exfoliator"],
    treatments: ["Serum", "Face Oil", "Spot Treatment", "Masks"],
    moisturizers: ["Day Cream", "Night Cream", "Eye Cream", "Face Mist"],
  },
  Fragrance: {
    women: ["Eau de Parfum", "Eau de Toilette", "Body Mist", "Gift Sets"],
    men: ["Eau de Parfum", "Eau de Toilette", "Aftershave", "Gift Sets"],
    collections: ["Floral", "Woody", "Oriental", "Fresh", "Citrus"],
  },
  "Body & Wellbeing": {
    bath: ["Body Wash", "Bath Bombs", "Soap", "Bath Salts"],
    body: ["Body Lotion", "Body Scrub", "Body Oil", "Hand Cream"],
    wellness: ["Essential Oils", "Candles", "Diffusers", "Supplements"],
  },
  Mini: {
    travel: ["Travel Kits", "Mini Makeup", "Mini Skincare", "Mini Haircare"],
    sets: ["Gift Sets", "Trial Sets", "Discovery Sets"],
  },
  "Men's": {
    skincare: ["Face Wash", "Moisturizer", "Shaving Cream", "Aftershave"],
    haircare: ["Shampoo", "Conditioner", "Styling Products", "Hair Color"],
    grooming: ["Beard Care", "Body Care", "Deodorant"],
  },
  Blog: {
    articles: ["Beauty Tips", "Product Reviews", "Tutorials", "Trends"],
    videos: ["How-To Videos", "Product Demonstrations", "Expert Advice"],
  },
  "More Products": {
    accessories: ["Makeup Bags", "Brushes", "Applicators", "Storage"],
    tools: ["Mirrors", "Tweezers", "Eyelash Curlers", "Sharpeners"],
    gifts: ["Gift Cards", "Gift Sets", "Special Occasions"],
  },
}

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>("")
  const [activeBrandLetter, setActiveBrandLetter] = React.useState<string>("ALL")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  function cn(...classes: string[]): string {
    return classes.filter(Boolean).join(" ")
  }

  // Function to render dropdown content based on active dropdown
  const renderDropdownContent = () => {
    if (!activeDropdown) return null

    if (activeDropdown === "Brands") {
      return (
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 text-sm border-b pb-2">
            {brandLetters.map((letter) => (
              <button
                key={letter}
                onMouseEnter={() => setActiveBrandLetter(letter)}
                className={cn(
                  "px-2 py-1 transition",
                  activeBrandLetter === letter ? "bg-[#fa9aac] text-white" : "text-gray-800 hover:text-red-500",
                )}
              >
                {letter}
              </button>
            ))}
            <button className="px-2 py-1 text-black hover:text-red-500 transition">View All Brands</button>
          </div>
          <div className="mt-2">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {(allBrands[activeBrandLetter] || []).map((brand: any) => (
                <li key={brand}>
                  <Link href={`/brands/${brand.toLowerCase()}`} className="text-gray-600 hover:text-pink-500">
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    // For other dropdown items
    const data = categoryData[activeDropdown]
    if (!data) return null

    return (
      <div className="container mx-auto px-4 py-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(data).map(([category, items]: [string, any]) => (
            <div key={category} className="mb-4 ">
              <h3 className="font-medium  mb-2 capitalize  p-2">{category}</h3>
              <hr  className="my-2"/>
              <ul className="space-y-1">
                {items.map((item: string) => (
                  <li key={item} className="w-full">
                    <Link
                      href={`/${activeDropdown.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block w-full p-2 text-gray-600 hover:bg-[#fa9aac] hover:text-white text-sm transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <nav className="relative z-50">
      <div className="py-3">
        <div className="container  px-7">
          <div className="flex items-center justify-between lg:justify-start">
            <button className="text-black lg:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isMobileMenuOpen ? <RxCross1 size={24} /> : <CiMenuBurger size={24} />}
            </button>
           <ul className="hidden lg:flex items-center space-x-10 text-[13px]">
  {mainNavItems.map((item) => (
    <li key={item.title} className="whitespace-nowrap">
      <Link
        href={item.href}
        className="block py-2 font-medium text-black hover:text-pink-600 whitespace-nowrap"
        onMouseEnter={() => setActiveDropdown(item.title)}
      >
        {item.title}
      </Link>
    </li>
  ))}
</ul>

          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2">
            <ul className="space-y-2">
              {mainNavItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="block py-2 text-black hover:text-pink-600"
                    onClick={toggleMobileMenu}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Dropdown content for all nav items */}
      {activeDropdown && (
        <div
          className="absolute left-0 right-0 bg-white hidden lg:block shadow-md"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {renderDropdownContent()}
        </div>
      )}
    </nav>
  )
}

