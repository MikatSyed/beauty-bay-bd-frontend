"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus } from "lucide-react"
import type { Product } from "./products-table"

interface EditProductDialogProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProductDialog({ product, open, onOpenChange }: EditProductDialogProps) {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    image: product.image,
    description: "A premium quality beauty product for your skincare routine.",
  })

  useEffect(() => {
    if (open) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        image: product.image,
        description: "A premium quality beauty product for your skincare routine.",
      })
    }
  }, [open, product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id.replace("edit-", "")]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the details of your product.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-image">Product Image</Label>
              <div className="flex items-center justify-center border-2 border-dashed rounded-md h-40 relative">
                {formData.image ? (
                  <Image
                    src={formData.image || "/placeholder.svg"}
                    alt="Product preview"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ImagePlus className="h-10 w-10 mb-2" />
                    <span>Upload image</span>
                  </div>
                )}
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-id">Product ID</Label>
                <Input id="edit-id" value={formData.id} onChange={handleChange} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input id="edit-name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select value={formData.category.toLowerCase()} onValueChange={handleSelectChange}>
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="skincare">Skincare</SelectItem>
                    <SelectItem value="makeup">Makeup</SelectItem>
                    <SelectItem value="haircare">Haircare</SelectItem>
                    <SelectItem value="bodycare">Body Care</SelectItem>
                    <SelectItem value="fragrance">Fragrance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price ($)</Label>
              <Input id="edit-price" type="number" value={formData.price} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock">Stock Quantity</Label>
              <Input id="edit-stock" type="number" value={formData.stock} onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
