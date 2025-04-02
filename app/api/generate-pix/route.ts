import { NextResponse } from 'next/server';
import { abacatePay } from '@/lib/abacatepay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, payment_id } = body;

    if (!amount || !payment_id) {
      return NextResponse.json(
        { error: 'Amount e payment_id são obrigatórios' },
        { status: 400 }
      );
    }

    // Gerar QR Code do PIX usando o AbacatePay
    const response = await abacatePay.createPixPayment({
      amount,
      description: `Pagamento do plano - ID: ${payment_id}`,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment-callback`,
      customer: {
        name: 'Cliente EncontraMais',
        email: 'cliente@encontramais.com',
        cpf: '12345678900',
      },
    });

    return NextResponse.json({
      qr_code: response.qr_code,
      qr_code_image: response.qr_code_image,
      expires_at: response.expires_at,
    });
  } catch (error) {
    console.error('Erro ao gerar QR Code do PIX:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar QR Code do PIX' },
      { status: 500 }
    );
  }
} 