import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import FadeIn from "@/components/fade-in"
import GridPattern from "@/components/grid-pattern"

const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Cliente",
    content:
      "Encontrei um eletricista excelente através do Encontra+. Atendimento rápido e serviço de qualidade. Recomendo!",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    role: "Encanador",
    content:
      "Desde que me cadastrei no Encontra+, minha agenda está sempre cheia. A plataforma me ajudou a expandir meus negócios.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mariana Santos",
    role: "Cliente",
    content:
      "Precisava de uma diarista com urgência e em menos de 1 hora já tinha encontrado uma profissional incrível pelo Encontra+.",
    rating: 4,
  },
  {
    id: 4,
    name: "Roberto Pereira",
    role: "Pintor",
    content:
      "A plataforma é muito intuitiva e me ajudou a conseguir novos clientes. O plano premium vale cada centavo!",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      <GridPattern className="opacity-5" />

      <div className="container relative z-10">
        <FadeIn delay={100} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem sobre nós</h2>
          <p className="text-muted-foreground text-lg">
            Veja o que clientes e profissionais estão falando sobre o Encontra+
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={200 + index * 100} className="card-hover-effect">
              <Card className="h-full">
                <CardContent className="p-6 relative">
                  <div className="absolute -top-2 -left-2 text-primary/20">
                    <Quote className="h-8 w-8" />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 relative z-10">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

