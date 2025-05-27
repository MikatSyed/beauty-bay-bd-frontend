"use client"

import { useState } from "react"
import { FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  avatar: string
  content: string
  rating: number
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechVision Inc.",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "This product has completely transformed our workflow. The intuitive interface and powerful features have increased our team's productivity by 40%. I couldn't imagine running our business without it now.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Director",
      company: "Global Brands",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "After trying numerous solutions, this is the only one that met all our requirements. The customer support team is exceptional, always going above and beyond to ensure our success.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "CTO",
      company: "Innovate Solutions",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "The level of customization available is impressive. We were able to tailor the platform to our specific needs, which has been crucial for our unique business model.",
      rating: 4,
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Operations Manager",
      company: "Streamline Corp",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "Implementation was seamless and the ROI has been substantial. Our team adopted the platform quickly and we saw results within the first month.",
      rating: 5,
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const handlePrev = () => {
    if (animating) return
    setAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setAnimating(false), 500)
  }

  const handleNext = () => {
    if (animating) return
    setAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setAnimating(false), 500)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center space-y-4">
          <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="max-w-3xl mx-auto text-gray-500 md:text-xl dark:text-gray-400">
            Discover why top professionals choose our solution to drive their business forward
          </p>
        </div>

        <div className="relative mt-16 max-w-5xl mx-auto overflow-hidden">
          <div
            className={`flex transition-transform duration-500 ease-in-out ${animating ? "opacity-80" : "opacity-100"}`}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8 dark:from-gray-800 dark:to-gray-700 md:w-1/3">
                      <div className="text-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-24 h-24 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-lg"
                        />
                        <div className="mt-4 flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-8 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <FaQuoteRight className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                          {testimonial.content}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800"
            >
              <FaChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-200" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:hover:bg-gray-800"
            >
              <FaChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-200" />
            </button>
          </div>

          {/* Indicators */}
          <div className="mt-4 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? "w-6 bg-gray-900 dark:bg-gray-100" : "w-2 bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
