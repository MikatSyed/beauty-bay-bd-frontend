export type CropCategory = "Fruits" | "Vegetables" | "Grains" | "Nuts" | "Herbs" | "Other"
export type AgricultureType = "Organic" | "Conventional" | "Hydroponic" | "Biodynamic"
export type SortOption = "price-asc" | "price-desc" | "rating-desc" | "newest"

export interface Crop {
  id: string
  name: string
  farmer_id: string
  images: string[]
  price_per_unit: number
  quantity_available: number
  quantity_unit: string
  location: string
  agriculture_type: AgricultureType
  classification: CropCategory
  packaging: string
  harvest_date: string
  created_at: string
}

export interface Farmer {
  id: string
  username: string
  full_name: string
  avatar_url: string | null
  farm_name: string
  farm_size: number
  produce_types: CropCategory[]
  rating: number
  review_count: number
  joined_date: string
}

export interface FilterOptions {
  search: string
  categories: CropCategory[]
  agricultureTypes: AgricultureType[]
  priceRange: [number, number]
  location: string
  sortBy: SortOption
}

export interface Review {
    id: string
    buyer_id: string
    buyer_name: string
    buyer_avatar: string | null
    farmer_id: string
    rating: number
    comment: string
    created_at: string
  }

  export interface OrderRequest {
    crop_id: string
    farmer_id: string
    quantity: number
    total_amount: number
    price_per_unit: number
    is_counter_offer: boolean
    delivery_address: string
    delivery_date: string
    notes: string
  }
  