"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Upload,
  CreditCard,
  User,
  Briefcase,
  Image,
  Package,
  AlertCircle,
  Loader2,
} from "lucide-react";
import PriceCard from "@/components/price-card";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProfessionalService } from "@/lib/services/professional-service";
import { PaymentService } from "@/lib/services/payment-service";
import { useAuth } from "@/lib/contexts/auth-context";

// Dados simulados para categorias de serviços
const serviceCategories = [
  { id: "Encanador", name: "Encanador" },
  { id: "Eletricista", name: "Eletricista" },
  { id: "Pintor", name: "Pintor" },
  { id: "Diarista", name: "Diarista" },
  { id: "Pedreiro", name: "Pedreiro" },
  { id: "Marceneiro", name: "Marceneiro" },
];

// Dados simulados para planos
const plans = [
  {
    id: "mensal",
    title: "Plano Mensal",
    price: 29.99,
    description: "Ideal para testar a plataforma",
    features: [
      "Perfil profissional completo",
      "Portfólio",
      "WhatsApp compartilhado aos clientes",
    ],
    popular: false,
    discount: 0,
    period: "mês",
    buttonText: "Escolher",
  },
  {
    id: "trimestral",
    title: "Plano Trimestral",
    price: 80.97,
    description: "Economia de 10% em relação ao mensal",
    features: [
      "Perfil profissional completo",
      "Portfólio",
      "WhatsApp compartilhado aos clientes",
    ],
    popular: true,
    discount: 10,
    period: "trimestre",
    buttonText: "Escolher",
  },
  {
    id: "anual",
    title: "Plano Anual",
    price: 287.9,
    description: "Economia de 20% em relação ao mensal",
    features: [
      "Perfil profissional completo",
      "Portfólio",
      "WhatsApp compartilhado aos clientes",
      "Selo Premium no perfil",
    ],
    popular: false,
    discount: 20,
    period: "ano",
    buttonText: "Escolher",
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  category: string;
  specialty: string;
  experience: string;
  description: string;
  cep: string;
  city: string;
  state: string;
  address: string;
  selectedPlan: string;
}

export default function CadastroProfissionalPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    category: "",
    specialty: "",
    experience: "",
    description: "",
    cep: "",
    city: "",
    state: "",
    address: "",
    selectedPlan: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [professionalId, setProfessionalId] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");

  const totalSteps = 3;

  const nextStep = async () => {
    setErrors({});
    if (step === 1) {
      setIsLoading(true);
      try {
        const requiredFields = [
          "name",
          "email",
          "phone",
          "cpf",
          "password",
          "confirmPassword",
          "category",
          "specialty",
          "description",
          "cep",
          "city",
          "state",
          "address",
        ] as const;

        const missingFields = requiredFields.filter(
          (field) => !formData[field] || formData[field].trim() === ""
        );

        if (missingFields.length > 0) {
          setErrors({
            form: `Por favor, preencha todos os campos obrigatórios.`,
          });
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setErrors({ password: "As senhas não coincidem" });
          return;
        }

        const normalizedEmail = formData.email.toLowerCase().trim();
        const { data: existingUser, error } = await supabase
          .from('professionals')
          .select('id')
          .eq('email', normalizedEmail)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (existingUser) {
          setErrors({
            ...errors,
            email: "Este email já está cadastrado"
          });
          return;
        }

        setStep(step + 1);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error checking email:', error);
        setErrors({
          ...errors,
          email: "Erro ao verificar email. Por favor, tente novamente."
        });
      } finally {
        setIsLoading(false);
      }
    } else if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setFormData({ ...formData, selectedPlan: planId });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setErrors({});

      // Criar profissional no banco de dados
      const professional = await ProfessionalService.createProfessional({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        category: formData.category,
        specialty: formData.specialty,
        experience: formData.experience ? parseInt(formData.experience) : null,
        description: formData.description,
        cep: formData.cep,
        city: formData.city,
        state: formData.state,
        address: formData.address,
        status: "pending",
      });

      // Criar usuário no Auth
      const registerAuth = await signUp(
        formData.email,
        formData.password,
        professional
      );

      console.log(registerAuth);

      setProfessionalId(professional.id);

      // Criar pagamento no banco de dados
      const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
      if (!selectedPlanData) {
        throw new Error("Plano não encontrado");
      }

      const payment = await PaymentService.createPayment({
        professional_id: professional.id,
        amount: selectedPlanData.price,
        payment_id: "", // Será preenchido pelo componente PixPayment
        plan_id: selectedPlan,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        payment_method: "pix",
      });

      setPaymentId(payment.id);

      // Avançar para o próximo passo
      //setStep(3);
    } catch (error) {
      console.error("Erro ao cadastrar profissional:", error);
      setErrors({
        form: "Erro ao cadastrar profissional. Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      // Aqui você pode implementar lógica adicional após o pagamento bem-sucedido
      // Por exemplo, enviar um email de boas-vindas
      setTimeout(() => {
        router.push("/cadastro-sucesso");
      }, 3000);
    } catch (error) {
      console.error("Erro ao processar sucesso do pagamento:", error);
      setErrors({
        payment: "Erro ao processar o pagamento. Por favor, tente novamente.",
      });
    }
  };

  const handlePaymentError = (error: string) => {
    setErrors({ ...errors, payment: error });
  };

  const handleStepClick = (clickedStep: number) => {
    if (clickedStep < step) {
      setStep(clickedStep);
      window.scrollTo(0, 0);
    }
  };

  const getStepIcon = (stepNumber: number) => {
    const icons = {
      1: <User className="h-5 w-5" />,
      2: <Package className="h-5 w-5" />,
      3: <CreditCard className="h-5 w-5" />
    };
    return (
      <div
        onClick={() => handleStepClick(stepNumber)}
        className={`cursor-pointer ${stepNumber < step ? "hover:text-primary" : ""}`}
      >
        {icons[stepNumber as keyof typeof icons]}
      </div>
    );
  };

  const getStepTitle = (stepNumber: number) => {
    const titles = [
      "Informações do Profissional",
      "Escolha do Plano",
      "Pagamento via PIX"
    ];
    return (
      <span
        onClick={() => handleStepClick(stepNumber)}
        className={`cursor-pointer ${stepNumber < step ? "hover:text-primary" : ""}`}
      >
        {titles[stepNumber - 1]}
      </span>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Informações Pessoais</h3>
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome completo <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Digite seu nome completo"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">{errors.name}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="seu@email.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Telefone <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(00) 00000-0000"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <span className="text-sm text-red-500">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">
                  CPF <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={(e) =>
                      setFormData({ ...formData, cpf: e.target.value })
                    }
                    placeholder="000.000.000-00"
                    className={errors.cpf ? "border-red-500" : ""}
                  />
                  {errors.cpf && (
                    <span className="text-sm text-red-500">{errors.cpf}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Senha <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">{errors.password}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmar senha <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && (
                    <span className="text-sm text-red-500">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Perfil Profissional</h3>
              <div className="space-y-2">
                <Label htmlFor="category">
                  Categoria principal <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">
                  Especialidade <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={(e) =>
                      setFormData({ ...formData, specialty: e.target.value })
                    }
                    placeholder="Ex: Encanador Residencial"
                    className={errors.specialty ? "border-red-500" : ""}
                  />
                  {errors.specialty && (
                    <span className="text-sm text-red-500">{errors.specialty}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Anos de experiência</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  placeholder="Ex: 5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Descrição profissional <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Descreva sua experiência, habilidades e serviços oferecidos..."
                    rows={5}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <span className="text-sm text-red-500">{errors.description}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Localização</h3>
              <div className="space-y-2">
                <Label htmlFor="cep">
                  CEP <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={(e) =>
                      setFormData({ ...formData, cep: e.target.value })
                    }
                    placeholder="00000-000"
                    maxLength={9}
                    className={errors.cep ? "border-red-500" : ""}
                  />
                  {errors.cep && (
                    <span className="text-sm text-red-500">{errors.cep}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    Cidade <span className="text-red-500">*</span>
                  </Label>
                  <div>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Sua cidade"
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <span className="text-sm text-red-500">{errors.city}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">
                    Estado <span className="text-red-500">*</span>
                  </Label>
                  <div>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      placeholder="Seu estado"
                      className={errors.state ? "border-red-500" : ""}
                    />
                    {errors.state && (
                      <span className="text-sm text-red-500">{errors.state}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Endereço <span className="text-red-500">*</span>
                </Label>
                <div>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Rua, número, complemento"
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <span className="text-sm text-red-500">{errors.address}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative ${
                    selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id && (
                    <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-1 z-10">
                      <Check className="h-5 w-5"/>
                    </div>
                  )}
                  <PriceCard
                    title={plan.title}
                    price={plan.price}
                    description={plan.description}
                    features={plan.features}
                    popular={plan.popular}
                    discount={plan.discount}
                    period={plan.period}
                    buttonText={
                      selectedPlan === plan.id ? "Selecionado" : plan.buttonText
                    }
                    onClick={() => handlePlanSelect(plan.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
        if (!selectedPlanData) {
          return (
            <Alert>
              <AlertDescription>
                Por favor, selecione um plano antes de prosseguir para o
                pagamento.
              </AlertDescription>
            </Alert>
          );
        }

        return <Button onClick={handleSubmit}>Já Paguei</Button>;

      default:
        return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear the error when the user types
    });
  };

  const handleFormattedInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    formatFunction: (value: string) => string
  ) => {
    const { name, value } = e.target;
    const formattedValue = formatFunction(value);
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const formatCEP = (cep: string) => {
    const cleanedCEP = cep.replace(/\D/g, "");
    if (cleanedCEP.length > 5) {
      return cleanedCEP.substring(0, 5) + "-" + cleanedCEP.substring(5, 8);
    }
    return cleanedCEP;
  };

  const processPayment = async () => {
    setIsLoading(true);
    setErrors({});
    setPaymentStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPaymentStatus("success");
      router.push("/cadastro-sucesso");
    }, 3000);
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-4">Cadastro de Profissional</h1>
          <p className="text-muted-foreground">
            Preencha o formulário abaixo para se cadastrar como profissional no
            Encontra+
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    index + 1 < step
                      ? "text-primary"
                      : index + 1 === step
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      index + 1 < step
                        ? "bg-primary text-primary-foreground"
                        : index + 1 === step
                        ? "border-2 border-primary text-primary"
                        : "border-2 border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {index + 1 < step ? (
                      <Check className="h-5 w-5 cursor-pointer" onClick={() => handleStepClick(1)}/>
                    ) : (
                      getStepIcon(index + 1)
                    )}
                  </div>
                  <span className="text-xs font-medium hidden md:block">
                    {getStepTitle(index + 1)}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative">
              <div
                className="absolute top-0 h-1 bg-primary"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
              <div className="h-1 w-full bg-muted"></div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
            
              <h2 className="text-xl font-bold mb-6">{getStepTitle(step)}</h2>
              {renderStep()}

              {step < 3 && (
                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button variant="outline" onClick={prevStep}>
                      Voltar
                    </Button>
                  ) : (
                    <Link href="/">
                      <Button variant="outline">Cancelar</Button>
                    </Link>
                  )}

                  <Button
                    onClick={nextStep}
                    disabled={(step === 2 && !selectedPlan) || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      "Continuar"
                    )}
                  </Button>
                </div>
              )}
              {errors.form && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{errors.form}</AlertDescription>
              </Alert>
            )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
