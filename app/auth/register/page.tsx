import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Register | Beauty E-commerce",
  description: "Create a new Beauty E-commerce account",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden w-1/2 bg-purple-600 md:block">
        <div className="relative h-full w-full">
          <Image src="/auth-beauty-2.png" alt="Beauty products" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-pink-700/80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
            <h1 className="mb-6 text-center text-4xl font-bold">Join Our Community</h1>
            <p className="mb-8 max-w-md text-center text-xl">
              Create an account to enjoy exclusive offers and premium beauty products
            </p>
            <div className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-white opacity-70"></div>
              <div className="h-2 w-8 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-4 py-12 dark:bg-gray-950 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
              <span className="text-2xl font-bold text-white">B</span>
            </div>
            <h2 className="text-center text-3xl font-bold">Create Account</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">Join our beauty community today</p>
          </div>

          <RegisterForm />

          <div className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
