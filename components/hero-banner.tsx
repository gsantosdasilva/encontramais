"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import FadeIn from "@/components/fade-in"
import { Search, ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

// Lista de serviços disponíveis para busca
const availableServices = [
  { name: "Encanadores", slug: "encanadores" },
  { name: "Eletricistas", slug: "eletricistas" },
  { name: "Pintores", slug: "pintores" },
  { name: "Diaristas", slug: "diaristas" },
  { name: "Pedreiros", slug: "pedreiros" },
  { name: "Marceneiros", slug: "marceneiros" },
]

export default function HeroBanner() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const isMobile = useMobile()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Normalizar a busca (remover acentos, converter para minúsculas)
    const normalizedQuery = searchQuery
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

    // Procurar correspondência nos serviços disponíveis
    const matchedService = availableServices.find((service) => {
      const normalizedService = service.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
      return normalizedService.includes(normalizedQuery) || normalizedQuery.includes(normalizedService)
    })

    // Redirecionar para a página do serviço correspondente ou para a página de serviços
    setTimeout(() => {
      if (matchedService) {
        router.push(`/servico/${matchedService.slug}`)
      } else {
        router.push("/servicos")
      }
      setIsSearching(false)
    }, 500) // Pequeno delay para mostrar o estado de carregamento
  }

  return (
    <div className="relative hero-pattern overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Encontre os melhores profissionais gratuitamente
              </h1>
            </FadeIn>

            <FadeIn delay={300}>
              <p className="text-lg md:text-xl text-white/80">
                Conectamos você aos profissionais mais qualificados para realizar seus serviços. Rápido, seguro e com
                toda a praticidade que você precisa.
              </p>
            </FadeIn>

            <FadeIn delay={500}>
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={isMobile ? "O que você está procurando?" : "O que você está procurando? Ex: Eletricista"}
                  className="pl-10 h-12 bg-white/95 border-0 text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                />
                <Button type="submit" className="absolute right-1 top-1 h-10" disabled={isSearching}>
                  {isSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Buscando...
                    </>
                  ) : (
                    "Buscar"
                  )}
                </Button>
              </form>
            </FadeIn>

            <FadeIn delay={700} className="flex flex-wrap gap-4">
              <Link href="/servicos">
                <Button variant="secondary" size="lg">
                  Explorar serviços
                </Button>
              </Link>
              <Link href="/cadastro-profissional">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Sou profissional
                </Button>
              </Link>
            </FadeIn>
          </div>

          <FadeIn delay={400} className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full transform -translate-x-10"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {["Encanadores", "Eletricistas", "Pintores", "Diaristas"].map((service, index) => (
                    <Link href={`/servico/${service.toLowerCase()}`} key={index}>
                      <div className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-lg text-center">
                        <span className="text-white font-medium">{service}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/servicos"
                    className="text-white/80 hover:text-white text-sm flex items-center justify-center"
                  >
                    Ver todas as categorias
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={800} className="mt-12 text-center">
          <p className="text-white/80">
            Mais de <span className="font-bold">500 profissionais</span> cadastrados em todo o Brasil
          </p>
        </FadeIn>
      </div>

      <div className="section-divider"></div>
    </div>
  )
}

