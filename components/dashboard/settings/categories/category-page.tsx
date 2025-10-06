"use client"

import { useState } from "react"
import { AddCategoryForm } from "../../../../components/dashboard/settings/add-category-form"
import { CategoriesTable } from "../../../../components/dashboard/settings/categories/categories-table"
import { EditCategoryModal } from "../../../../components/dashboard/settings/categories/edit-category-modal"
import { DeleteModal } from "../../../../components/dashboard/settings/categories/delete-modal"

export interface Category {
  id: string
  code: string
  name: string
  description: string
  image: string
  status: "active" | "inactive"
  productCount: number
  createdAt: Date
  updatedAt: Date
}

// Demo data
const initialCategories: Category[] = [
  {
    id: "1",
    code: "CAT001",
    name: "Electronics",
    description: "Electronic devices and accessories",
    image: "/electronics-components.png",
    status: "active",
    productCount: 145,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-20"),
  },
  {
    id: "2",
    code: "CAT002",
    name: "Clothing",
    description: "Fashion and apparel items",
    image: "/diverse-clothing-rack.png",
    status: "active",
    productCount: 289,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-03-18"),
  },
  {
    id: "3",
    code: "CAT003",
    name: "Home & Garden",
    description: "Home improvement and garden supplies",
    image: "/lush-home-garden.png",
    status: "active",
    productCount: 167,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "4",
    code: "CAT004",
    name: "Sports & Outdoors",
    description: "Sports equipment and outdoor gear",
    image: "/diverse-group-playing-various-sports.png",
    status: "inactive",
    productCount: 98,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "5",
    code: "CAT005",
    name: "Books & Media",
    description: "Books, movies, and music",
    image: "/stack-of-diverse-books.png",
    status: "active",
    productCount: 234,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-22"),
  },
  {
    id: "6",
    code: "CAT006",
    name: "Toys & Games",
    description: "Children's toys and board games",
    image: "/colorful-toy-collection.png",
    status: "active",
    productCount: 176,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-19"),
  },
  {
    id: "7",
    code: "CAT007",
    name: "Beauty & Health",
    description: "Cosmetics and health products",
    image: "/abstract-beauty.png",
    status: "active",
    productCount: 312,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-21"),
  },
  {
    id: "8",
    code: "CAT008",
    name: "Automotive",
    description: "Car parts and accessories",
    image: "/classic-car-restoration.png",
    status: "inactive",
    productCount: 89,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-12"),
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const handleAddCategory = (data: { name: string; image: File | null }) => {
    const newCategory: Category = {
      id: String(categories.length + 1),
      code: `CAT${String(categories.length + 1).padStart(3, "0")}`,
      name: data.name,
      description: `Description for ${data.name}`,
      image: data.image
        ? URL.createObjectURL(data.image)
        : `/placeholder.svg?height=50&width=50&query=${encodeURIComponent(data.name)}`,
      status: "active",
      productCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setCategories([newCategory, ...categories])
  }

  const handleEditCategory = (data: { name: string; image: File | null; status: "active" | "inactive" }) => {
    if (!editingCategory) return

    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              name: data.name,
              image: data.image ? URL.createObjectURL(data.image) : cat.image,
              status: data.status,
              updatedAt: new Date(),
            }
          : cat,
      ),
    )
    setEditingCategory(null)
  }

  const handleDeleteCategory = () => {
    if (!deletingCategory) return
    setCategories(categories.filter((cat) => cat.id !== deletingCategory.id))
    setDeletingCategory(null)
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Categories Management</h1>
        <p className="text-muted-foreground">Add, edit, and manage your product categories</p>
      </div>

      <AddCategoryForm onSubmit={handleAddCategory} />

      <CategoriesTable categories={categories} onEdit={setEditingCategory} onDelete={setDeletingCategory} />

      <EditCategoryModal
        category={editingCategory}
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        onSubmit={handleEditCategory}
      />

      <DeleteModal
        open={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        description={`Are you sure you want to delete "${deletingCategory?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}
