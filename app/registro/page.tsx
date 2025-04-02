"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/contexts/auth-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IMaskInput } from 'react-imask';
import { fetchAddressByCep } from '@/lib/services/cep-service';

// Tipos baseados no schema do banco
type ServiceCategory = 'Diarista' | 'Encanador' | 'Pedreiro' | 'Eletricista' | 'Pintor' | 'Marceneiro';

const CATEGORIES: { value: ServiceCategory; label: string }[] = [
  { value: 'Diarista', label: 'Diarista' },
  { value: 'Encanador', label: 'Encanador' },
  { value: 'Pedreiro', label: 'Pedreiro' },
  { value: 'Eletricista', label: 'Eletricista' },
  { value: 'Pintor', label: 'Pintor' },
  { value: 'Marceneiro', label: 'Marceneiro' },
];

export default function RegistroPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    category: '' as ServiceCategory,
    specialty: '',
    description: '',
    experience: '',
    cep: '',
    city: '',
    state: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleCepChange = async (value: string) => {
    try {
      setFormData(prev => ({ ...prev, cep: value }));
      
      if (value.replace(/\D/g, '').length === 8) {
        const addressData = await fetchAddressByCep(value);
        
        setFormData(prev => ({
          ...prev,
          city: addressData.localidade,
          state: addressData.uf,
          address: addressData.logradouro,
        }));
      }
    } catch (error: any) {
      console.error('Erro ao buscar CEP:', error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validações
      if (formData.password !== formData.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      if (!formData.category) {
        throw new Error('Selecione uma categoria');
      }

      // Remover campos que não vão para o banco
      const { confirmPassword, password, ...professionalData } = formData;
      
      const message = await signUp(formData.email, password, {
        ...professionalData,
        category: formData.category as ServiceCategory
      });

      setSuccess(message);
      
    } catch (error: any) {
      console.error('Erro ao criar conta:', error);
      setError(error.message || 'Erro ao criar conta. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Criar Conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar sua conta profissional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coluna 1 - Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="font-medium">Dados Pessoais</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <IMaskInput
                    id="phone"
                    name="phone"
                    mask="(00) 00000-0000"
                    value={formData.phone}
                    onAccept={(value) => setFormData({ ...formData, phone: value })}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <IMaskInput
                    id="cpf"
                    name="cpf"
                    mask="000.000.000-00"
                    value={formData.cpf}
                    onAccept={(value) => setFormData({ ...formData, cpf: value })}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Coluna 2 - Dados Profissionais e Endereço */}
              <div className="space-y-4">
                <h3 className="font-medium">Dados Profissionais</h3>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: ServiceCategory) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Input
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Anos de Experiência</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <h3 className="font-medium pt-4">Endereço</h3>

                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <IMaskInput
                    id="cep"
                    name="cep"
                    mask="00000-000"
                    value={formData.cep}
                    onAccept={handleCepChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Já tem uma conta? Faça login
              </Link>
              
              <Button type="submit" disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 