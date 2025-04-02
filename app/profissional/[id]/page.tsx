import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Star, MapPin, Phone, Mail, Calendar, Clock, Check } from "lucide-react"

// Dados simulados para o profissional
const professionalData = {
  id: "prof1",
  name: "Carlos Silva",
  specialty: "Encanador Residencial",
  category_id: 1,
  description:
    "Profissional com mais de 10 anos de experiência em instalações e reparos hidráulicos residenciais. Atendimento rápido e eficiente, com garantia de serviço.",
  experience: "10 anos",
  location: "São Paulo, SP",
  availability: "Segunda a Sexta, 8h às 18h",
  is_premium: true,
  is_active: true,
  avatar_url: "/placeholder.svg?height=400&width=400",
  email: "contato@exemplo.com",
  phone: "(11) 98765-4321",
}

// Dados simulados para serviços
const services = [
  { id: 1, name: "Instalação de torneira", price: "R$ 120,00" },
  { id: 2, name: "Reparo de vazamento", price: "R$ 150,00" },
  { id: 3, name: "Desentupimento de pia", price: "R$ 180,00" },
  { id: 4, name: "Instalação de chuveiro", price: "R$ 200,00" },
]

// Dados simulados para portfólio
const portfolio = [
  { id: 1, title: "Instalação de pia", image_url: "/placeholder.svg?height=300&width=400" },
  { id: 2, title: "Reparo de vazamento", image_url: "/placeholder.svg?height=300&width=400" },
  { id: 3, title: "Troca de torneira", image_url: "/placeholder.svg?height=300&width=400" },
  { id: 4, title: "Instalação de chuveiro", image_url: "/placeholder.svg?height=300&width=400" },
]

export default function ProfessionalPage({ params }: { params: { id: string } }) {
  // Simulação de busca do profissional pelo ID
  const professional = professionalData

  return (
    <div className="py-12">
      <div className="container">
        <Link
          href={`/servico/encanadores`}
          className="flex items-center text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para serviços
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={professional.avatar_url || "/placeholder.svg"}
                  alt={professional.name}
                  fill
                  className="object-cover"
                />
                {professional.is_premium && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                    Premium
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-2">{professional.name}</h1>
              <p className="text-muted-foreground mb-2">{professional.specialty}</p>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 4.5 ? "fill-primary text-primary" : "text-muted"}`} />
                  ))}
                </div>
                <span className="ml-2 text-sm">4.5</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{professional.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{professional.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{professional.email}</span>
                </div>
                {professional.experience && (
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{professional.experience} de experiência</span>
                  </div>
                )}
                {professional.availability && (
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{professional.availability}</span>
                  </div>
                )}
              </div>

              <Button className="w-full">
                <a
                  href={`https://wa.me/5511987654321?text=Olá ${professional.name}, encontrei seu perfil no Encontra+ e gostaria de solicitar um orçamento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full"
                >
                  Contatar via WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
                <TabsTrigger value="prices">Preços</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Sobre</h2>
                    <p className="text-muted-foreground">{professional.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Especialidades</h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{professional.specialty}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Portfólio</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {portfolio.map((item) => (
                        <div key={item.id} className="relative aspect-square rounded-md overflow-hidden cursor-pointer">
                          <Image
                            src={item.image_url || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="text-white text-center p-4">
                              <p className="font-medium">{item.title}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prices">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Tabela de Preços</h2>
                    <div className="space-y-4">
                      {services.map((service) => (
                        <div key={service.id} className="flex justify-between items-center py-2 border-b last:border-0">
                          <div className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-primary" />
                            <span>{service.name}</span>
                          </div>
                          <span className="font-medium">{service.price}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      * Os preços podem variar de acordo com a complexidade do serviço.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

