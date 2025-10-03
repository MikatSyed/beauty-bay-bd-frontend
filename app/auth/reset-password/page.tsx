import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

function ResetPasswordFallback() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Loading reset form...
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Top Navbar / Logo */}
      <div className="flex justify-center p-8">
        <Link href="/" className="inline-block group">
          <Image
            src="/assets/beauty-bay-logo.png" // your Beauty Bay BD logo
            alt="Beauty Bay BD Logo"
            width={200}
            height={60}
            priority
            className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-md border border-pink-200 rounded-2xl shadow-xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Reset Your <span className="text-pink-600">Password</span>
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Enter your new password below and reclaim access to{" "}
                <span className="font-semibold text-pink-500">
                  Beauty Bay BD
                </span>
                .
              </p>
            </div>

            {/* Form */}
            <Suspense fallback={<ResetPasswordFallback />}>
              <ResetPasswordForm />
            </Suspense>

            {/* Extra Info */}
            <p className="mt-6 text-xs text-center text-gray-500">
              For assistance, contact{" "}
              <a
                href="mailto:support@beautybaybd.com"
                className="text-pink-600 hover:underline font-medium"
              >
                support@beautybaybd.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Beauty Bay BD. All rights reserved.
      </footer>
    </div>
  );
}
