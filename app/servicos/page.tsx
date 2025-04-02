import ServiceCard from "@/components/service-card"
import { Wrench, Zap, Paintbrush, Trash2, HardHat, Hammer } from "lucide-react"

// Dados atualizados para as categorias de serviços
const services = [
  {
    id: "encanadores",
    title: "Encanadores",
    description: "Profissionais especializados em reparos e instalações hidráulicas para sua casa ou empresa.",
    icon: <Wrench className="h-12 w-12" />,
    professionals: 48,
  },
  {
    id: "eletricistas",
    title: "Eletricistas",
    description: "Instalação, manutenção e reparo de sistemas elétricos residenciais e comerciais.",
    icon: <Zap className="h-12 w-12" />,
    professionals: 62,
  },
  {
    id: "pintores",
    title: "Pintores",
    description: "Serviços de pintura interna e externa para renovar o visual da sua casa ou empresa.",
    icon: <Paintbrush className="h-12 w-12" />,
    professionals: 37,
  },
  {
    id: "pedreiros",
    title: "Pedreiros",
    description: "Construção, reformas e reparos estruturais para projetos de qualquer tamanho.",
    icon: <HardHat className="h-12 w-12" />,
    professionals: 53,
  },
  {
    id: "marceneiros",
    title: "Marceneiros",
    description: "Móveis sob medida, restauração e projetos personalizados em madeira.",
    icon: <Hammer className="h-12 w-12" />,
    professionals: 41,
  },
  {
    id: "diaristas",
    title: "Diaristas",
    description: "Limpeza e organização profissional para manter sua casa impecável.",
    icon: <Trash2 className="h-12 w-12" />,
    professionals: 85,
  },
]

export default function ServicesPage() {
  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-2">Serviços</h1>
        <p className="text-muted-foreground mb-8">Encontre o profissional ideal para o serviço que você precisa</p>

        <h2 className="text-2xl font-bold mb-6">Todos os Serviços</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              professionals={service.professionals}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

