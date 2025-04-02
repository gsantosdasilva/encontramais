"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function RedefinirSenhaPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Verificar se há um hash na URL (necessário para redefinição de senha)
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || !hash.includes("type=recovery")) {
      setError("Link de recuperação inválido ou expirado. Solicite um novo link.")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseClient()

      // Atualizar a senha do usuário
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })

      if (updateError) throw updateError

      setSuccess(true)

      // Redirecionar para a página de login após 3 segundos
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      console.error("Erro ao redefinir senha:", err)
      setError(err.message || "Não foi possível redefinir sua senha. Tente novamente ou solicite um novo link.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Redefinir senha</CardTitle>
          <CardDescription>Crie uma nova senha para sua conta</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Senha redefinida com sucesso! Você será redirecionado para a página de login em instantes.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || success}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading || success}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || success}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Redefinir senha"
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

