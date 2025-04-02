import axios from 'axios';

const ABACATE_API_URL = 'https://api.abacatepay.com/v1';

interface CreatePixPaymentRequest {
  amount: number;
  description: string;
  customer: {
    name: string;
    email: string;
    cpf: string;
  };
  callback_url: string;
}

interface CreatePixPaymentResponse {
  id: string;
  qr_code: string;
  qr_code_image: string;
  status: string;
  expires_at: string;
}

export class AbacatePayService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createPixPayment(data: CreatePixPaymentRequest): Promise<CreatePixPaymentResponse> {
    try {
      const response = await axios.post(`${ABACATE_API_URL}/payments/pix`, data, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar pagamento PIX:', error);
      throw error;
    }
  }

  async checkPaymentStatus(paymentId: string): Promise<{ status: string }> {
    try {
      const response = await axios.get(`${ABACATE_API_URL}/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
      throw error;
    }
  }
}

// Criar uma instância do serviço com a chave da API
export const abacatePay = new AbacatePayService(process.env.NEXT_PUBLIC_ABACATE_API_KEY || ''); 