import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProfessionalService } from '@/lib/services/professional-service';
import { PreferencesService } from '@/lib/services/preferences-service';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/supabase.types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/contexts/auth-context';

type Professional = Database['public']['Tables']['professionals']['Row'];

export default function ConfiguracoesPage() {
  const router = useRouter();
  const { professional: currentProfessional, updatePassword } = useAuth();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    showOnlineStatus: true,
    autoReply: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!currentProfessional) {
          router.push('/login');
          return;
        }

        const [professionalData, preferencesData] = await Promise.all([
          ProfessionalService.getProfessional(currentProfessional.id),
          PreferencesService.getPreferences(currentProfessional.id),
        ]);

        setProfessional(professionalData);
        setPreferences(preferencesData);
        setFormData({
          email: professionalData.email,
          phone: professionalData.phone,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentProfessional, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError('');
      setSuccess('');

      if (!professional) {
        throw new Error('Profissional não encontrado');
      }

      // Validar senha
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError('As senhas não coincidem');
          return;
        }

        // Atualizar senha
        await updatePassword(formData.newPassword);
      }

      // Atualizar dados do profissional e preferências
      await Promise.all([
        ProfessionalService.updateProfessional(professional.id, {
          email: formData.email,
          phone: formData.phone,
        }),
        PreferencesService.updatePreferences(professional.id, preferences),
      ]);

      setSuccess('Configurações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      setError('Erro ao atualizar configurações. Por favor, tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e informações da conta
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Informações da Conta</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input
                id="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Preferências</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receber atualizações e novidades por email
                </p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, emailNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações por SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações por mensagem de texto
                </p>
              </div>
              <Switch
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, smsNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Status Online</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar quando estiver disponível
                </p>
              </div>
              <Switch
                checked={preferences.showOnlineStatus}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, showOnlineStatus: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Resposta Automática</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar mensagem automática quando não estiver disponível
                </p>
              </div>
              <Switch
                checked={preferences.autoReply}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, autoReply: checked })
                }
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 