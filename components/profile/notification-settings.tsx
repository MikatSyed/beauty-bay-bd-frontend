"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Notification settings
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [productAlerts, setProductAlerts] = useState(true)
  const [customerActivity, setCustomerActivity] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [securityAlerts, setSecurityAlerts] = useState(true)

  // Notification method
  const [notificationMethod, setNotificationMethod] = useState("email")

  function onSave() {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <h4 className="font-medium">Order Updates</h4>
              <p className="text-sm text-muted-foreground">Receive notifications about order status changes</p>
            </div>
            <Switch checked={orderUpdates} onCheckedChange={setOrderUpdates} aria-label="Order updates" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <h4 className="font-medium">Product Alerts</h4>
              <p className="text-sm text-muted-foreground">Get notified about low stock and product issues</p>
            </div>
            <Switch checked={productAlerts} onCheckedChange={setProductAlerts} aria-label="Product alerts" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <h4 className="font-medium">Customer Activity</h4>
              <p className="text-sm text-muted-foreground">Notifications about new customers and reviews</p>
            </div>
            <Switch checked={customerActivity} onCheckedChange={setCustomerActivity} aria-label="Customer activity" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <h4 className="font-medium">Marketing Emails</h4>
              <p className="text-sm text-muted-foreground">Receive tips, product updates and offers</p>
            </div>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} aria-label="Marketing emails" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <h4 className="font-medium">Security Alerts</h4>
              <p className="text-sm text-muted-foreground">Important notifications about your account security</p>
            </div>
            <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} aria-label="Security alerts" />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Method</h3>
        <RadioGroup value={notificationMethod} onValueChange={setNotificationMethod}>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="email" id="email" />
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <p className="text-sm text-muted-foreground">Notifications will be sent to your email address</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="push" id="push" />
            <div className="grid gap-1.5">
              <Label htmlFor="push">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications directly in your browser</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="both" id="both" />
            <div className="grid gap-1.5">
              <Label htmlFor="both">Both</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email and push notifications</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={onSave} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save preferences
      </Button>
    </div>
  )
}
