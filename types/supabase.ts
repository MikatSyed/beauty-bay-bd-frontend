export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          avatar_url?: string
          role: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          avatar_url?: string
          role?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          avatar_url?: string
          role?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
