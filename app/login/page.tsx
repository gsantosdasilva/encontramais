"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { ProfessionalService } from "@/lib/services/professional-service";
import { useAuth } from "@/lib/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, professional } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (professional) {
      router.push("/dashboard");
    }
  }, [professional, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      await signIn(formData.email, formData.password);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Email ou senha inválidos. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6">
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
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link
                  href="/cadastro-profissional"
                  className="text-primary hover:underline"
                >
                  Registre-se
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Esqueceu sua senha?{" "}
                <Link
                  href="/recuperar-senha"
                  className="text-primary hover:underline"
                >
                  Recupere aqui
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
