"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useSignupMutation } from "@/redux/api/authApi"
import { useToast } from "@/components/ui/use-toast"


const registerFormSchema = z
  .object({
    fname: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lname: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast()

  const [signup] = useSignupMutation()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  })

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)
    try {
      const result = await signup(data).unwrap()
      console.log(result)

      toast({
        title: "Registration successful!",
        description: "Your account has been created. Please check your email to verify your account.",
        variant: "success",
      })
    } catch (err: any) {
      console.log(err, "78")
      toast({
        title: "Registration failed",
        description: err?.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
   <>
     <Button
        onClick={() =>
          toast({
            title: "Registration successful!",
            description: "Your account has been created 🚀",
              variant: "success",
          })
        }
      >
        Show Toast
      </Button>
     <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                    
                      autoComplete="given-name"
                      disabled={isLoading}
                      className="h-12 rounded-lg border-gray-200 bg-white focus-visible:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                     
                      autoComplete="family-name"
                      disabled={isLoading}
                      className="h-12 rounded-lg border-gray-200 bg-white focus-visible:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-purple-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    className="h-12 rounded-lg border-gray-200 bg-white focus-visible:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                 
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="h-12 rounded-lg border-gray-200 bg-white focus-visible:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-purple-500"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                    
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      disabled={isLoading}
                      className="h-12 rounded-lg border-gray-200 bg-white focus-visible:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-purple-500"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className="border-gray-300 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white dark:border-gray-600"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    I agree to the{" "}
                    <Link href="/terms" className="text-purple-600 hover:text-purple-500 dark:text-purple-400">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-purple-600 hover:text-purple-500 dark:text-purple-400">
                      privacy policy
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-12 w-full rounded-lg bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground dark:bg-gray-950">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="h-12 rounded-lg border-gray-200 bg-white hover:bg-gray-50 hover:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-purple-400"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="h-12 rounded-lg border-gray-200 bg-white hover:bg-gray-50 hover:text-purple-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-purple-400"
        >
          <svg className="mr-2 h-5 w-5" fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
          </svg>
          Facebook
        </Button>
      </div>
    </div>
   </>
  )
}
