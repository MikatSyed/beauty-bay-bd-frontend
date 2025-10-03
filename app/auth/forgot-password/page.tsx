import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Forgot Password | Beauty E-commerce",
  description: "Reset your Beauty E-commerce account password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-4 py-12 dark:bg-gray-950 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <span className="text-2xl font-bold text-white">B</span>
            </div>
            <h2 className="text-center text-3xl font-bold">Forgot Password</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">We'll help you reset your password</p>
          </div>

          <ForgotPasswordForm />

      
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden w-1/2 bg-blue-600 md:block">
        <div className="relative h-full w-full">
          <Image src="/auth-beauty-3.png" alt="Beauty products" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-700/80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
            <h1 className="mb-6 text-center text-4xl font-bold">Password Recovery</h1>
            <p className="mb-8 max-w-md text-center text-xl">
              We'll help you reset your password and get back to exploring our premium beauty products
            </p>
            <div className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-white opacity-70"></div>
              <div className="h-2 w-8 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
