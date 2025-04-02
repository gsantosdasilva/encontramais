import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProfessionalService } from '@/lib/services/professional-service';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/supabase.types';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Professional = Database['public']['Tables']['professionals']['Row'];

export default function PerfilPage() {
  const router = useRouter();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    specialty: '',
    experience: '',
    description: '',
    cep: '',
    city: '',
    state: '',
    address: '',
  });

  useEffect(() => {
    const loadProfessional = async () => {
      try {
        // TODO: Implementar autenticação e obter o ID do profissional logado
        const professionalId = '123'; // Exemplo
        const data = await ProfessionalService.getProfessional(professionalId);
        setProfessional(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          category: data.category,
          specialty: data.specialty,
          experience: data.experience?.toString() || '',
          description: data.description,
          cep: data.cep,
          city: data.city,
          state: data.state,
          address: data.address,
        });
      } catch (error) {
        console.error('Erro ao carregar dados do profissional:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfessional();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError('');
      setSuccess('');

      if (!professional) {
        throw new Error('Profissional não encontrado');
      }

      await ProfessionalService.updateProfessional(professional.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        specialty: formData.specialty,
        experience: formData.experience ? parseInt(formData.experience) : null,
        description: formData.description,
        cep: formData.cep,
        city: formData.city,
        state: formData.state,
        address: formData.address,
      });

      setSuccess('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setError('Erro ao atualizar perfil. Por favor, tente novamente.');
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
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Perfil</h1>

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidade</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Anos de Experiência</Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) =>
                  setFormData({ ...formData, cep: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 