"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useAuth } from '@/lib/contexts/auth-context'
import { useRouter } from 'next/navigation'

export default function RecuperarSenhaPage() {
  const router = useRouter()
  const { resetPassword, professional } = useAuth()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  useEffect(() => {
    if (professional) {
      router.push('/dashboard')
    }
  }, [professional, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      setError("")
      setSuccess("")
      await resetPassword(email)
      setSuccess("Email de recuperação enviado com sucesso!")
    } catch (error) {
      console.error("Erro ao recuperar senha:", error)
      setError("Erro ao enviar email de recuperação. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Recuperar Senha</h1>
          <p className="text-muted-foreground">
            Digite seu email para receber as instruções de recuperação
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

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Instruções"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Lembrou sua senha?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

