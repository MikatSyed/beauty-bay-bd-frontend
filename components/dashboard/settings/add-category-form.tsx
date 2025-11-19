"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import MultipleImageUpload from "@/components/ui/multiple-image-upload"
import { useAddCategoryMutation } from "@/redux/api/categoryApi"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// ✅ Validation Schema
const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  images: z.array(z.any()).optional(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

interface CategoryImage {
  id: number
  url: string
}

export function AddCategoryForm() {
  const [categoryImgs, setCategoryImgs] = useState<CategoryImage[]>([])
  const [imgError, setImgError] = useState<string | null>(null)
  const [addCategory, { isLoading }] = useAddCategoryMutation()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      images: [],
    },
  })

  // ✅ Submit handler
async function onSubmit(data: CategoryFormValues) {
  try {
    if (categoryImgs.length === 0) {
      setImgError("Please upload at least one image.")
      return
    }

    setImgError(null)

    // ✅ Convert image objects to URLs
    data.images = categoryImgs.map((img) => img.url)

    // ✅ Create JSON payload (matches your backend)
    const payload = {
      name: data.name,
      images: data.images,
    }

    // ✅ Send as JSON (NOT FormData)
    await addCategory(payload).unwrap()

    toast({
      title: "Category Added",
      description: "New category created successfully!",
      variant: "success",
    })

    form.reset()
    setCategoryImgs([])
  } catch (err: any) {
    console.error(err)
    toast({
      title: "Error",
      description: err?.message || "Failed to create category",
      variant: "destructive",
    })
  }
}

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Category</CardTitle>
        <CardDescription>Create a new product category with name and image</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Category Name
            </Label>
            <Input
              id="name"
              placeholder="Enter category name"
              {...form.register("name")}
              className="h-12 rounded-lg border-gray-300 bg-white focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-500 dark:border-gray-600 dark:bg-gray-800 dark:focus-visible:ring-pink-500 dark:focus-visible:border-pink-500"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Multiple Image Upload */}
          <MultipleImageUpload
            images={categoryImgs}
            setImages={setCategoryImgs}
            setError={setImgError}
            error={imgError}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full md:w-auto px-8 rounded-lg bg-pink-600 text-white hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700 shadow-none"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isLoading ? "Adding..." : "Add Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
