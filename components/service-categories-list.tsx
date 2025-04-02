import type React from "react"
import { getServiceCategories } from "@/services/categories"
import ServiceCard from "@/components/service-card"
import { Wrench, Zap, Paintbrush, Trash2, HardHat, Hammer } from "lucide-react"

// Mapeamento de ícones para cada serviço
const categoryIcons: Record<string, React.ReactNode> = {
  encanadores: <Wrench className="h-12 w-12" />,
  eletricistas: <Zap className="h-12 w-12" />,
  pintores: <Paintbrush className="h-12 w-12" />,
  diaristas: <Trash2 className="h-12 w-12" />,
  pedreiros: <HardHat className="h-12 w-12" />,
  marceneiros: <Hammer className="h-12 w-12" />,
}

export default async function ServiceCategoriesList() {
  const categories = await getServiceCategories()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
      {categories.map((category) => (
        <ServiceCard
          key={category.id}
          id={category.slug}
          title={category.name}
          description={category.description || ""}
          icon={categoryIcons[category.slug] || <Wrench className="h-12 w-12" />}
          professionals={category.professionals_count}
        />
      ))}
    </div>
  )
}

