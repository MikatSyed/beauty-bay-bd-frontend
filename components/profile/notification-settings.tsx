"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters."),
    newPassword: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface SecuritySettingsProps {
  onSubmit: (values: PasswordFormValues) => void;
  isLoading?: boolean;
}

export function SecuritySettings({ onSubmit, isLoading }: SecuritySettingsProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof PasswordFormValues}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel>{field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm Password"}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...f} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </form>
      </Form>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Security Options</h3>
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} aria-label="Two-factor authentication" />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <h4 className="font-medium">New Login Alerts</h4>
            <p className="text-sm text-muted-foreground">
              Receive alerts when your account is accessed from a new device
            </p>
          </div>
          <Switch checked={sessionAlerts} onCheckedChange={setSessionAlerts} aria-label="Session alerts" />
        </div>
      </div>
    </div>
  );
}
