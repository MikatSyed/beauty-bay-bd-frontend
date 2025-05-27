"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiFillStar,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineClose,
} from "react-icons/ai";
import { FaEye } from "react-icons/fa";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    id: 1,
    name: "Duo Brush-On Adhesive (Lash Glue)",
    brand: "DUO",
    price: "$0.00",
    previousPrice: "",
    discount: "Sold out",
    rating: 0,
    image:
      "https://media.ulta.com/i/ulta/2639705?w=400&$ProductCardNeutralBGLight$&fmt=autog",
    category: "NAILS",
    description:
      "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
  },
  {
    id: 2,
    name: "Fenty Beauty Diamond Bomb All Over Diamond Veil Highlighter - How Many Carats",
    brand: "FENTY BEAUTY",
    price: "$68.50",
    previousPrice: "$72.50",
    discount: "6% OFF",
    rating: 4.7,
    image:
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "MAKEUP",
    description:
      "This is a premium beauty product perfect for your daily glam. Limited stock available!",
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
    image:
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "MAKEUP",
    description:
      "This is a premium beauty product perfect for your daily glam. Limited stock available!",
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
    image:
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "MAKEUP",
    description:
      "This is a premium beauty product perfect for your daily glam. Limited stock available!",
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
    image:
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "LIPS",
    description:
      "This is a premium beauty product perfect for your daily glam. Limited stock available!",
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
    image:
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "LIPS",
    description:
      "This is a premium beauty product perfect for your daily glam. Limited stock available!",
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
    image:
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    category: "LIPS",
    description:
      "This is a premium beauty product perfect for your daily glam. Limited stock available!",
    images: [
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
      "https://www.taupenotch.com.bd/wp-content/uploads/2024/12/Brimston-40-600x600.png",
    ],
  },
];

export default function Face() {
  const [isHovering, setIsHovering] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrevious = () => swiperRef.current?.slidePrev();

  return (
    <div className="px-6  relative">
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
                      "/placeholder.svg"
                    }
                    alt={`${selectedProduct.name} - View ${selectedImage + 1}`}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <div className="flex md:flex-row gap-2 p-4 overflow-x-auto md:overflow-y-auto md:h-[120px] md:max-h-[120px]">
                  {(selectedProduct.images || [selectedProduct.image]).map(
                    (img: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative min-w-[60px] w-[60px] h-[60px] rounded-md overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-black shadow-md"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex-1 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {selectedProduct.brand}
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {selectedProduct.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        <AiFillStar className="w-4 h-4 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">
                          {selectedProduct.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        • 142 Reviews
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {selectedProduct.price}
                      </span>
                      {selectedProduct.previousPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {selectedProduct.previousPrice}
                        </span>
                      )}
                    </div>
                    {selectedProduct.discount &&
                      selectedProduct.discount !== "Sold out" && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          {selectedProduct.discount}
                        </p>
                      )}
                  </div>

                  <div className="pt-2">
                    <p className="text-gray-700">
                      {selectedProduct.description}
                    </p>
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
                      <p className="text-sm text-gray-500">
                        Free shipping on orders over $35
                      </p>
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

<div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-4">
  <h2 className="text-2xl md:text-3xl  font-weight-600 text-gray-900">
  Face
  </h2>
  <button className="text-sm md:text-base text-[#fa9aac] hover:underline font-medium transition-all duration-200">
    View All
  </button>
</div>


      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop
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
          {products.map((product) => (
            <SwiperSlide key={product.id} className="bg-white rounded-lg">
              <div className="relative group h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <div className="absolute top-[-1.2] z-10">
                    <span className="bg-[#FF80AB] text-white text-xs px-2 py-1 rounded-md">
                      {product.discount}
                    </span>
                  </div>

                  <div className="w-full h-[200px] relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`Image of ${product.name}`}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleQuickView(product)}
                        className="flex items-center gap-2 text-sm px-8 py-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-[#FF80AB] text-white hover:border"
                      >
                        <FaEye className="w-4 h-4" />
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-center my-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                      {product.brand}
                    </h4>
                    <div className="flex items-center">
                      <AiFillStar className="h-3.5 w-3.5 text-yellow-400" />
                      <span className="ml-1 text-xs text-gray-500">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <h5 className="text-sm font-medium text-gray-900 mb-2">
                    {product.name.length > 60
                      ? `${product.name.slice(0, 60)}...`
                      : product.name}
                  </h5>

                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {product.previousPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AiOutlineHeart className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500 transition-colors" />
                      <AiOutlineShopping className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`text-black bg-white w-10 h-10 flex items-center justify-center rounded absolute top-[5.5rem] -translate-y-1/2 left-[-2.5rem] md:left-[0.5rem] z-20 shadow-md hover:bg-gray-100 transition ${
            isHovering ? "opacity-100" : "opacity-0"
          } duration-300`}
          onClick={handlePrevious}
        >
          <AiOutlineLeft className="w-6 h-6" />
        </button>

        <button
          className={`text-black bg-white w-10 h-10 flex items-center justify-center rounded absolute top-[5.5rem] -translate-y-1/2 right-[-2.5rem] md:right-[0.5rem] z-20 shadow-md hover:bg-gray-100 transition ${
            isHovering ? "opacity-100" : "opacity-0"
          } duration-300`}
          onClick={handleNext}
        >
          <AiOutlineRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
