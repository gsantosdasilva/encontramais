import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Payment = Database['public']['Tables']['payments']['Row']
type NewPayment = Database['public']['Tables']['payments']['Insert']

export class PaymentService {
  static async createPayment(data: NewPayment) {
    const { data: payment, error } = await supabase
      .from('payments')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return payment
  }

  static async getPayment(paymentId: string) {
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*')
      .eq('payment_id', paymentId)
      .single()

    if (error) throw error
    return payment
  }

  static async updatePaymentStatus(paymentId: string, status: Payment['status']) {
    const { data: payment, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('payment_id', paymentId)
      .select()
      .single()

    if (error) throw error
    return payment
  }

  static async getProfessionalPayments(professionalId: string) {
    const { data: payments, error } = await supabase
      .from('payments')
      .select('*')
      .eq('professional_id', professionalId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return payments
  }
} 