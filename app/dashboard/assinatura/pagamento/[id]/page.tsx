import { Card } from '@/components/ui/card';
import { PaymentService } from '@/lib/services/payment-service';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/supabase.types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PixPayment from '@/components/pix-payment';

type Payment = Database['public']['Tables']['payments']['Row'];

export default function PagamentoPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadPayment = async () => {
      try {
        const data = await PaymentService.getPayment(params.id);
        setPayment(data);
      } catch (error) {
        console.error('Erro ao carregar pagamento:', error);
        setError('Erro ao carregar pagamento. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPayment();
  }, [params.id]);

  const handlePaymentSuccess = () => {
    // Redirecionar para a página de assinatura após o pagamento bem-sucedido
    router.push('/dashboard/assinatura');
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>Pagamento não encontrado</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Pagamento da Assinatura</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Detalhes do Pagamento</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Valor:</span> R${' '}
              {payment.amount.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <span
                className={`${
                  payment.status === 'paid'
                    ? 'text-green-500'
                    : payment.status === 'pending'
                    ? 'text-yellow-500'
                    : payment.status === 'expired'
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}
              >
                {payment.status === 'paid'
                  ? 'Pago'
                  : payment.status === 'pending'
                  ? 'Pendente'
                  : payment.status === 'expired'
                  ? 'Expirado'
                  : 'Falhou'}
              </span>
            </p>
            <p>
              <span className="font-medium">Expira em:</span>{' '}
              {new Date(payment.expires_at).toLocaleString()}
            </p>
          </div>
        </div>

        {payment.status === 'pending' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Pagamento via PIX</h2>
            <PixPayment
              amount={payment.amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              professionalId={payment.professional_id}
              paymentId={payment.id}
            />
          </div>
        )}

        {payment.status === 'paid' && (
          <Alert>
            <AlertDescription>
              Pagamento realizado com sucesso! Você será redirecionado em alguns
              segundos...
            </AlertDescription>
          </Alert>
        )}

        {payment.status === 'expired' && (
          <Alert variant="destructive">
            <AlertDescription>
              Este pagamento expirou. Por favor, tente novamente.
            </AlertDescription>
          </Alert>
        )}

        {payment.status === 'failed' && (
          <Alert variant="destructive">
            <AlertDescription>
              O pagamento falhou. Por favor, tente novamente.
            </AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  );
} 