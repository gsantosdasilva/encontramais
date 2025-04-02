import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ServiceCategoryCircleProps {
  id: string
  title: string
  icon: React.ReactNode
  className?: string
}

export default function ServiceCategoryCircle({ id, title, icon, className }: ServiceCategoryCircleProps) {
  return (
    <Link href={`/servico/${id}`} className="group flex flex-col items-center gap-2">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center bg-muted/70 group-hover:bg-primary/10 transition-colors",
          className,
        )}
      >
        {icon}
      </div>
      <span className="text-xs font-medium text-center group-hover:text-primary transition-colors">{title}</span>
    </Link>
  )
}

