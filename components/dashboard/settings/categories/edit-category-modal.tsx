"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import MultipleImageUpload from "@/components/ui/multiple-image-upload";
import { useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  images: z.array(z.string()).optional(),
});

export interface CategoryImage {
  id: number;
  url: string;
}

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface EditCategoryModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  initialData?: { 
    id: string;          // ✅ FIXED — id included properly
    name: string; 
    images: CategoryImage[]; 
  };
}

export function EditCategoryModal({ open, onClose, initialData }: EditCategoryModalProps) {

  const [categoryImgs, setCategoryImgs] = useState<CategoryImage[]>(initialData?.images || []);
  const [imgError, setImgError] = useState<string | null>(null);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      images: [],
    },
  });

  // Load initial values when modal opens
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        images: initialData.images.map((i) => i.url),
      });

      setCategoryImgs(initialData.images);
    }
  }, [initialData, form]);

  // Submit handler
  async function onSubmit(data: CategoryFormValues) {
    try {
      if (categoryImgs.length === 0) {
        setImgError("Please upload at least one image.");
        return;
      }

      const payload = {
        name: data.name,
        images: categoryImgs.map((img) => img.url),
      };

      await updateCategory({ 
        id: initialData?.id,     // ✅ Correct ID usage
        body: payload 
      }).unwrap();

      toast({
        title: "Category Updated",
        description: "Category updated successfully!",
        variant: "success",
      });

      form.reset();
      setCategoryImgs([]);
      onClose(false);

    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Failed to update category",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <AlertDialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Edit category details below.</DialogDescription>
        </AlertDialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="Enter category name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <MultipleImageUpload
            images={categoryImgs}
            setImages={setCategoryImgs}
            error={imgError}
            setError={setImgError}
          />

          {/* Save Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}
