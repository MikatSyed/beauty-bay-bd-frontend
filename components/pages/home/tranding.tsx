"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiFillStar,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClose,
} from "react-icons/ai"
import { FaEye, FaVolumeUp, FaVolumeMute, FaPlus } from "react-icons/fa"

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"

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
    video: "https://youtube.com/shorts/VEcUtVgv0Jw",
    category: "NAILS",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
  },
  {
    id: 2,
    name: "Fenty Beauty Diamond Bomb All Over Diamond Veil Highlighter",
    brand: "FENTY BEAUTY",
    price: "$68.50",
    previousPrice: "$72.50",
    discount: "6% OFF",
    rating: 4.7,
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    video: "https://youtube.com/shorts/VEcUtVgv0Jw",
    category: "MAKEUP",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
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
    video: "https://youtube.com/shorts/VEcUtVgv0Jw",
    category: "MAKEUP",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
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
    video: "https://youtube.com/shorts/VEcUtVgv0Jw",
    category: "MAKEUP",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
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
    video: "https://youtube.com/shorts/VEcUtVgv0Jw",
    category: "LIPS",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://media.ulta.com/i/ulta/2639705?w=400&$ProductCardNeutralBGLight$&fmt=autog",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
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
    video: "https://youtube.com/shorts/VEcUtVgv0Jw",
    category: "LIPS",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
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
    video: "https://youtube.com/shorts/VEcUtVgv0Jw",
    category: "LIPS",
    description: "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
  },
]

