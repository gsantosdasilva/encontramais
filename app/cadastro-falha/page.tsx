import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function CadastroFalhaPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Cadastro não concluído</h1>

          <p className="text-muted-foreground mb-6">
            Ocorreu um problema ao processar seu cadastro. Por favor, tente novamente ou entre em contato com nosso
            suporte.
          </p>

          <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-8 text-left">
            <p className="text-red-800 text-sm">
              <strong>Atenção:</strong> Se você já realizou o pagamento via PIX, por favor envie o comprovante para{" "}
              <strong>contato@encontramais.com.br</strong> informando seus dados de cadastro.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/cadastro-profissional">
              <Button className="w-full">Tentar novamente</Button>
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

