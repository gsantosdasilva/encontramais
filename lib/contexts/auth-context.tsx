"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/supabase.types";
import { User } from "@supabase/supabase-js";

// Tipos
type Professional = Database["public"]["Tables"]["professionals"]["Row"];
type ServiceCategory =
  | "Diarista"
  | "Pintor"
  | "Marceneiro"
  | "Pedreiro"
  | "Eletricista"
  | "Encanador";

interface AuthContextType {
  user: User | null;
  professional: Professional | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    data: ProfessionalSignUpData
  ) => Promise<string>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  uploadPortfolioImage: (file: File, orderIndex: number) => Promise<void>;
  removePortfolioImage: (imageId: string) => Promise<void>;
}

interface ProfessionalSignUpData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  category: ServiceCategory;
  specialty?: string;
  description?: string;
  experience?: string;
  cep: string;
  city: string;
  state: string;
  address: string;
}

// Cliente Supabase
const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Carregar dados do profissional
  const loadProfessional = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("professionals")
        .select("*, portfolio(*)")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfessional(data);
    } catch (error) {
      console.error("Erro ao carregar profissional:", error);
      setProfessional(null);
    }
  };

  // Efeito para carregar sessão inicial e configurar listener
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          await loadProfessional(session.user.id);
        }
      } catch (error) {
        console.error("Erro ao inicializar auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadProfessional(session.user.id);
      } else {
        setProfessional(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  // Registro
  const signUp = async (
    email: string,
    password: string,
    data: ProfessionalSignUpData
  ) => {
    try {
      // 1. Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name: data.name,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Erro ao criar usuário");

      // 2. Informar sobre confirmação de e-mail
      return "Por favor, verifique seu e-mail para confirmar sua conta";
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      throw error;
    }
  };

  // Upload de imagem do portfolio
  const uploadPortfolioImage = async (file: File, orderIndex: number) => {
    if (!user) throw new Error("Usuário não autenticado");

    if (orderIndex < 1 || orderIndex > 5) {
      throw new Error("Número da imagem deve estar entre 1 e 5");
    }

    try {
      // 1. Upload da imagem para o storage na pasta correta
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${orderIndex}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Obter URL pública da imagem
      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(fileName);

      // 3. Salvar referência no banco
      const { error: dbError } = await supabase.from("portfolio").upsert(
        {
          professional_id: user.id,
          image_url: publicUrl,
          order_index: orderIndex,
        },
        {
          onConflict: "professional_id,order_index",
        }
      );

      if (dbError) throw dbError;

      // 4. Recarregar dados do profissional
      await loadProfessional(user.id);
    } catch (error) {
      console.error("Erro ao fazer upload de imagem:", error);
      throw error;
    }
  };

  // Remover imagem do portfolio
  const removePortfolioImage = async (imageId: string) => {
    if (!user) throw new Error("Usuário não autenticado");

    try {
      const { error } = await supabase
        .from("portfolio")
        .delete()
        .eq("id", imageId)
        .eq("professional_id", user.id);

      if (error) throw error;

      // Recarregar dados do profissional
      await loadProfessional(user.id);
    } catch (error) {
      console.error("Erro ao remover imagem:", error);
      throw error;
    }
  };

  // Logout
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  // Reset de senha
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Erro ao resetar senha:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        professional,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        uploadPortfolioImage,
        removePortfolioImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
