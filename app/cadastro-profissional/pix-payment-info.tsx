"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface PixPaymentInfoProps {
  planData: {
    id: string
    title: string
    price: number
  }
  disabled?: boolean
}

export default function PixPaymentInfo({ planData, disabled = false }: PixPaymentInfoProps) {
  const [isCopied, setIsCopied] = useState(false)

  // Exemplo de chave PIX (em produção, isso viria do backend)
  const pixKey = "encontramais@exemplo.com.br"

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-48 bg-gray-100 border flex items-center justify-center mb-4 rounded-md">
        {/* Placeholder para o QR Code real */}
        <div className="text-center text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 11h8V3H3zm2-6h4v4H5zM3 21h8v-8H3zm2-6h4v4H5zM13 3v8h8V3zm6 6h-4V5h4zM13 13h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"
            />
          </svg>
          <p className="text-xs mt-2">QR Code PIX</p>
        </div>
      </div>

      <div className="w-full mb-4">
        <p className="text-sm font-medium mb-1">Chave PIX:</p>
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-l-md border-l border-y flex-1 truncate">{pixKey}</div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-l-none h-[38px]"
            onClick={handleCopyPixKey}
            disabled={isCopied}
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copiar
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="w-full space-y-2 text-sm">
        <p className="font-medium">Valor a pagar:</p>
        <p className="text-lg font-bold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(planData.price)}
        </p>
        <p className="text-muted-foreground">
          Após o pagamento, envie o comprovante para o email:{" "}
          <span className="font-medium">contato@encontramais.com.br</span>
        </p>
      </div>
    </div>
  )
}

