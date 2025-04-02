import { Wrench, Zap, Paintbrush, Trash2, HardHat, Hammer } from "lucide-react"
import type { ReactNode } from "react"

export const categoryIcons: Record<string, ReactNode> = {
  encanadores: <Wrench className="h-24 w-24" />,
  eletricistas: <Zap className="h-24 w-24" />,
  pintores: <Paintbrush className="h-24 w-24" />,
  diaristas: <Trash2 className="h-24 w-24" />,
  pedreiros: <HardHat className="h-24 w-24" />,
  marceneiros: <Hammer className="h-24 w-24" />,
}

