

import VerifyEmailPage from "@/components/pages/email-verification-page"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"



export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-12 w-12 text-emerald-500 animate-spin" />
            <p className="text-center text-muted-foreground">Loading verification page...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailPage />
    </Suspense>
  )
}
