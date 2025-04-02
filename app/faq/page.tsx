"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram } from "lucide-react"

// Dados simulados para as perguntas frequentes
const faqCategories = [
  {
    id: "geral",
    label: "Geral",
    questions: [
      {
        question: "O que é o Encontra+?",
        answer:
          "O Encontra+ é uma plataforma que conecta profissionais de diversas áreas a clientes que precisam de seus serviços. Nosso objetivo é facilitar o encontro entre quem precisa de um serviço e quem pode realizá-lo com qualidade.",
      },
      {
        question: "Como funciona o Encontra+?",
        answer:
          "O Encontra+ funciona como um marketplace de serviços. Os profissionais se cadastram, criam seus perfis e disponibilizam seus serviços. Os clientes podem buscar por categoria, localização ou nome do profissional, visualizar perfis, portfólios e entrar em contato diretamente.",
      },
      {
        question: "O Encontra+ está disponível em quais regiões?",
        answer:
          "Atualmente, o Encontra+ está disponível em todo o Brasil, com maior concentração de profissionais nas capitais e regiões metropolitanas.",
      },
    ],
  },
  {
    id: "clientes",
    label: "Para Clientes",
    questions: [
      {
        question: "É necessário criar uma conta para contratar um serviço?",
        answer: "Não é obrigatório criar uma conta para navegar e visualizar os perfis dos profissionais.",
      },
      {
        question: "Como posso entrar em contato com um profissional?",
        answer:
          "Você pode entrar em contato diretamente pelo WhatsApp, disponível na página de perfil de cada profissional.",
      },
      {
        question: "O Encontra+ cobra alguma taxa dos clientes?",
        answer:
          "Não, o Encontra+ é totalmente gratuito para os clientes. Não cobramos nenhuma taxa ou comissão sobre os serviços contratados.",
      },
    ],
  },
  {
    id: "profissionais",
    label: "Para Profissionais",
    questions: [
      {
        question: "Como posso me cadastrar como profissional?",
        answer:
          "Para se cadastrar como profissional, clique em 'Cadastre-se' no menu superior e siga o processo de cadastro em 5 etapas: informações pessoais, perfil profissional, portfólio, escolha do plano e pagamento.",
      },
      {
        question: "Quais são os planos disponíveis para profissionais?",
        answer:
          "Oferecemos três planos: Mensal (R$ 29,99), Trimestral (R$ 80,97 com 10% de desconto) e Anual (R$ 287,90 com 20% de desconto).",
      },
      {
        question: "Posso cancelar minha assinatura a qualquer momento?",
        answer:
          "Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais. O acesso à plataforma permanecerá ativo até o final do período contratado.",
      },
    ],
  },
  {
    id: "pagamentos",
    label: "Pagamentos",
    questions: [
      {
        question: "Quais formas de pagamento são aceitas?",
        answer:
          "Aceitamos cartões de crédito, débito, boleto bancário e PIX para o pagamento dos planos de assinatura.",
      },
      {
        question: "O Encontra+ intermedia o pagamento dos serviços?",
        answer:
          "Não, o Encontra+ não intermedia o pagamento dos serviços. O pagamento é combinado diretamente entre o cliente e o profissional.",
      },
      {
        question: "É possível emitir nota fiscal?",
        answer:
          "Sim, emitimos nota fiscal para todos os pagamentos de planos de assinatura. A nota fiscal é enviada automaticamente para o email cadastrado.",
      },
    ],
  },
]

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState("geral")

  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-muted-foreground">Encontre respostas para as dúvidas mais comuns sobre o Encontra+</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <Tabs defaultValue="geral" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ainda tem dúvidas?</CardTitle>
                <CardDescription>
                  Siga-nos no Instagram e envie sua pergunta por lá. Nossa equipe responderá o mais breve possível.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full mb-4">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <p className="text-center mb-4">
                  Estamos sempre ativos no Instagram e respondemos todas as mensagens e comentários rapidamente.
                </p>
                <a href="https://instagram.com/encontramais" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">
                    <Instagram className="mr-2 h-4 w-4" />
                    Seguir no Instagram
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

