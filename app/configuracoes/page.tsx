"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Loader2, CheckCircle, Upload, Save } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { updatePassword } from "@/services/auth"

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("perfil")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para o formulário de perfil
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar_url: null as string | null,
  })

  // Estados para o formulário de senha
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      const supabase = getSupabaseClient()

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        const { data } = await supabase.from("profiles").select("name, avatar_url").eq("id", session.user.id).single()

        if (data) {
          setProfile({
            name: data.name,
            email: session.user.email || "",
            avatar_url: data.avatar_url,
          })
        }
      } else {
        // Redirecionar para login se não estiver autenticado
        router.push("/login")
      }
    }

    fetchUserProfile()
  }, [router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = getSupabaseClient()

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        throw new Error("Usuário não autenticado")
      }

      // Atualizar perfil
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
        })
        .eq("id", session.user.id)

      if (profileError) {
        throw new Error(profileError.message)
      }

      setSuccess("Perfil atualizado com sucesso!")
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err)
      setError("Não foi possível atualizar o perfil. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (passwords.newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await updatePassword(passwords.newPassword)
      setSuccess("Senha atualizada com sucesso!")
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      console.error("Erro ao atualizar senha:", err)
      setError("Não foi possível atualizar a senha. Verifique sua senha atual e tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]
    setIsLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseClient()

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        throw new Error("Usuário não autenticado")
      }

      // Upload da imagem
      const fileExt = file.name.split(".").pop()
      const fileName = `${session.user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage.from("avatars").upload(fileName, file)

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      // Obter URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName)

      // Atualizar perfil com nova URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
        })
        .eq("id", session.user.id)

      if (updateError) {
        throw new Error(updateError.message)
      }

      setProfile({
        ...profile,
        avatar_url: publicUrl,
      })

      setSuccess("Foto de perfil atualizada com sucesso!")
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err)
      setError("Não foi possível atualizar a foto de perfil. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Configurações</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="senha">Senha</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="avatar">Foto de Perfil</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-muted relative">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url || "/placeholder.svg"}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                          {profile.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-3 py-2 rounded-md">
                          <Upload className="h-4 w-4" />
                          <span>Alterar foto</span>
                        </div>
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={profile.email} disabled={true} className="bg-muted/50" />
                  <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar alterações
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="senha">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>Atualize sua senha de acesso</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordUpdate}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha atual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    "Atualizar senha"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

