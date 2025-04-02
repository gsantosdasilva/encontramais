export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      professionals: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          cpf: string
          category: string[]
          specialty: string
          experience: number | null
          description: string
          cep: string
          city: string
          state: string
          address: string
          status: 'pending' | 'active' | 'inactive'
          subscription_status: 'active' | 'inactive' | 'expired'
          subscription_end_date: string | null
          subscription_plan: string | null
          password: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          cpf: string
          category: string[]
          specialty: string
          experience?: number | null
          description: string
          cep: string
          city: string
          state: string
          address: string
          status?: 'pending' | 'active' | 'inactive'
          subscription_status?: 'active' | 'inactive' | 'expired'
          subscription_end_date?: string | null
          subscription_plan?: string | null
          password: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          cpf?: string
          category?: string[]
          specialty?: string
          experience?: number | null
          description?: string
          cep?: string
          city?: string
          state?: string
          address?: string
          status?: 'pending' | 'active' | 'inactive'
          subscription_status?: 'active' | 'inactive' | 'expired'
          subscription_end_date?: string | null
          subscription_plan?: string | null
          password?: string
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          professional_id: string
          amount: number
          status: 'pending' | 'paid' | 'failed' | 'expired'
          payment_method: 'pix'
          payment_id: string
          plan_id: string
          expires_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          professional_id: string
          amount: number
          status?: 'pending' | 'paid' | 'failed' | 'expired'
          payment_method: 'pix'
          payment_id: string
          plan_id: string
          expires_at: string
        }
        Update: {
          id?: string
          created_at?: string
          professional_id?: string
          amount?: number
          status?: 'pending' | 'paid' | 'failed' | 'expired'
          payment_method?: 'pix'
          payment_id?: string
          plan_id?: string
          expires_at?: string
        }
      }
      preferences: {
        Row: {
          id: string
          professional_id: string
          email_notifications: boolean
          sms_notifications: boolean
          show_online_status: boolean
          auto_reply: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          email_notifications?: boolean
          sms_notifications?: boolean
          show_online_status?: boolean
          auto_reply?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          email_notifications?: boolean
          sms_notifications?: boolean
          show_online_status?: boolean
          auto_reply?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 