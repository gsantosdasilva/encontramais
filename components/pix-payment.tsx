import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { abacatePay } from '@/lib/abacatepay';
import { PaymentService } from '@/lib/services/payment-service';

interface PixPaymentProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  professionalId: string;
  paymentId: string;
}

export default function PixPayment({
  amount,
  onSuccess,
  onError,
  professionalId,
  paymentId,
}: PixPaymentProps) {
  const [paymentData, setPaymentData] = useState<{
    qr_code: string;
    qr_code_image: string;
    expires_at: string;
  } | null>(null);
  const [status, setStatus] = useState<'loading' | 'pending' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generatePixPayment = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await fetch('/api/generate-pix', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            payment_id: paymentId,
          }),
        });

        if (!response.ok) {
          throw new Error('Erro ao gerar QR Code do PIX');
        }

        const data = await response.json();
        setQrCode(data.qr_code);

        await PaymentService.updatePaymentStatus(paymentId, 'pending');
      } catch (err) {
        console.error('Erro ao gerar QR Code:', err);
        setErrorMessage('Erro ao gerar QR Code do PIX. Por favor, tente novamente.');
        onError('Erro ao gerar QR Code do PIX. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    generatePixPayment();
  }, [amount, paymentId, onError]);

  const checkPaymentStatus = async () => {
    if (!paymentData) return;

    try {
      const response = await abacatePay.checkPaymentStatus(paymentData.qr_code);
      if (response.status === 'paid') {
        setStatus('success');
        onSuccess();
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Erro ao verificar o status do pagamento');
      onError('Erro ao verificar o status do pagamento');
    }
  };

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(qrCode);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Gerando pagamento PIX...</p>
        </CardContent>
      </Card>
    );
  }

  if (status === 'error') {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <p className="text-destructive">{errorMessage}</p>
          <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
        </CardContent>
      </Card>
    );
  }

  if (status === 'success') {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
          <p className="text-green-500 font-medium">Pagamento confirmado!</p>
          <p className="text-muted-foreground text-center">
            Seu cadastro foi realizado com sucesso. Você será redirecionado em alguns segundos...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Pagamento via PIX</h3>
            <p className="text-muted-foreground">
              Escaneie o QR Code abaixo para realizar o pagamento
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={`data:image/png;base64,${qrCode}`}
              alt="QR Code PIX"
              className="w-64 h-64"
            />
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Ou copie o código PIX abaixo:
            </p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-2 bg-gray-100 rounded text-sm">
                {qrCode}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyPixCode}
              >
                Copiar
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Validade: {new Date(paymentData?.expires_at || '').toLocaleString()}
            </p>
          </div>

          <div className="flex justify-center">
            <Button onClick={checkPaymentStatus}>
              Verificar Pagamento
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 