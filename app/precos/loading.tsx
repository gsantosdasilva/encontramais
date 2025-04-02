import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Carregando planos...</p>
        </div>
      </div>
    </div>
  )
}

