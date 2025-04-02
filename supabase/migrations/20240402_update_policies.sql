-- Remover políticas existentes
DROP POLICY IF EXISTS "Permitir registro de profissionais" ON professionals;
DROP POLICY IF EXISTS "Profissionais podem ver seus próprios dados" ON professionals;
DROP POLICY IF EXISTS "Profissionais podem atualizar seus próprios dados" ON professionals;

-- Criar novas políticas
CREATE POLICY "Permitir inserção de profissionais"
ON professionals FOR INSERT
WITH CHECK (true);

CREATE POLICY "Profissionais podem ver seus próprios dados"
ON professionals FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Profissionais podem atualizar seus próprios dados"
ON professionals FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Habilitar RLS
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY; 