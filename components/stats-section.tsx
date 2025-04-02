import { Users, Star, CheckCircle, MapPin } from "lucide-react"
import FadeIn from "@/components/fade-in"

export default function StatsSection() {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      value: "500+",
      label: "Profissionais",
      delay: 100,
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      value: "2.500+",
      label: "Serviços realizados",
      delay: 200,
    },
    {
      icon: <Star className="h-8 w-8" />,
      value: "4.8",
      label: "Avaliação média",
      delay: 300,
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      value: "50+",
      label: "Cidades atendidas",
      delay: 400,
    },
  ]

  return (
    <div className="bg-background py-12 md:py-16 relative z-10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={stat.delay} className="card-hover-effect">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/50">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}

