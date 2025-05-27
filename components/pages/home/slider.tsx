"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { motion, AnimatePresence } from "framer-motion"
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";


// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

// Slider data
const sliderData = [
  {
    id: 1,
    image:
      "/assets/slider/AdobeStock_1211526367_Preview.jpeg",
    title: "Summer Essentials",
    subtitle: "EXCLUSIVE COLLECTION",
    description:
      "Discover our curated selection of premium summer essentials with up to 50% off selected items. Elevate your wardrobe with luxurious fabrics and sophisticated designs.",
    cta: "Explore Collection",
    link: "#",
    accent: "from-amber-900/80 to-transparent",
    textColor: "text-white",
    buttonStyle: "bg-white text-amber-900 hover:bg-amber-900 hover:text-white",
    position: "left",
  },
  {
    id: 2,
    image:
      "/assets/slider/AdobeStock_681030286_Preview.jpeg",
    title: "Luxury Skincare",
    subtitle: "PREMIUM BEAUTY",
    description:
      "Indulge in our collection of high-end skincare formulated with rare ingredients and advanced technology. Experience transformative results for radiant, youthful skin.",
    cta: "Shop Now",
    link: "#",
    accent: "from-rose-900/80 to-transparent",
    textColor: "text-white",
    buttonStyle: "bg-white text-rose-900 hover:bg-rose-900 hover:text-white",
    position: "left",
  },
  {
    id: 3,
    image:
      "/assets/slider/AdobeStock_969080310_Preview.jpeg",
    title: "Signature Collection",
    subtitle: "NEW ARRIVALS",
    description:
      "Discover our latest arrivals featuring exclusive designs and limited-edition pieces. Crafted with exceptional attention to detail for the discerning customer.",
    cta: "View Collection",
    link: "#",
    accent: "from-slate-900/80 to-transparent",
    textColor: "text-white",
    buttonStyle: "bg-white text-slate-900 hover:bg-slate-900 hover:text-white",
    position: "right",
  },
]

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)

  // Progress bar animation
  const [progress, setProgress] = useState(0)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isAutoplayPaused) {
      setProgress(0)
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + 0.5
        })
      }, 17.5) // ~60fps for 3.5 seconds
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [activeIndex, isAutoplayPaused])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsAutoplayPaused(true)
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop()
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setIsAutoplayPaused(false)
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start()
    }
  }

  return (
    <div className="relative overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Premium Slider */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} w-3 h-3 bg-white/50 rounded-full transition-all duration-300 hover:bg-white"></span>`,
        }}
        navigation={false} // We'll use custom navigation
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        className="w-full premium-swiper h-[700px] md:h-[800px]"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`}></div>

              {/* Content */}
              <div
                className={`absolute inset-0 flex items-center ${slide.position === "right" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex flex-col ${slide.position === "right" ? "items-end text-right pr-6 md:pr-20" : "items-start text-left pl-6 md:pl-20"} max-w-lg space-y-6`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div>
                        <span className={`inline-block font-light tracking-widest text-sm mb-2 ${slide.textColor}`}>
                          {slide.subtitle}
                        </span>
                        <h2 className={`font-serif text-4xl md:text-6xl font-bold ${slide.textColor} leading-tight`}>
                          {slide.title}
                        </h2>
                      </div>

                      <p className={`text-sm md:text-base ${slide.textColor} opacity-90 max-w-md leading-relaxed`}>
                        {slide.description}
                      </p>

                      <div className="pt-2">
                        <a
                          href={slide.link}
                          className={`group inline-flex items-center gap-2 px-6 py-3 rounded-none border border-transparent ${slide.buttonStyle} transition-all duration-300 font-medium`}
                        >
                          <span>{slide.cta}</span>
                          <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-8">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-4">
          {sliderData.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeIndex === index ? "scale-110" : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress circle for active slide */}
              {activeIndex === index && !isAutoplayPaused && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="9"
                    strokeWidth="2"
                    stroke="white"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 9}
                    strokeDashoffset={(2 * Math.PI * 9 * (100 - progress)) / 100}
                    className="transition-all duration-300"
                  />
                </svg>
              )}

              {/* Dot indicator */}
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-white w-3 h-3" : "bg-white/50 hover:bg-white"
                }`}
              ></span>
            </button>
          ))}
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
          aria-label="Next slide"
        >
          <FiArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-10 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white font-medium">
          {activeIndex + 1} <span className="opacity-50">/</span> {sliderData.length}
        </span>
      </div>
    </div>
  )
}

export default Slider;
