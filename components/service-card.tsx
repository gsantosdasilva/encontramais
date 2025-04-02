import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import type { ReactNode } from "react"

interface ServiceCardProps {
  id: string
  title: string
  description: string
  icon: ReactNode
  professionals: number
}

export default function ServiceCard({ id, title, icon, professionals }: ServiceCardProps) {
  return (
    <Link href={`/servico/${id}`} className="block">
      <Card className="overflow-hidden transition-all hover:shadow-sm border-border/40 group w-full">
        <div className="aspect-square relative overflow-hidden flex items-center justify-center bg-muted/50">
          <div className="text-primary w-16 h-16 flex items-center justify-center">{icon}</div>
        </div>
        <CardContent className="p-3 text-center">
          <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
          <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
            <Users className="h-3 w-3 mr-1" />
            <span>{professionals}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