export default function Tranding() {
  const [isHovering, setIsHovering] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<(HTMLElement | null)[]>([])

  const getYouTubeVideoId = (url: string) => {
    if (!url) return ""

    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/)([^#&?]*).*/
    const match = url.match(regExp)

    return match && match[2].length === 11 ? match[2] : ""
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&showinfo=0&rel=0` : ""
  }

  useEffect(() => {
    // For YouTube videos, we need to handle them differently
    // The videoRefs now contain the parent elements of iframes

    // When active index changes, we reload the iframes with the appropriate parameters
    setActiveIndex((prevIndex) => {
      // This will trigger a re-render with the updated iframe src attributes
      return activeIndex
    })
  }, [activeIndex, isMuted])

  const handleQuickView = (product: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedProduct(product)
    setSelectedImage(0)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      swiperRef.current?.slideNext()
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      swiperRef.current?.slidePrev()
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768
    }
    return false
  }

  const handleSlideClick = (index: number) => {
    if (!isAnimating && swiperRef.current) {
      setIsAnimating(true)

      // Use the actual index in the loop context
      const realIndex = index % products.length

      // On mobile, just slide to the index without complex calculations
      if (isMobile()) {
        swiperRef.current.slideToLoop(realIndex, 500)
        setTimeout(() => setIsAnimating(false), 500)
        return
      }

      const currentIndex = swiperRef.current.realIndex

      // Calculate the shortest path to the target slide
      let slidesToMove = realIndex - currentIndex

      // Handle wrapping around for the shortest path
      if (Math.abs(slidesToMove) > products.length / 2) {
        slidesToMove = slidesToMove > 0 ? slidesToMove - products.length : slidesToMove + products.length
      }

      // Slide to the target position
      swiperRef.current.slideToLoop(realIndex, 500)

      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const handleVideoError = (index: number) => {
    console.error(`Video ${index} failed to load`)
  }

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      // Force a re-render when window size changes
      setActiveIndex(activeIndex)
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [activeIndex])

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
                  {selectedProduct.video ? (
                    <iframe
                      src={`${getYouTubeEmbedUrl(selectedProduct.video)}?autoplay=1&controls=1${isMuted ? "&mute=1" : ""}`}
                      title={`${selectedProduct.name} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="w-full h-full object-contain p-4"
                      frameBorder="0"
                      allowFullScreen
                    />
                  ) : (
                    <Image
                      src={
                        selectedProduct.images?.[selectedImage] ||
                        selectedProduct.image ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={`${selectedProduct.name} - View ${selectedImage + 1}`}
                      fill
                      className="object-contain p-4"
                    />
                  )}
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
                    <h3 className="text-2xl font-semibold text-gray-900">{selectedProduct.name}</h3>

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
                    <p className="text-gray-700">{selectedProduct.description}</p>
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

      <div className=" mb-8 ">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Trending Now: Must-Have Beauty & Care Essential</h2>
       
      </div>

      <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
          }}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          speed={500}
          modules={[Autoplay, Navigation, EffectCoverflow]}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            992: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          className="py-10"
        >
          {products.map((product, index) => (
            <SwiperSlide
              key={product.id}
              className="bg-white rounded-lg transition-all duration-500 flex items-center justify-center cursor-pointer"
              onClick={() => handleSlideClick(index)}
            >
              {({ isActive }) => (
                <div
                  className={`relative group h-full flex flex-col transition-all duration-500 ${
                    isActive ? " z-10" : ""
                  }`}
                  style={{
                    height: isActive ? "420px" : "380px",
                    width: "100%",
                    maxWidth: isActive ? "100%" : "90%",
                    margin: "0 auto",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    transition: "all 500ms ease",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-[380px] md:w-[300px] md:h-[380px] relative">
                      <div
                        className="absolute inset-0 z-10 cursor-pointer"
                        onClick={() => !isActive && handleSlideClick(index)}
                      ></div>
                      <iframe
                        ref={(el) => {
                          // Store a reference to the iframe's parent element for control purposes
                          if (el) videoRefs.current[index] = el.parentElement as any
                        }}
                        src={
                          isActive
                            ? `${getYouTubeEmbedUrl(product.video)}${isMuted ? "&mute=1" : "&mute=0"}&autoplay=1&loop=1&playlist=${getYouTubeVideoId(product.video)}`
                            : `${getYouTubeEmbedUrl(product.video)}?mute=1&controls=0`
                        }
                        title={`${product.name} video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="absolute inset-0 w-full h-full rounded-lg"
                        frameBorder="0"
                      />

                      {isActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsMuted(!isMuted)
                          }}
                          className="absolute bottom-2 right-2 z-10 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                          {isMuted ? <FaVolumeMute className="w-4 h-4" /> : <FaVolumeUp className="w-4 h-4" />}
                        </button>
                      )}

                    
                    </div>
                  </div>

                  <div className="flex py-3">
  {/* Product Image */}
  <img
    src={product.image}
    alt={product.name}
    className="w-[60px] h-[60px] object-cover rounded-lg mr-4"
  />

  {/* Product Info */}
  <div className="flex-grow flex flex-col">
    {/* Name */}
    <h5 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
      {product.name}
    </h5>

    {/* Price and Button */}
    <div className="flex justify-between items-center ">
      <div className="mt-[-10px]">
        <span className="text-sm font-semibold text-gray-800">
          {product.price}
        </span>
        {product.previousPrice && (
          <span className="text-sm text-gray-500 line-through ml-2">
            {product.previousPrice}
          </span>
        )}
      </div>

      <button className="w-8 h-8 flex items-center justify-center bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors mt-[-5px]">
        <FaPlus className="w-4 h-4" />
      </button>
    </div>
  </div>
</div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`text-black bg-white w-10 h-10 flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 left-[-5px] md:left-[10px] z-20 shadow-md hover:bg-gray-100 transition ${
            isHovering ? "opacity-100" : "opacity-0"
          } duration-300`}
          onClick={handlePrevious}
          disabled={isAnimating}
        >
          <AiOutlineLeft className="w-6 h-6" />
        </button>

        <button
          className={`text-black bg-white w-10 h-10 flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 right-[-5px] md:right-[10px] z-20 shadow-md hover:bg-gray-100 transition ${
            isHovering ? "opacity-100" : "opacity-0"
          } duration-300`}
          onClick={handleNext}
          disabled={isAnimating}
        >
          <AiOutlineRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center mt-6 gap-1.5">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => !isAnimating && handleSlideClick(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === activeIndex ? "w-6 bg-[#FF80AB]" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  )
}
