import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login | Beauty E-commerce",
  description: "Login to your Beauty E-commerce account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-4 py-12 dark:bg-gray-950 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
              <span className="text-2xl font-bold text-white">B</span>
            </div>
            <h2 className="text-center text-3xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to access your beauty account</p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-medium text-pink-600 hover:text-pink-500 dark:text-pink-400">
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden w-1/2 bg-pink-600 md:block">
        <div className="relative h-full w-full">
          <Image src="/auth-beauty-1.png" alt="Beauty products" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/80 to-purple-700/80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
            <h1 className="mb-6 text-center text-4xl font-bold">Beauty Starts Here</h1>
            <p className="mb-8 max-w-md text-center text-xl">
              Sign in to discover our premium collection of beauty products
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
