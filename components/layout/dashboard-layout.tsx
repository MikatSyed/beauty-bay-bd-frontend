"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart,
  Tag,
  Mail,
  FileText,
  Settings,
  HelpCircle,
  Menu,
  User,
  Bell,
  Search,
  FileIcon as FileInvoice,
  Sun,
  Moon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
    badge: "12",
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    badge: "3",
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    icon: FileInvoice,
  },
  {
    title: "Promotions",
    href: "/dashboard/promotions",
    icon: Tag,
  },
  {
    title: "Marketing",
    href: "/dashboard/marketing",
    icon: Mail,
  },
  {
    title: "Content",
    href: "/dashboard/content",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="px-7">
                  <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                    <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gradient-to-br from-pink-500 to-purple-500">
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                        B
                      </div>
                    </div>
                    <span className="text-lg font-bold">Beauty Admin</span>
                  </Link>
                </div>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                  <div className="pl-6 pr-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-pink-50 hover:text-pink-700 dark:hover:bg-pink-950 dark:hover:text-pink-300",
                          pathname === item.href
                            ? "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300"
                            : "text-muted-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="outline" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <Link href="/" className="hidden items-center gap-2 md:flex">
              <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gradient-to-br from-pink-500 to-purple-500">
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">B</div>
              </div>
              <span className="text-lg font-bold">Beauty Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] rounded-full bg-background pl-8 md:w-[240px] lg:w-[320px]"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-pink-500"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="hidden md:flex"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/admin-profile.png" alt="Admin" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Sun className="mr-2 h-4 w-4" />
                  {mounted && theme === "light" ? "Dark Mode" : "Light Mode"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-pink-50 hover:text-pink-700 dark:hover:bg-pink-950 dark:hover:text-pink-300",
                    pathname === item.href
                      ? "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300"
                      : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="outline" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 overflow-auto bg-muted/10 md:ml-64">{children}</main>
      </div>
    </div>
  )
}
