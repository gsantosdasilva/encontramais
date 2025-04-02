"use client";
import { Card } from "@/components/ui/card";
import { ProfessionalService } from "@/lib/services/professional-service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/supabase.types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, User, BarChart, Settings } from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";

type Professional = Database["public"]["Tables"]["professionals"]["Row"];

export default function DashboardPage() {
  const router = useRouter();
  const { professional: currentProfessional } = useAuth();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadProfessional = async () => {
      console.log("current", currentProfessional);
      try {
        if (!currentProfessional) {
          router.push("/login");
          return;
        }

        const data = await ProfessionalService.getProfessional(
          currentProfessional.id
        );

        setProfessional(data);
      } catch (error) {
        console.error("Erro ao carregar dados do profissional:", error);
        setError("Erro ao carregar dados. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfessional();
  }, [currentProfessional, router]);

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
        <h1 className="text-2xl font-bold">
          Bem-vindo(a), {professional?.name}!
        </h1>
        <p className="text-muted-foreground">
          Aqui está um resumo das suas informações e atividades
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Status da Assinatura
              </p>
              <p className="text-2xl font-bold mt-1">
                {professional?.subscription_status === "active"
                  ? "Ativa"
                  : "Inativa"}
              </p>
              {professional?.subscription_end_date && (
                <p className="text-sm text-muted-foreground mt-1">
                  Expira em:{" "}
                  {new Date(
                    professional.subscription_end_date
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
          <Link href="/dashboard/assinatura">
            <Button variant="outline" className="w-full mt-4">
              Gerenciar Assinatura
            </Button>
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Visualizações do Perfil
              </p>
              <p className="text-2xl font-bold mt-1">1.200</p>
              <p className="text-sm text-muted-foreground mt-1">
                +15% este mês
              </p>
            </div>
            <BarChart className="h-8 w-8 text-primary" />
          </div>
          <Link href="/dashboard/estatisticas">
            <Button variant="outline" className="w-full mt-4">
              Ver Detalhes
            </Button>
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Contatos Recebidos
              </p>
              <p className="text-2xl font-bold mt-1">490</p>
              <p className="text-sm text-muted-foreground mt-1">+8% este mês</p>
            </div>
            <User className="h-8 w-8 text-primary" />
          </div>
          <Link href="/dashboard/estatisticas">
            <Button variant="outline" className="w-full mt-4">
              Ver Detalhes
            </Button>
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
              <p className="text-2xl font-bold mt-1">40.8%</p>
              <p className="text-sm text-muted-foreground mt-1">+5% este mês</p>
            </div>
            <Settings className="h-8 w-8 text-primary" />
          </div>
          <Link href="/dashboard/estatisticas">
            <Button variant="outline" className="w-full mt-4">
              Ver Detalhes
            </Button>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Informações do Perfil</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Categoria</p>
              <p className="font-medium">{professional?.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Especialidade</p>
              <p className="font-medium">{professional?.specialty}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Experiência</p>
              <p className="font-medium">
                {professional?.experience
                  ? `${professional.experience} anos`
                  : "Não informada"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Localização</p>
              <p className="font-medium">
                {professional?.city}, {professional?.state}
              </p>
            </div>
          </div>
          <Link href="/dashboard/perfil">
            <Button variant="outline" className="w-full mt-4">
              Editar Perfil
            </Button>
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Novo contato recebido</p>
                <p className="text-sm text-muted-foreground">Há 2 horas</p>
              </div>
              <span className="text-sm text-primary">Ver detalhes</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Perfil visualizado</p>
                <p className="text-sm text-muted-foreground">Há 4 horas</p>
              </div>
              <span className="text-sm text-primary">Ver detalhes</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Avaliação recebida</p>
                <p className="text-sm text-muted-foreground">Há 1 dia</p>
              </div>
              <span className="text-sm text-primary">Ver detalhes</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
