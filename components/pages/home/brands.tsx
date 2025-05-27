"use client"
import type React from "react"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperCore } from "swiper"
// Import Swiper modules
import { Autoplay } from "swiper/modules"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

// Default fallback image for missing profile pictures
const DEFAULT_AVATAR = "/assets/default-avatar.jpg"

interface BrandsItem {
  id: number
  image: string
  name: string
}

// Curved Background Component
interface CurvedBackgroundProps {
  children: React.ReactNode
  className?: string
  backgroundColor?: string
  topCurveColor?: string
  bottomCurveColor?: string
  topCurveStyle?: "wave" | "curve" | "angle"
  bottomCurveStyle?: "wave" | "curve" | "angle"
}

const CurvedBackground: React.FC<CurvedBackgroundProps> = ({
  children,
  className = "",
  backgroundColor = "bg-pink-100",
  topCurveColor = "text-white",
  bottomCurveColor = "text-white",
  topCurveStyle = "curve",
  bottomCurveStyle = "wave",
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Top curve */}
      <div className={`absolute top-0 left-0 w-full overflow-hidden leading-none ${topCurveColor}`}>
        <svg
          className="relative block w-full h-8 sm:h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {topCurveStyle === "wave" && (
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          )}
          {topCurveStyle === "curve" && (
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" fill="currentColor" />
          )}
          {topCurveStyle === "angle" && <path d="M1200 0L0 0 598.97 114.72 1200 0z" fill="currentColor" />}
        </svg>
      </div>

      {/* Main content with background */}
      <div className={`relative ${backgroundColor} pb-12`}>{children}</div>

      {/* Bottom curve */}
      <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 ${bottomCurveColor}`}>
        <svg
          className="relative block w-full h-8 sm:h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {bottomCurveStyle === "wave" && (
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          )}
          {bottomCurveStyle === "curve" && (
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" fill="currentColor" />
          )}
          {bottomCurveStyle === "angle" && <path d="M1200 0L0 0 598.97 114.72 1200 0z" fill="currentColor" />}
        </svg>
      </div>
    </div>
  )
}

export default function  Brands()  {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const handleSwiper = (swiperInstance: SwiperCore) => setSwiper(swiperInstance)

  const handlePrevious = () => swiper?.slidePrev()
  const handleNext = () => swiper?.slideNext()

  // Static data for Brands with category name
  const brandsData: BrandsItem[] = [
    // UK Brands
    {
      id: 1,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Charlotte Tilbury",
    },
    {
      id: 2,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Makeup Revolution",
    },

    // USA Brands
    {
      id: 3,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Fenty Beauty",
    },
    {
      id: 4,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Rare Beauty",
    },

    // Skincare
    {
      id: 5,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "The Ordinary",
    },
    {
      id: 6,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "CeraVe",
    },

    // Makeup
    {
      id: 7,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "NARS",
    },
    {
      id: 8,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Maybelline",
    },

    // Bath & Body
    {
      id: 9,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Bath & Body Works",
    },
    {
      id: 10,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Tree Hut",
    },

    // Perfume
    {
      id: 11,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Dior",
    },
    {
      id: 12,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Jo Malone",
    },

    // Hair Care
    {
      id: 13,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=1676904136",
      name: "Olaplex",
    },
    {
      id: 14,
      image: "https://fantasticlook.al/cdn/shop/collections/ceravebrandlogo.png?v=16769041366",
      name: "Moroccanoil",
    },
  ]

  return (
    <CurvedBackground
      backgroundColor="bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100"
      topCurveColor="text-white"
      bottomCurveColor="text-white"
      topCurveStyle="curve"
      bottomCurveStyle="wave"
      className="my-12"
    >
      <div className="px-6 py-16 md:py-20 relative ">
        <h2 className="text-2xl md:text-3xl font-weight-600 text-center mb-12 ">Shop By Brands</h2>

        <div
          className="relative "
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-pink-300 opacity-50"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-pink-300 opacity-50"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-pink-300 opacity-30"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-pink-300 opacity-30"></div>

          <Swiper
            onSwiper={handleSwiper}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4, spaceBetween: 10 },
              992: { slidesPerView: 6, spaceBetween: 10 },
              1024: { slidesPerView: 8, spaceBetween: 10 },
            }}
            className="custom-swiper h-[200px] "
          >
            {brandsData.map((category) => (
              <SwiperSlide
                key={category.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-2 relative">
                  <img
                    src={category.image || DEFAULT_AVATAR}
                    alt={`Image of ${category.name}`}
                    className="rounded-md w-[150px] h-[147px] p-1"
                  />
                </div>
                <div className="text-center">
                  <h5 className="text-md font-semibold text-gray-700">{category.name}</h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`text-pink-800 bg-white w-10 h-10 flex items-center justify-center rounded-full absolute top-[5.5rem] -translate-y-1/2 left-[-2.5rem] md:left-[0.5rem] z-20 shadow-md hover:bg-pink-50 transition ${
              isHovering ? "opacity-100" : "opacity-0"
            } duration-300`}
            onClick={handlePrevious}
            aria-label="Previous slide"
          >
            <IoIosArrowBack className="w-6 h-6" />
          </button>

          <button
            className={`text-pink-800 bg-white w-10 h-10 flex items-center justify-center rounded-full absolute top-[5.5rem] -translate-y-1/2 right-[-2.5rem] md:right-[0.5rem] z-20 shadow-md hover:bg-pink-50 transition ${
              isHovering ? "opacity-100" : "opacity-0"
            } duration-300`}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <IoIosArrowForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </CurvedBackground>
  )
}


