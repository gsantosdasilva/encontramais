"use client"

import { useRef } from "react"
import ServiceCategoryCircle from "./service-category-circle"
import { Wrench, Zap, Paintbrush, Trash2, HardHat, Hammer } from "lucide-react"

// Dados atualizados para as categorias de serviços
const serviceCategories = [
  { id: "encanadores", title: "Encanadores", icon: <Wrench className="h-6 w-6 text-primary" /> },
  { id: "eletricistas", title: "Eletricistas", icon: <Zap className="h-6 w-6 text-primary" /> },
  { id: "pintores", title: "Pintores", icon: <Paintbrush className="h-6 w-6 text-primary" /> },
  { id: "pedreiros", title: "Pedreiros", icon: <HardHat className="h-6 w-6 text-primary" /> },
  { id: "marceneiros", title: "Marceneiros", icon: <Hammer className="h-6 w-6 text-primary" /> },
  { id: "diaristas", title: "Diaristas", icon: <Trash2 className="h-6 w-6 text-primary" /> },
]

export default function CategoryBar() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-background py-6 border-b">
      <div className="container flex justify-center">
        <div ref={scrollRef} className="overflow-x-auto hide-scrollbar">
          <div className="flex space-x-6 px-1">
            {serviceCategories.map((category) => (
              <ServiceCategoryCircle key={category.id} id={category.id} title={category.title} icon={category.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

