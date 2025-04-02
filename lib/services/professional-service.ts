import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Professional = Database['public']['Tables']['professionals']['Row']
type NewProfessional = Database['public']['Tables']['professionals']['Insert']

export class ProfessionalService {
  static async createProfessional(data: NewProfessional) {
    const { data: professional, error } = await supabase
      .from('professionals')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return professional
  }

  static async getProfessional(id: string) {
    const { data: professional, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return professional
  }

  static async updateProfessional(id: string, data: Partial<Professional>) {
    const { data: professional, error } = await supabase
      .from('professionals')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return professional
  }

  static async updateSubscriptionStatus(id: string, status: Professional['subscription_status'], endDate: string | null) {
    const { data: professional, error } = await supabase
      .from('professionals')
      .update({
        subscription_status: status,
        subscription_end_date: endDate,
        status: status === 'active' ? 'active' : 'inactive'
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return professional
  }

  static async login(email: string, password: string) {
    const { data: professional, error } = await supabase
      .from('professionals')
      .select()
      .eq('email', email)
      .eq('password', password) // TODO: Implementar hash de senha
      .single()

    if (error) {
      throw error
    }

    return professional
  }
} 