-- Drop existing tables if they exist
DROP TABLE IF EXISTS portfolio CASCADE;
DROP TABLE IF EXISTS preferences CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS professionals CASCADE;
DROP TABLE IF EXISTS plans CASCADE;
DROP TYPE IF EXISTS service_category CASCADE;
DROP TYPE IF EXISTS professional_status CASCADE;

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create service category ENUM
CREATE TYPE service_category AS ENUM (
    'Diarista',
    'Encanador',
    'Pedreiro',
    'Eletricista',
    'Pintor',
    'Marceneiro'
);

-- Create professional status ENUM
CREATE TYPE professional_status AS ENUM (
    'pending',
    'active',
    'suspended',
    'inactive'
);

-- Create plans table
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration_months INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default plans
INSERT INTO plans (name, price, duration_months) VALUES
    ('Mensal', 29.99, 1),
    ('Trimestral', 80.97, 3),
    ('Anual', 287.90, 12);

-- Create professionals table
CREATE TABLE professionals (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    category service_category NOT NULL,
    specialty TEXT,
    description TEXT,
    experience TEXT,
    cep TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    address TEXT NOT NULL,
    status professional_status NOT NULL DEFAULT 'pending',
    is_premium BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT false,
    avatar_url TEXT,
    plan_id INTEGER,
    plan_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create portfolio table
CREATE TABLE portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    order_index INTEGER NOT NULL CHECK (order_index BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(professional_id, order_index)
);

-- Create payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'expired')),
    payment_method TEXT NOT NULL DEFAULT 'pix' CHECK (payment_method IN ('pix')),
    payment_id TEXT NOT NULL,
    plan_id TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create preferences table
CREATE TABLE preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
    email_notifications BOOLEAN NOT NULL DEFAULT true,
    sms_notifications BOOLEAN NOT NULL DEFAULT true,
    show_online_status BOOLEAN NOT NULL DEFAULT true,
    auto_reply BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(professional_id)
);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to limit portfolio images
CREATE OR REPLACE FUNCTION limit_portfolio_images()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM portfolio WHERE professional_id = NEW.professional_id) >= 5 THEN
        RAISE EXCEPTION 'Limite de 5 imagens atingido para este profissional';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_professionals_updated_at
    BEFORE UPDATE ON professionals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at
    BEFORE UPDATE ON plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at
    BEFORE UPDATE ON portfolio
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER limit_portfolio_images
    BEFORE INSERT ON portfolio
    FOR EACH ROW
    EXECUTE FUNCTION limit_portfolio_images();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preferences_updated_at
    BEFORE UPDATE ON preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_professionals_email ON professionals(email);
CREATE INDEX idx_professionals_cpf ON professionals(cpf);
CREATE INDEX idx_professionals_category ON professionals(category);
CREATE INDEX idx_professionals_status ON professionals(status);
CREATE INDEX idx_professionals_is_premium ON professionals(is_premium);
CREATE INDEX idx_professionals_is_active ON professionals(is_active);
CREATE INDEX idx_professionals_city ON professionals(city);
CREATE INDEX idx_professionals_state ON professionals(state);
CREATE INDEX idx_portfolio_professional_id ON portfolio(professional_id);
CREATE INDEX idx_payments_professional_id ON payments(professional_id);
CREATE INDEX idx_preferences_professional_id ON preferences(professional_id);

-- Enable RLS
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for professionals table
CREATE POLICY "Permitir registro de profissionais"
    ON professionals FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Profissionais podem ver seus próprios dados"
    ON professionals FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Profissionais podem atualizar seus próprios dados"
    ON professionals FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Create policies for portfolio table
CREATE POLICY "Qualquer pessoa pode ver o portfolio"
    ON portfolio FOR SELECT
    USING (true);

CREATE POLICY "Profissionais podem gerenciar seu próprio portfolio"
    ON portfolio FOR ALL
    USING (auth.uid() = professional_id)
    WITH CHECK (auth.uid() = professional_id);

-- Create policies for payments table
CREATE POLICY "Profissionais podem ver seus próprios pagamentos"
    ON payments FOR SELECT
    USING (auth.uid() = professional_id);

CREATE POLICY "Sistema pode criar pagamentos"
    ON payments FOR INSERT
    WITH CHECK (true);

-- Create policies for preferences table
CREATE POLICY "Profissionais podem gerenciar suas próprias preferências"
    ON preferences FOR ALL
    USING (auth.uid() = professional_id)
    WITH CHECK (auth.uid() = professional_id);

-- Storage policies for portfolio
DROP POLICY IF EXISTS "Imagens são públicas" ON storage.objects;
DROP POLICY IF EXISTS "Profissionais podem fazer upload em sua pasta" ON storage.objects;
DROP POLICY IF EXISTS "Profissionais podem deletar suas imagens" ON storage.objects;

CREATE POLICY "Imagens são públicas"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

CREATE POLICY "Profissionais podem fazer upload em sua pasta"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'portfolio' 
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND (storage.foldername(name))[2] IN ('1','2','3','4','5')
);

CREATE POLICY "Profissionais podem deletar suas imagens"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'portfolio' 
    AND (storage.foldername(name))[1] = auth.uid()::text
); 