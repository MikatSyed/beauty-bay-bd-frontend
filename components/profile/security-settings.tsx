"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { authKey } from "@/constants/global";
import { removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function SecuritySettings({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [changePassword] = useChangePasswordMutation();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    try {
      const result = await changePassword({
        id,
        body: {
          oldPassword: data.currentPassword, // mapping currentPassword -> API oldPassword
          newPassword: data.newPassword,
        },
      }).unwrap();
      if (result?.statusCode === 200) {
        toast({
          title: "Password Updated",
          description: "Your password has been changed successfully.",
        });
        removeUserInfo(authKey);
        router.push("auth/login");
      }

      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.data?.message || error?.message || "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type={showCurrent ? "text" : "password"}
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type={showNew ? "text" : "password"}
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
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
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
            aria-label="Two-factor authentication"
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <h4 className="font-medium">New Login Alerts</h4>
            <p className="text-sm text-muted-foreground">
              Receive alerts when your account is accessed from a new device
            </p>
          </div>
          <Switch
            checked={sessionAlerts}
            onCheckedChange={setSessionAlerts}
            aria-label="Session alerts"
          />
        </div>
      </div>
    </div>
  );
}
