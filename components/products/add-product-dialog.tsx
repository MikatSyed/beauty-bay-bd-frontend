"use client"

import type React from "react"

import { useState } from "react"
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

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-image">Product Image</Label>
              <div className="flex items-center justify-center border-2 border-dashed rounded-md h-40 relative">
                {imagePreview ? (
                  <Image
                    src={imagePreview || "/placeholder.svg"}
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
                  id="product-image"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-id">Product ID</Label>
                <Input id="product-id" placeholder="e.g., PROD-011" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" placeholder="e.g., Hydrating Face Serum" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Select>
                  <SelectTrigger id="product-category">
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
              <Label htmlFor="product-price">Price ($)</Label>
              <Input id="product-price" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-stock">Stock Quantity</Label>
              <Input id="product-stock" type="number" placeholder="0" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea id="product-description" placeholder="Enter product description..." className="min-h-[100px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-sku">SKU</Label>
              <Input id="product-sku" placeholder="e.g., SKU-12345" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-barcode">Barcode</Label>
              <Input id="product-barcode" placeholder="e.g., 123456789012" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
