"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PriceCard from "@/components/price-card"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrecosPage() {
  const router = useRouter()
  const [plans] = useState([
    {
      id: "mensal",
      title: "Plano Mensal",
      price: 29.99,
      description: "Ideal para testar a plataforma",
      features: ["Perfil profissional completo", "Portfólio", "WhatsApp compartilhado aos clientes"],
      popular: false,
      discount: 0,
      period: "mês",
      buttonText: "Assinar agora",
    },
    {
      id: "trimestral",
      title: "Plano Trimestral",
      price: 80.97,
      description: "Economia de 10% em relação ao mensal",
      features: ["Perfil profissional completo", "Portfólio", "WhatsApp compartilhado aos clientes"],
      popular: true,
      discount: 10,
      period: "trimestre",
      buttonText: "Assinar agora",
    },
    {
      id: "anual",
      title: "Plano Anual",
      price: 287.9,
      description: "Economia de 20% em relação ao mensal",
      features: [
        "Perfil profissional completo",
        "Portfólio",
        "WhatsApp compartilhado aos clientes",
        "Selo Premium no perfil",
      ],
      popular: false,
      discount: 20,
      period: "ano",
      buttonText: "Assinar agora",
    },
  ])

  const handlePlanSelect = (planId: string) => {
    // Salvar o plano selecionado no localStorage
    localStorage.setItem("selectedPlan", planId)

    // Redirecionar para a página de cadastro
    router.push("/cadastro-profissional")
  }

  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Planos e Preços</h1>
          <p className="text-muted-foreground mb-2">
            Escolha o plano ideal para divulgar seus serviços e conectar-se com novos clientes
          </p>
          <div className="flex items-center justify-center gap-2 bg-amber-50 text-amber-800 p-2 rounded-md border border-amber-200 max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
              <path
                fill="currentColor"
                d="M208.5 112.3A96 96 0 0 1 48 128a95.4 95.4 0 0 1-1.3-15.1C46.7 59.1 91.6 14.3 145.3 14A96 96 0 0 1 208.5 112.3M224 128a96 96 0 0 1-192 0a95.4 95.4 0 0 1 1.3 15.1c0 53.8-44.9 98.6-98.6 98.9a96 96 0 0 1 289.3 0c0-53.8 44.9-98.6 98.6-98.9a96 96 0 0 1-98.6-15.1"
              />
            </svg>
            <span className="font-medium">Neste momento estamos aceitando apenas pagamento via PIX</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PriceCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              discount={plan.discount}
              period={plan.period}
              buttonText={plan.buttonText}
              onClick={() => handlePlanSelect(plan.id)}
            />
          ))}
        </div>

        <div className="mt-16 bg-muted rounded-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Perguntas sobre os planos?</h2>
              <p className="text-muted-foreground mb-4">
                Entre em contato com nossa equipe para tirar dúvidas sobre os planos e escolher a melhor opção para
                você.
              </p>
              <Button>Fale conosco</Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Suporte dedicado</h3>
                  <p className="text-sm text-muted-foreground">Atendimento prioritário para todos os planos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Pagamento via PIX</h3>
                  <p className="text-sm text-muted-foreground">Rápido, seguro e sem taxas adicionais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

