import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MessageCircle } from "lucide-react"

interface ProfessionalCardProps {
  id: string
  name: string
  image: string
  specialty: string
  rating: number
  location: string
  isPremium?: boolean
  phone?: string
}

export default function ProfessionalCard({
  id,
  name,
  image,
  specialty,
  rating,
  location,
  isPremium = false,
  phone = "5511999999999", // Número padrão para demonstração
}: ProfessionalCardProps) {
  const whatsappLink = `https://wa.me/${phone}?text=Olá ${name}, encontrei seu perfil no Encontra+ e gostaria de solicitar um orçamento.`

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${isPremium ? "border-primary" : ""}`}>
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        {isPremium && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            Premium
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{specialty}</p>
        <div className="mt-2 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted"}`} />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{location}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Link href={`/profissional/${id}`} className="w-full">
          <Button className="w-full" variant="outline">
            Ver perfil
          </Button>
        </Link>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}

