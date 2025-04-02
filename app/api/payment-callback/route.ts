import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { PaymentService } from '@/lib/services/payment-service';
import { ProfessionalService } from '@/lib/services/professional-service';

interface Plan {
  id: string;
  period: 'mês' | 'trimestre' | 'ano';
}

const plans: Plan[] = [
  {
    id: "mensal",
    period: "mês"
  },
  {
    id: "trimestral",
    period: "trimestre"
  },
  {
    id: "anual",
    period: "ano"
  }
];

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const signature = headersList.get('x-abacate-signature');

    // Verificar a assinatura do webhook (implementar conforme documentação do AbacatePay)
    if (!signature) {
      return NextResponse.json({ error: 'Assinatura inválida' }, { status: 400 });
    }

    const body = await request.json();
    
    // Processar o webhook
    if (body.status === 'paid') {
      // Buscar o pagamento no banco de dados
      const payment = await PaymentService.getPayment(body.payment_id);
      
      if (!payment) {
        return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 });
      }

      // Atualizar o status do pagamento
      await PaymentService.updatePaymentStatus(payment.payment_id, 'paid');

      // Calcular a data de expiração da assinatura
      const plan = plans.find((p: Plan) => p.id === payment.plan_id);
      if (!plan) {
        return NextResponse.json({ error: 'Plano não encontrado' }, { status: 404 });
      }

      const subscriptionEndDate = new Date();
      switch (plan.period) {
        case 'mês':
          subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
          break;
        case 'trimestre':
          subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 3);
          break;
        case 'ano':
          subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
          break;
      }

      // Atualizar o status da assinatura do profissional
      await ProfessionalService.updateSubscriptionStatus(
        payment.professional_id,
        'active',
        subscriptionEndDate.toISOString()
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 