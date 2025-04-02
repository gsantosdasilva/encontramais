import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CadastroSucessoPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Cadastro Realizado!</h1>

          <p className="text-muted-foreground mb-6">
            Seu cadastro foi realizado com sucesso! Enviamos um e-mail com as instruções para pagamento via PIX.
          </p>

          <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mb-8 text-left">
            <p className="text-amber-800 text-sm">
              <strong>Importante:</strong> Seu cadastro será ativado automaticamente após a confirmação do pagamento via
              PIX. Após realizar o pagamento, envie o comprovante para <strong>contato@encontramais.com.br</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/login">
              <Button className="w-full">Acessar minha conta</Button>
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

