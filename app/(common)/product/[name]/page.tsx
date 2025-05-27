"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AiFillStar, AiOutlineStar, AiOutlineHeart, AiOutlineShareAlt, AiOutlineRight } from "react-icons/ai"
import { FaShoppingBag, FaCreditCard, FaShieldAlt, FaTruck, FaUndoAlt, FaCheck } from "react-icons/fa"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"

// Product data (would typically come from an API or props)
const product = {
  id: "prod-001",
  name: "Luminous Radiance Serum",
  brand: "Glow Essentials",
  price: "$49.99",
  previousPrice: "$69.99",
  discount: "20% OFF",
  description:
    "A luxurious facial serum that delivers intense hydration and radiance. Formulated with hyaluronic acid, vitamin C, and botanical extracts to brighten, firm, and rejuvenate your skin.",
  rating: 4.8,
  reviewCount: 142,
  image: "/placeholder.svg?height=600&width=600&text=Product+Image",
  images: [
    "/placeholder.svg?height=600&width=600&text=Product+Image",
    "/placeholder.svg?height=600&width=600&text=Side+View",
    "/placeholder.svg?height=600&width=600&text=Ingredients",
    "/placeholder.svg?height=600&width=600&text=In+Use",
  ],
  features: [
    "Deeply hydrates and plumps skin",
    "Reduces fine lines and wrinkles",
    "Brightens and evens skin tone",
    "Protects against environmental damage",
    "Suitable for all skin types",
  ],
  ingredients:
    "Water, Glycerin, Niacinamide, Hyaluronic Acid, Vitamin C (Ascorbic Acid), Vitamin E, Aloe Vera Extract, Rose Water, Jojoba Oil, Peptide Complex, Natural Fragrance",
  howToUse:
    "Apply 2-3 drops to clean, dry skin morning and evening. Gently pat into face and neck. Follow with moisturizer.",
  variants: [
    { id: 1, name: "30ml", price: "$49.99", inStock: true },
    { id: 2, name: "50ml", price: "$79.99", inStock: true },
    { id: 3, name: "Travel Size (15ml)", price: "$29.99", inStock: false },
  ],
  relatedProducts: [
    {
      id: "rel-1",
      name: "Hydrating Facial Cleanser",
      price: "$24.99",
      image: "/placeholder.svg?height=300&width=300&text=Related+1",
    },
    {
      id: "rel-2",
      name: "Rejuvenating Night Cream",
      price: "$54.99",
      image: "/placeholder.svg?height=300&width=300&text=Related+2",
    },
    {
      id: "rel-3",
      name: "Brightening Eye Cream",
      price: "$39.99",
      image: "/placeholder.svg?height=300&width=300&text=Related+3",
    },
    {
      id: "rel-4",
      name: "Exfoliating Facial Scrub",
      price: "$34.99",
      image: "/placeholder.svg?height=300&width=300&text=Related+4",
    },
  ],
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  // Reviews data (would typically come from an API)
  const reviews = [
    {
      id: 1,
      author: "Sarah J.",
      rating: 5,
      date: "2 months ago",
      content:
        "This serum has completely transformed my skin! I've been using it for a month and my complexion is brighter and more even-toned.",
    },
    {
      id: 2,
      author: "Michael T.",
      rating: 4,
      date: "3 weeks ago",
      content: "Great product, absorbs quickly and doesn't feel greasy. I've noticed my skin looks more hydrated.",
    },
    {
      id: 3,
      author: "Emma L.",
      rating: 5,
      date: "1 month ago",
      content:
        "Worth every penny! My fine lines are less noticeable and my skin feels so soft and plump after using this.",
    },
  ]

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-pink-500 transition-colors">
            Home
          </Link>
          <AiOutlineRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-pink-500 transition-colors">
            Products
          </Link>
          <AiOutlineRight className="h-3 w-3" />
          <Link href="/products/skincare" className="hover:text-pink-500 transition-colors">
            Skincare
          </Link>
          <AiOutlineRight className="h-3 w-3" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-8">
              <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={`${product.name} - View ${selectedImage + 1}`}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative min-w-[80px] w-[80px] h-[80px] rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-pink-500 shadow-md" : "border-gray-200 hover:border-pink-300"
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
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              {/* Brand and Title */}
              <div>
                <Link
                  href={`/brands/${product.brand.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium text-pink-500 hover:underline mb-1 inline-block"
                >
                  {product.brand}
                </Link>
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-900">{product.name}</h1>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) =>
                      i < Math.floor(product.rating) ? (
                        <AiFillStar key={i} className="w-4 h-4 text-yellow-400" />
                      ) : i < product.rating ? (
                        <AiFillStar key={i} className="w-4 h-4 text-yellow-400 opacity-50" />
                      ) : (
                        <AiOutlineStar key={i} className="w-4 h-4 text-gray-300" />
                      ),
                    )}
                    <span className="ml-2 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    •{" "}
                    <Link href="#reviews" className="hover:text-pink-500 transition-colors">
                      {product.reviewCount} Reviews
                    </Link>
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{product.variants[selectedVariant].price}</span>
                  {product.previousPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.previousPrice}</span>
                  )}
                  {product.discount && (
                    <span className="text-sm bg-pink-100 text-pink-700 font-medium px-2 py-0.5 rounded">
                      {product.discount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-600 font-medium mt-1">
                  {product.variants[selectedVariant].inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              {/* Short Description */}
              <div className="pt-2">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Variants */}
              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      disabled={!variant.inStock}
                      className={`px-4 py-2 rounded-md border-2 transition-all ${
                        selectedVariant === index
                          ? "border-pink-500 bg-pink-50 text-pink-700"
                          : variant.inStock
                            ? "border-gray-200 hover:border-pink-300 text-gray-700"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center w-32 h-10">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-full flex items-center justify-center border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <IoChevronDown className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="h-full w-12 border-y border-gray-300 text-center text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-full flex items-center justify-center border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    <IoChevronUp className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart and Buy Now */}
              <div className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition font-medium flex items-center justify-center">
                    <FaShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition font-medium flex items-center justify-center">
                    <FaCreditCard className="w-4 h-4 mr-2" />
                    Buy Now
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex items-center text-gray-500 hover:text-pink-500 transition-colors">
                    <AiOutlineHeart className="w-5 h-5 mr-1" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-pink-500 transition-colors">
                    <AiOutlineShareAlt className="w-5 h-5 mr-1" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>

              {/* Shipping and Returns */}
              <div className="pt-6 space-y-3 border-t border-gray-100">
                <div className="flex items-start">
                  <FaTruck className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free shipping</p>
                    <p className="text-sm text-gray-500">On orders over $35. Delivery in 3-5 business days.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaShieldAlt className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Satisfaction Guaranteed</p>
                    <p className="text-sm text-gray-500">Try risk-free with our 30-day money-back guarantee.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUndoAlt className="w-4 h-4 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-500">Return or exchange within 30 days of delivery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "description"
                    ? "border-b-2 border-pink-500 text-pink-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "ingredients"
                    ? "border-b-2 border-pink-500 text-pink-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab("how-to-use")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "how-to-use"
                    ? "border-b-2 border-pink-500 text-pink-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                How to Use
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "reviews"
                    ? "border-b-2 border-pink-500 text-pink-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              {activeTab === "description" && (
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">Product Description</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="w-4 h-4 text-pink-500 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">Ingredients</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{product.ingredients}</p>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="text-sm text-pink-700">
                      All ingredients are ethically sourced and our products are never tested on animals. We pride
                      ourselves on transparency and using clean, effective ingredients.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "how-to-use" && (
                <div>
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">How to Use</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{product.howToUse}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-medium">1</span>
                      </div>
                      <p className="text-sm text-gray-700">Cleanse face and pat dry</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-medium">2</span>
                      </div>
                      <p className="text-sm text-gray-700">Apply 2-3 drops to face and neck</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-medium">3</span>
                      </div>
                      <p className="text-sm text-gray-700">Follow with moisturizer</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div id="reviews">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-medium text-gray-900">Customer Reviews</h2>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition text-sm font-medium">
                      Write a Review
                    </button>
                  </div>

                  <div className="flex items-center mb-8">
                    <div className="mr-6">
                      <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) =>
                          i < Math.floor(product.rating) ? (
                            <AiFillStar key={i} className="w-4 h-4 text-yellow-400" />
                          ) : i < product.rating ? (
                            <AiFillStar key={i} className="w-4 h-4 text-yellow-400 opacity-50" />
                          ) : (
                            <AiOutlineStar key={i} className="w-4 h-4 text-gray-300" />
                          ),
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</div>
                    </div>

                    <div className="flex-1 max-w-md">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const percentage = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1
                        return (
                          <div key={star} className="flex items-center mb-1">
                            <div className="text-sm text-gray-500 w-6">{star}</div>
                            <AiFillStar className="w-4 h-4 text-yellow-400 mr-2" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-sm text-gray-500 ml-2 w-8">{percentage}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900 mr-2">{review.author}</div>
                            <div className="text-sm text-gray-500">• {review.date}</div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) =>
                              i < review.rating ? (
                                <AiFillStar key={i} className="w-4 h-4 text-yellow-400" />
                              ) : (
                                <AiOutlineStar key={i} className="w-4 h-4 text-gray-300" />
                              ),
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <button className="text-pink-500 font-medium hover:text-pink-600 transition">
                      Load More Reviews
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-medium text-gray-900 mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-pink-500 transition-colors">
                {relatedProduct.name}
              </h3>
              <p className="text-gray-700 mt-1">{relatedProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
