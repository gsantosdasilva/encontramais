import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function CadastroPendentePage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="h-10 w-10 text-amber-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Aguardando Pagamento</h1>

          <p className="text-muted-foreground mb-6">
            Estamos aguardando a confirmação do seu pagamento via PIX. Assim que for confirmado, seu cadastro será
            ativado automaticamente.
          </p>

          <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-8 text-left">
            <p className="text-amber-800 text-sm">
              <strong>Lembrete:</strong> Após realizar o pagamento via PIX, envie o comprovante para{" "}
              <strong>contato@encontramais.com.br</strong> para agilizar a ativação da sua conta.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/login">
              <Button className="w-full">Verificar status</Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full">
                Voltar para a página inicial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

