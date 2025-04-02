"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PriceCardProps {
  title: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  discount?: number
  period: string
  buttonText: string
  onClick?: () => void
}

export default function PriceCard({
  title,
  price,
  description,
  features,
  popular = false,
  discount = 0,
  period,
  buttonText,
  onClick,
}: PriceCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)

  return (
    <Card className={`flex flex-col ${popular ? "border-primary shadow-lg" : ""}`}>
      <CardHeader>
        {popular && (
          <Badge className="w-fit mb-2" variant="default">
            Mais popular
          </Badge>
        )}
        <CardTitle>{title}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{formattedPrice}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        {discount > 0 && (
          <Badge variant="outline" className="w-fit">
            Economia de {discount}%
          </Badge>
        )}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={popular ? "default" : "outline"} onClick={onClick}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

