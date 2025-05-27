"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const blogs = [
  {
    id: 1,
    title: "Treat Your Lip The Best With Gisou Honey Infused Lip Oil",
    author: "Sophie Lane",
    publishedDate: "April 10, 2025",
    category: "Skincare",
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/240-ml.png",
    excerpt:
      "Discover top skincare tips, must-have products, and daily rituals to achieve radiant, sun-kissed skin all summer long.",
    content: "Full blog content goes here...",
  },
  {
    id: 2,
    title: "Long-lasting shine, all-day comfort with Fenty Beauty Gloss Cream",
    author: "Camila Brooks",
    publishedDate: "April 18, 2025",
    category: "Makeup",
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/35N-Medium-48-1300x1300.png",
    excerpt:
      "From glassy lips to pastel liners, check out the hottest makeup trends taking over this year—and how to rock them.",
    content: "Full blog content goes here...",
  },
  {
    id: 3,
    title: "How to Build a Clean Beauty Routine from Scratch",
    author: "Jordan Ray",
    publishedDate: "March 28, 2025",
    category: "Beauty",
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/888032DB-08AD-43BC-865C-C514F587958E-1300x1300.png",
    excerpt:
      "Confused by clean beauty? This guide simplifies ingredients, brands, and must-do swaps for a healthier glow.",
    content: "Full blog content goes here...",
  },
  {
    id: 4,
    title: "Long-lasting shine, all-day comfort with Fenty Beauty Gloss Cream",
    author: "Camila Brooks",
    publishedDate: "April 18, 2025",
    category: "Makeup",
    image: "https://www.taupenotch.com.bd/wp-content/uploads/2024/09/35N-Medium-48-1300x1300.png",
    excerpt:
      "From glassy lips to pastel liners, check out the hottest makeup trends taking over this year—and how to rock them.",
    content: "Full blog content goes here...",
  },
];

export default function Blog() {
  const [isHovering, setIsHovering] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrevious = () => swiperRef.current?.slidePrev();

  return (
    <div className="px-6 py-10 md:py-14 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          From the Blog
        </h2>
        <button className="text-sm md:text-base text-[#fa9aac] hover:underline font-medium transition-all duration-200">
          View All
        </button>
      </div>

      <div className="h-px bg-gradient-to-r from-[#FF80AB]/20 via-[#FF80AB]/40 to-transparent my-6" />

      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className="h-full"
        >
          {blogs.map((blog) => (
    <SwiperSlide key={blog.id} className="bg-white rounded-lg shadow-lg">
    <div className="flex flex-col h-full overflow-hidden rounded-lg relative">
      {/* Image Section */}
      <div className="relative h-[450px] w-[550px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover rounded-t-lg"
        />
  
        {/* Black Gradient Overlay */}
        <div className="absolute inset-0 rounded-t-lg z-10 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />
  
        {/* Category Tag */}
        <div className="absolute top-4 left-4 z-20 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {blog.category}
        </div>
  
        {/* <div className="absolute top-4 left-[17rem] z-20 bg-white text- text-xs font-semibold px-3 py-1 rounded-full shadow-md ">
  {blog.publishedDate}
</div> */}


      </div>
  
      {/* Content Section */}
      <div className="mt-[-12rem] z-20 p-5 flex flex-col justify-end flex-grow">
        <h3 className="text-lg font-semibold mb-3 text-white leading-snug">
          {blog.title.length > 65 ? `${blog.title.slice(0, 65)}...` : blog.title}
        </h3>
  
        <div className="flex justify-center">
        <button className="px-6 py-3 text-sm bg-white border border-white rounded-full hover:bg-transparent hover:text-white transition font-medium text-black shadow-md">
  Read More
</button>

        </div>
      </div>
    </div>
  </SwiperSlide>
  
     
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          className={`text-black bg-white w-10 h-10 flex items-center justify-center rounded-full absolute top-1/2 left-[-1.5rem] md:left-[-0.5rem] z-20 shadow-md hover:bg-gray-100 transition ${
            isHovering ? "opacity-100" : "opacity-0"
          } duration-300`}
          onClick={handlePrevious}
        >
          <AiOutlineLeft className="w-5 h-5" />
        </button>

        <button
          className={`text-black bg-white w-10 h-10 flex items-center justify-center rounded-full absolute top-1/2 right-[-1.5rem] md:right-[-0.5rem] z-20 shadow-md hover:bg-gray-100 transition ${
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
