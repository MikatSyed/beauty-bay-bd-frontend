export interface User {
  id: string
  username: string
  email: string
  role: "farmer" | "buyer" | "admin"
  avatarUrl?: string
}

export interface SidebarProps {
  role?: string
}

export interface HeaderProps {
  user?: User
  isLoading?: boolean
  error?: any
}
