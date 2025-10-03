"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEmailVerificationQuery } from "@/redux/api/authApi"
import Image from "next/image"

export default function VerifyEmailPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get token from the URL query parameter
  const token = searchParams.get("token")

  // Use RTK Query hook
  const { data, error, isLoading } = useEmailVerificationQuery(token || "", { skip: !token })

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid or missing verification token.")
      return
    }

    if (data) {
      setSuccessMessage(data.message || "Email verified successfully! You can now shop with us 🎉")
    }

    if (error) {
      if ("data" in error) {
        setErrorMessage((error as any).data?.message || "An error occurred while verifying the email.")
      } else {
        setErrorMessage("An unexpected error occurred. Please try again later.")
      }
    }
  }, [data, error, token, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 p-4">
      <Card className="w-full max-w-md shadow-xl border border-pink-200 rounded-2xl">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-6">
          <div className="rounded-full p-4 bg-pink-100 border border-pink-200 shadow-sm">
            <Image
              src="/assets/FRUTO png logo for white background.png"
              alt="Fruto Logo"
              width={120}
              height={40}
              priority
              className="h-12 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-pink-700">Verify Your Email</CardTitle>
          <CardDescription className="text-muted-foreground">
            Secure your Fruto account and start shopping
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="h-12 w-12 text-pink-500 animate-spin" />
              <p className="text-center text-muted-foreground">Verifying your email address...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive" className="border-pink-200 bg-pink-50">
                  <AlertTitle className="text-pink-700 font-semibold">Verification Failed</AlertTitle>
                  <AlertDescription className="text-black">{errorMessage}</AlertDescription>
                </Alert>
              )}
              {successMessage && (
                <Alert className="border-pink-200 bg-pink-50">
                  <AlertTitle className="text-pink-700 font-semibold">Success 🎉</AlertTitle>
                  <AlertDescription className="text-pink-600">{successMessage}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!isLoading && (
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg"
            >
              {successMessage ? "Continue to Login" : "Back to Login"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
