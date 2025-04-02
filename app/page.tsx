import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroBanner from "@/components/hero-banner"
import StatsSection from "@/components/stats-section"
import Testimonials from "@/components/testimonials"
import { Check, Sparkles, Shield, Clock, Star, Search } from "lucide-react"
import FadeIn from "@/components/fade-in"
import GridPattern from "@/components/grid-pattern"
import CategoryBar from "@/components/category-bar"

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <CategoryBar />

      <StatsSection />

      <section className="py-16 md:py-24 bg-muted relative overflow-hidden">
        <GridPattern className="opacity-5" />

        <div className="container relative z-10">
          <FadeIn delay={100} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona</h2>
            <p className="text-muted-foreground text-lg">Encontrar o profissional ideal nunca foi tão fácil</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={200} className="card-hover-effect">
              <div className="bg-background p-8 rounded-xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Busque</h3>
                <p className="text-muted-foreground text-center">
                  Encontre o serviço que você precisa entre nossas diversas categorias
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300} className="card-hover-effect">
              <div className="bg-background p-8 rounded-xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Compare</h3>
                <p className="text-muted-foreground text-center">
                  Veja avaliações, portfólios e preços para escolher o melhor profissional
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={400} className="card-hover-effect">
              <div className="bg-background p-8 rounded-xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Contrate</h3>
                <p className="text-muted-foreground text-center">
                  Entre em contato diretamente e contrate o serviço que você precisa
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <GridPattern />

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={100}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">É um profissional qualificado?</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Junte-se a centenas de profissionais que já estão aumentando sua carteira de clientes através do
                  Encontra+. Cadastre-se agora e comece a receber solicitações de serviços.
                </p>
                <Link href="/cadastro-profissional">
                  <Button size="lg" className="px-8">
                    Cadastre-se como profissional
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="bg-muted p-8 rounded-xl">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Check className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Aumente sua visibilidade</h3>
                      <p className="text-muted-foreground">
                        Seja encontrado por clientes que buscam exatamente o seu serviço
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Star className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Construa sua reputação</h3>
                      <p className="text-muted-foreground">Saia na frente da concorrência e destaque-se no mercado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Gerencie seu tempo</h3>
                      <p className="text-muted-foreground">Você decide quais serviços aceitar e quando realizá-los</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}

