import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase.types';

type Professional = Database['public']['Tables']['professionals']['Row'];

export class AuthService {
  static async signUp(email: string, password: string, professionalData: Partial<Professional>) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (!authData.user) {
      throw new Error('Erro ao criar usuário');
    }

    // Criar registro do profissional
    const { data: professional, error: professionalError } = await supabase
      .from('professionals')
      .insert({
        id: authData.user.id,
        email,
        ...professionalData,
      })
      .select()
      .single();

    if (professionalError) throw professionalError;

    return professional;
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user) {
      throw new Error('Usuário não encontrado');
    }

    // Buscar dados do profissional
    const { data: professional, error: professionalError } = await supabase
      .from('professionals')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (professionalError) throw professionalError;

    return professional;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;

    if (!user) return null;

    const { data: professional, error: professionalError } = await supabase
      .from('professionals')
      .select('*')
      .eq('id', user.id)
      .single();

    if (professionalError) throw professionalError;

    return professional;
  }

  static async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  static async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
  }
} 