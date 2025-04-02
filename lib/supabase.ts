import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase.types'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL não está definida')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida')
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export type Database = {
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
          category: string
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
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          cpf: string
          category: string
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
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          cpf?: string
          category?: string
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
    }
  }
} 