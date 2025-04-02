import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProfessionalService } from '@/lib/services/professional-service';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/supabase.types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PaymentService } from '@/lib/services/payment-service';

type Professional = Database['public']['Tables']['professionals']['Row'];
type Payment = Database['public']['Tables']['payments']['Row'];

const plans = [
  {
    id: 'monthly',
    name: 'Mensal',
    price: 49.90,
    period: 'mês',
    description: 'Ideal para começar',
    features: [
      'Perfil profissional completo',
      'Visualizações ilimitadas',
      'Contatos ilimitados',
      'Suporte por email',
    ],
  },
  {
    id: 'quarterly',
    name: 'Trimestral',
    price: 129.90,
    period: 'trimestre',
    description: 'Mais econômico',
    features: [
      'Todas as funcionalidades do plano mensal',
      '15% de desconto',
      'Prioridade no suporte',
    ],
  },
  {
    id: 'yearly',
    name: 'Anual',
    price: 399.90,
    period: 'ano',
    description: 'Melhor custo-benefício',
    features: [
      'Todas as funcionalidades do plano trimestral',
      '25% de desconto',
      'Suporte prioritário 24/7',
      'Recursos exclusivos',
    ],
  },
];

export default function AssinaturaPage() {
  const router = useRouter();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // TODO: Implementar autenticação e obter o ID do profissional logado
        const professionalId = '123'; // Exemplo
        const [professionalData, paymentsData] = await Promise.all([
          ProfessionalService.getProfessional(professionalId),
          PaymentService.getProfessionalPayments(professionalId),
        ]);

        setProfessional(professionalData);
        setPayments(paymentsData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubscribe = async (planId: string) => {
    try {
      setError('');
      setSelectedPlan(planId);

      if (!professional) {
        throw new Error('Profissional não encontrado');
      }

      const selectedPlanData = plans.find(plan => plan.id === planId);
      if (!selectedPlanData) {
        throw new Error('Plano não encontrado');
      }

      // Criar pagamento no banco de dados
      const payment = await PaymentService.createPayment({
        professional_id: professional.id,
        amount: selectedPlanData.price,
        payment_id: '', // Será preenchido pelo componente PixPayment
        plan_id: planId,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        payment_method: 'pix',
      });

      // Redirecionar para a página de pagamento
      router.push(`/dashboard/assinatura/pagamento/${payment.id}`);
    } catch (error) {
      console.error('Erro ao iniciar assinatura:', error);
      setError('Erro ao iniciar assinatura. Por favor, tente novamente.');
    }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Assinatura</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {professional && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Status da Assinatura</h2>
            <div className="flex items-center space-x-2">
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  professional.subscription_status === 'active'
                    ? 'bg-green-500'
                    : professional.subscription_status === 'expired'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                }`}
              />
              <span className="capitalize">
                {professional.subscription_status === 'active'
                  ? 'Ativa'
                  : professional.subscription_status === 'expired'
                  ? 'Expirada'
                  : 'Inativa'}
              </span>
            </div>
            {professional.subscription_expires_at && (
              <p className="text-sm text-gray-500 mt-1">
                Expira em:{' '}
                {new Date(
                  professional.subscription_expires_at
                ).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-primary shadow-lg'
                  : 'hover:border-primary/50'
              }`}
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-3xl font-bold mt-2">
                  R$ {plan.price.toFixed(2)}
                  <span className="text-sm text-gray-500">/{plan.period}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
              </div>

              <ul className="mt-6 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full mt-6"
                onClick={() => handleSubscribe(plan.id)}
              >
                Assinar Agora
              </Button>
            </Card>
          ))}
        </div>

        {payments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Histórico de Pagamentos</h2>
            <div className="space-y-4">
              {payments.map((payment) => (
                <Card key={payment.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        R$ {payment.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : payment.status === 'expired'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
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
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
} 