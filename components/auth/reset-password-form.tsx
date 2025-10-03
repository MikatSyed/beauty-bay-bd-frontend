"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useResetPasswordMutation } from "@/redux/api/authApi";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasResetToken, setHasResetToken] = useState(false);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  const [resetPassword] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setError("Reset link is missing. Please request a new password reset email.");
      setIsValidatingToken(false);
      return;
    }

    if (token.length < 10) {
      setError("Invalid reset link. Please request a new password reset email.");
      setIsValidatingToken(false);
      return;
    }

    setHasResetToken(true);
    setIsValidatingToken(false);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Your new password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!token) {
      toast({
        title: "Error",
        description: "No reset link found. Please request a new one.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await resetPassword({
        token,
        newPassword: password,
      }).unwrap();

      console.log(res, "Password reset response");

      setIsSubmitted(true);

      toast({
        title: "Password updated",
        description: "Your password has been successfully reset. Redirecting to login...",
      });

      setTimeout(() => {
        router.push("auth/login");
      }, 3000);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Something went wrong",
        description:
          error?.data?.message || error?.message || "Unable to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ❌ Error state
  if (error) {
    return (
     <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Alert variant="destructive" className="border-pink-300 bg-pink-50 text-pink-900">
          <AlertCircle className="h-4 w-4 text-pink-600" />
          <AlertTitle className="font-semibold">Reset Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="w-full border-pink-400 text-pink-600 hover:bg-pink-50">
          <Link href="/auth/forgot-password" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Request a new reset link
          </Link>
        </Button>
      </div>
     </div>
    );
  }

  // ✅ Success state
  if (isSubmitted) {
    return (
     <div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
            <CheckCircle2 className="h-7 w-7 text-pink-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Password Updated</h1>
          <p className="text-sm text-gray-600">
            Your password has been successfully reset. You’ll be redirected to the login page shortly.
          </p>
        </div>
        <Button asChild className="w-full bg-pink-600 hover:bg-pink-700 text-white">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
     </div>
    );
  }

  // ⏳ Token validating
  if (isValidatingToken) {
    return (
      <div className={cn("flex flex-col gap-6 items-center justify-center", className)} {...props}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
        <p className="text-center text-sm text-gray-600">Verifying your reset link...</p>
      </div>
    );
  }

  // ✨ Main form
  return (
    <form
      className={cn(
        "flex flex-col gap-6  bg-white/90 backdrop-blur-md",
        className
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      {/* Header */}
    
      {/* Inputs */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            minLength={8}
            placeholder="Enter a new password"
            className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
          />
          <p className="text-xs text-gray-500">Must be at least 8 characters</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
            placeholder="Re-enter your new password"
            className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold"
          disabled={isLoading || !password || !confirmPassword}
        >
          {isLoading ? "Updating..." : "Reset Password"}
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full border-pink-400 text-pink-600 hover:bg-pink-50"
        >
          <Link href="/login" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </Button>
      </div>
    </form>
  );
}
