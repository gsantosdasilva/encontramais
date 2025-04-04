"use client";
import { Card } from "@/components/ui/card";
import { ProfessionalService } from "@/lib/services/professional-service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/supabase.types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Professional = Database["public"]["Tables"]["professionals"]["Row"];

// Dados simulados para o gráfico
const data = [
  { name: "Jan", views: 120, contacts: 45 },
  { name: "Fev", views: 150, contacts: 60 },
  { name: "Mar", views: 180, contacts: 75 },
  { name: "Abr", views: 200, contacts: 90 },
  { name: "Mai", views: 220, contacts: 100 },
  { name: "Jun", views: 250, contacts: 120 },
];

export default function EstatisticasPage() {
  const router = useRouter();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadProfessional = async () => {
      try {
        // TODO: Implementar autenticação e obter o ID do profissional logado
        const professionalId = "123"; // Exemplo
        const data = await ProfessionalService.getProfessional(professionalId);
        setProfessional(data);
      } catch (error) {
        console.error("Erro ao carregar dados do profissional:", error);
        setError("Erro ao carregar dados. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfessional();
  }, []);

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
        <h1 className="text-2xl font-bold mb-6">Estatísticas</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Visualizações Totais</h3>
            <p className="text-3xl font-bold">1.200</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Contatos Totais</h3>
            <p className="text-3xl font-bold">490</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Taxa de Conversão</h3>
            <p className="text-3xl font-bold">40.8%</p>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Desempenho Mensal</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" name="Visualizações" />
                <Bar dataKey="contacts" fill="#82ca9d" name="Contatos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top 5 Cidades</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>São Paulo, SP</span>
                <span className="font-medium">450 visualizações</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Rio de Janeiro, RJ</span>
                <span className="font-medium">320 visualizações</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Belo Horizonte, MG</span>
                <span className="font-medium">280 visualizações</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Curitiba, PR</span>
                <span className="font-medium">250 visualizações</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Porto Alegre, RS</span>
                <span className="font-medium">200 visualizações</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Horários de Pico</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Manhã (8h - 12h)</span>
                <span className="font-medium">35% dos contatos</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tarde (13h - 18h)</span>
                <span className="font-medium">45% dos contatos</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Noite (19h - 23h)</span>
                <span className="font-medium">20% dos contatos</span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
