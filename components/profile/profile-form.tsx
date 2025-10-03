"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImagePlus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileFormSchema = z.object({
  fname: z.string().min(2, "First name required"),
  lname: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  country: z.string().optional(),
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: any;
  onSubmit: (values: ProfileFormValues) => void;
  isUpdating?: boolean;
}

export function ProfileForm({ user, onSubmit, isUpdating }: ProfileFormProps) {
  const [avatarPreview, setAvatarPreview] = useState<string>(user?.image?.[0] || "/placeholder.svg");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fname: user?.fname || "",
      lname: user?.lname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zip_code: user?.zip_code || "",
      country: user?.country || "",
      avatar: avatarPreview,
    },
    mode: "onChange",
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        form.setValue("avatar", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={avatarPreview} alt="Profile" />
              <AvatarFallback>BB</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="relative overflow-hidden" type="button">
              <ImagePlus className="mr-2 h-4 w-4" />
              Change Avatar
              <Input
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleAvatarChange}
              />
            </Button>
          </div>

          <div className="flex-1 grid gap-4">
            {["fname", "lname", "email", "phone", "address", "city", "state", "zip_code", "country"].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field as keyof ProfileFormValues}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                    <FormControl>
                      {field === "address" || field === "city" || field === "state" || field === "country" || field === "zip_code" ? (
                        <Textarea placeholder={`Your ${field}`} {...f} className="resize-none" />
                      ) : (
                        <Input placeholder={`Your ${field}`} {...f} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-md transition-colors" disabled={isUpdating}>
          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
