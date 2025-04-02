import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowLeft, Wrench, Zap, Paintbrush, Trash2, HardHat, Hammer } from "lucide-react"
import ProfessionalCard from "@/components/professional-card"
import CategoryBar from "@/components/category-bar"

// Mapeamento de ícones para cada serviço
const serviceIcons = {
  encanadores: <Wrench className="h-24 w-24" />,
  eletricistas: <Zap className="h-24 w-24" />,
  pintores: <Paintbrush className="h-24 w-24" />,
  diaristas: <Trash2 className="h-24 w-24" />,
  pedreiros: <HardHat className="h-24 w-24" />,
  marceneiros: <Hammer className="h-24 w-24" />,
}

// Dados simulados para as categorias de serviços
const services = {
  encanadores: {
    id: "encanadores",
    title: "Encanadores",
    description:
      "Profissionais especializados em reparos e instalações hidráulicas para sua casa ou empresa. Nossos encanadores são qualificados para resolver problemas como vazamentos, entupimentos, instalação de pias, torneiras, chuveiros e muito mais.",
    professionals: 48,
  },
  eletricistas: {
    id: "eletricistas",
    title: "Eletricistas",
    description:
      "Instalação, manutenção e reparo de sistemas elétricos residenciais e comerciais. Nossos eletricistas são capacitados para realizar serviços como instalação de tomadas, interruptores, luminárias, quadros de distribuição e muito mais.",
    professionals: 62,
  },
  pintores: {
    id: "pintores",
    title: "Pintores",
    description:
      "Serviços de pintura interna e externa para renovar o visual da sua casa ou empresa. Nossos pintores são qualificados para realizar trabalhos em residências, comércios e indústrias.",
    professionals: 37,
  },
  diaristas: {
    id: "diaristas",
    title: "Diaristas",
    description:
      "Limpeza e organização profissional para manter sua casa impecável. Nossas diaristas são treinadas para oferecer um serviço de alta qualidade, deixando sua casa limpa e organizada.",
    professionals: 85,
  },
  pedreiros: {
    id: "pedreiros",
    title: "Pedreiros",
    description:
      "Construção, reformas e reparos estruturais para projetos de qualquer tamanho. Nossos pedreiros são experientes em alvenaria, fundações, acabamentos e muito mais.",
    professionals: 53,
  },
  marceneiros: {
    id: "marceneiros",
    title: "Marceneiros",
    description:
      "Móveis sob medida, restauração e projetos personalizados em madeira. Nossos marceneiros são especializados em criar peças únicas e funcionais para sua casa ou escritório.",
    professionals: 41,
  },
}

// Dados simulados para profissionais
const professionals = [
  {
    id: "prof1",
    name: "Carlos Silva",
    image: "/placeholder.svg?height=300&width=400",
    specialty: "Encanador Residencial",
    rating: 4.8,
    location: "São Paulo, SP",
    isPremium: true,
    phone: "5511987654321",
  },
  {
    id: "prof2",
    name: "Ana Oliveira",
    image: "/placeholder.svg?height=300&width=400",
    specialty: "Encanadora Industrial",
    rating: 4.5,
    location: "São Paulo, SP",
    isPremium: false,
    phone: "5511987654322",
  },
  {
    id: "prof3",
    name: "Roberto Santos",
    image: "/placeholder.svg?height=300&width=400",
    specialty: "Encanador Geral",
    rating: 4.7,
    location: "Guarulhos, SP",
    isPremium: true,
    phone: "5511987654323",
  },
  {
    id: "prof4",
    name: "Juliana Costa",
    image: "/placeholder.svg?height=300&width=400",
    specialty: "Encanadora Especialista",
    rating: 4.9,
    location: "Osasco, SP",
    isPremium: false,
    phone: "5511987654324",
  },
  {
    id: "prof5",
    name: "Marcos Pereira",
    image: "/placeholder.svg?height=300&width=400",
    specialty: "Encanador Residencial",
    rating: 4.6,
    location: "São Bernardo, SP",
    isPremium: false,
    phone: "5511987654325",
  },
  {
    id: "prof6",
    name: "Fernanda Lima",
    image: "/placeholder.svg?height=300&width=400",
    specialty: "Encanadora Comercial",
    rating: 4.4,
    location: "Santo André, SP",
    isPremium: true,
    phone: "5511987654326",
  },
]

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug as keyof typeof services] || {
    id: params.slug,
    title: params.slug.charAt(0).toUpperCase() + params.slug.slice(1),
    description: "Profissionais especializados nesta categoria de serviço.",
    professionals: 30,
  }

  // Obter o ícone correspondente ou usar um ícone padrão
  const serviceIcon = serviceIcons[params.slug as keyof typeof serviceIcons] || <Wrench className="h-24 w-24" />

  return (
    <div>
      <CategoryBar />
      <div className="py-12">
        <div className="container">
          <Link href="/servicos" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para categorias
          </Link>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted/50 flex items-center justify-center">
              <div className="text-primary">{serviceIcon}</div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
              <Badge variant="outline" className="mb-4">
                {service.professionals} profissionais
              </Badge>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar profissionais..." className="pl-9" />
                </div>
                <Button className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Profissionais disponíveis</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {professionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                id={professional.id}
                name={professional.name}
                image={professional.image}
                specialty={professional.specialty}
                rating={professional.rating}
                location={professional.location}
                isPremium={professional.isPremium}
                phone={professional.phone}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline">Carregar mais</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

