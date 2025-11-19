"use client"

import { useState } from "react"
import Image from "next/image"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCategoriesQuery } from "@/redux/api/categoryApi"
import { EditCategoryModal } from "./edit-category-modal" 

type Category = {
  _id: string
  name: string
  images: string[]
  created_at: string
}

export default function CategoriesTable() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  console.log(selectedCategory,'32')
  const [searchTerm, setSearchTerm] = useState("")

  const { data: categoryData, isLoading } = useCategoriesQuery(undefined)
  const categories: Category[] = categoryData?.data || []

  // ------- Columns with Edit/Delete Logic -------
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const images = row.getValue("images") as string[]
        return (
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={images?.[0] || "/placeholder.svg"}
              alt={row.getValue("name")}
              fill
              className="object-cover"
            />
          </div>
        )
      },
    },
    {
      accessorKey: "name",
      header: "Category Name",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original

     const handleEdit = () => {
  setSelectedCategory(category)  // ✅ correct category from row
  setIsEditOpen(true)
}


        const handleDelete = () => {
          console.log("Delete clicked:", category)
        }

        return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="bg-white shadow-lg rounded-md border border-gray-100 p-2"
          >
            <DropdownMenuLabel className="text-gray-600 text-sm font-medium px-2">
              Actions
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={handleEdit}
              className="cursor-pointer rounded-sm px-2 py-1.5 hover:bg-gray-100"
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />

            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive cursor-pointer rounded-sm px-2 py-1.5 hover:bg-red-50 text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )
      },
    },
  ]

  // Search filter
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Submit handler
  const handleEditSubmit = (updatedData: { name: string; image: File | null; status: "active" | "inactive" }) => {
    console.log("Editing category:", selectedCategory?._id, updatedData)

    // You can call your mutation here:
    // updateCategory({ id: selectedCategory?._id, body: updatedData })
  }

  return (
    <>
      {/* Search Field */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-xs"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredCategories}
        isLoading={isLoading}
      />

      {/* Edit Modal */}
     <EditCategoryModal
  open={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  initialData={
    selectedCategory
      ? {
          id: selectedCategory._id, 
          name: selectedCategory.name,
          images: selectedCategory.images.map((url, index) => ({
            id: index,
            url,
          })),
        }
      : undefined
  }
/>

    </>
  )
}
