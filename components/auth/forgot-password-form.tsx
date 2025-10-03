"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "../ui/use-toast"
import { useForgotPasswordMutation } from "@/redux/api/authApi"

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [forgotPassword] = useForgotPasswordMutation()

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })


  async function onSubmit(data: ForgotPasswordValues) {
    setIsLoading(true)

    try {
      // Fixed: Pass email in the correct format
      const result = await forgotPassword(data).unwrap();
      console.log(result,'29')
      
      setIsSubmitted(true)
      // Fixed: Correct success message for forgot password
      toast({
        title: "Reset link sent!",
        description: "Check your email for the password reset link.",
        variant: "success"
      })

    } catch (error: any) {
      // Improved error handling
      const errorMessage = error?.message || "Failed to send reset email"
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300">Check your email</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400">
            We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive an email?{" "}
            <Button
              variant="link"
              className="p-0 text-blue-600 dark:text-blue-400"
              onClick={() => setIsSubmitted(false)}
            >
              Try again
            </Button>
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/auth/login"
            className="inline-block text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    className="h-12 rounded-lg border-gray-200 bg-white focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-12 w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Link
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
