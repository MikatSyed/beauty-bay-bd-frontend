"use client"

import React, { useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Upload, X, ImagePlus, AlertCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Helper: upload file directly to Cloudinary
async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    { method: "POST", body: formData }
  )

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error?.message || "Upload to Cloudinary failed.")
  }
  return data.secure_url
}

interface CropImage {
  id: number
  url: string
}

interface ImageUploadProps {
  images: CropImage[]
  setImages: React.Dispatch<React.SetStateAction<CropImage[]>>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  error: string | null
  maxImages?: number
}

const MultipleImageUpload: React.FC<ImageUploadProps> = ({
  images,
  setImages,
  setError,
  error,
  maxImages = 10,
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleClick = () => hiddenFileInput.current?.click()

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      if (images.length + fileArray.length > maxImages) {
        setError(`You can only upload a maximum of ${maxImages} images.`)
        return
      }
      setIsUploading(true)

      const uploadPromises = fileArray.map((file) => {
        if (!file.type.startsWith("image/")) {
          return Promise.reject(new Error("Only image files are allowed."))
        }
        if (file.size > 5 * 1024 * 1024) {
          return Promise.reject(new Error("Some images exceed the 5MB size limit."))
        }
        return uploadToCloudinary(file)
      })

      Promise.all(uploadPromises)
        .then((secureUrls) => {
          const newImages = secureUrls.map((url) => ({
            id: Date.now() + Math.random(),
            url,
          }))
          setImages((prev) => [...prev, ...newImages])
          setError(null)
        })
        .catch((uploadError) => {
          console.error("Upload error:", uploadError)
          setError(
            uploadError instanceof Error
              ? uploadError.message
              : "An error occurred while uploading."
          )
        })
        .finally(() => {
          setTimeout(() => setIsUploading(false), 500)
        })
    },
    [images.length, maxImages, setError, setImages]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
    }
  }

  const handleRemoveImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
    if (error && images.length <= maxImages) setError(null)
  }

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false)
  }, [])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); if (!isDragging) setIsDragging(true)
  }, [isDragging])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }, [processFiles])

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-900">Crop Images</h3>
        <span className="text-sm text-gray-500">{images.length}/{maxImages} images</span>
      </div>

      <div
        onClick={handleClick}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/70 bg-gray-50 hover:bg-gray-50/80"
        } cursor-pointer group`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className={`p-3 rounded-full transition ${
            isDragging
              ? "bg-primary/20 text-primary"
              : "bg-gray-100 text-gray-500 group-hover:text-primary group-hover:bg-primary/10"
          }`}>
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-gray-700">
            {isDragging ? "Drop images here" : "Drag & drop or click to browse"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF up to 5MB (Max {maxImages})
          </p>
        </div>
        <input
          ref={hiddenFileInput}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="ml-2 text-sm text-gray-700">Uploading...</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 rounded-md bg-red-50 text-red-700"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
              className="relative group aspect-square"
            >
              <div className="absolute inset-0 overflow-hidden rounded-lg border bg-gray-100">
                <Image
                  src={img.url}
                  alt="Crop"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveImage(img.id) }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/90 shadow hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {images.length < maxImages && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              layout
              className="relative aspect-square"
            >
              <button
                type="button"
                onClick={handleClick}
                className="flex flex-col items-center justify-center w-full h-full rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/70 bg-gray-50 hover:bg-gray-50/80"
              >
                <ImagePlus className="h-6 w-6 text-gray-400" />
                <span className="mt-1 text-xs text-gray-500">Add more</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default MultipleImageUpload
