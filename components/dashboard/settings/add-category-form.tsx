"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Upload, X, ImageIcon } from "lucide-react"

interface AddCategoryFormProps {
  onSubmit: (data: { name: string; image: File | null }) => void
}

export function AddCategoryForm({ onSubmit }: AddCategoryFormProps) {
  const [name, setName] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onSubmit({ name, image })
    setName("")
    setImage(null)
    setImagePreview("")
  }

  const clearImage = () => {
    setImage(null)
    setImagePreview("")
  }

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Category</CardTitle>
        <CardDescription>Create a new product category with name and image</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Category Name
            </Label>
            <Input
              id="name"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 bg-white focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-500 dark:border-gray-600 dark:bg-gray-800 dark:focus-visible:ring-pink-500 dark:focus-visible:border-pink-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              Category Image
            </Label>
            <div className="relative">
              <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all hover:border-pink-400 hover:bg-pink-50/50 dark:hover:bg-pink-950/20 border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500"
              >
                {imagePreview ? (
                  <div className="relative w-full h-full p-4">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-contain rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault()
                        clearImage()
                      }}
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 shadow-none"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-6">
                    <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
                      <ImageIcon className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload image</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Upload className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                      <span className="text-xs font-medium text-pink-600 dark:text-pink-400">Browse Files</span>
                    </div>
                  </div>
                )}
              </label>
            </div>
            {image && !imagePreview && <p className="text-sm text-muted-foreground">{image.name}</p>}
          </div>

          <Button
            type="submit"
            className="h-12 w-full md:w-auto px-8 rounded-lg bg-pink-600 text-white hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700 shadow-none"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
