import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase.types';

type Preferences = {
  emailNotifications: boolean;
  smsNotifications: boolean;
  showOnlineStatus: boolean;
  autoReply: boolean;
};

export class PreferencesService {
  static async getPreferences(professionalId: string): Promise<Preferences> {
    const { data, error } = await supabase
      .from('preferences')
      .select('*')
      .eq('professional_id', professionalId)
      .single();

    if (error) {
      // Se não existir preferências, retornar valores padrão
      if (error.code === 'PGRST116') {
        return {
          emailNotifications: true,
          smsNotifications: false,
          showOnlineStatus: true,
          autoReply: false,
        };
      }
      throw error;
    }

    return {
      emailNotifications: data.email_notifications,
      smsNotifications: data.sms_notifications,
      showOnlineStatus: data.show_online_status,
      autoReply: data.auto_reply,
    };
  }

  static async updatePreferences(
    professionalId: string,
    preferences: Preferences
  ): Promise<void> {
    const { error } = await supabase
      .from('preferences')
      .upsert({
        professional_id: professionalId,
        email_notifications: preferences.emailNotifications,
        sms_notifications: preferences.smsNotifications,
        show_online_status: preferences.showOnlineStatus,
        auto_reply: preferences.autoReply,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
  }
} 