# EncontraMais

Plataforma para conectar profissionais autônomos com clientes que precisam de serviços.

## Tecnologias

- Next.js 14
- TypeScript
- Supabase (Auth, Database, Storage)
- Tailwind CSS
- Shadcn/ui

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/encontramais.git
cd encontramais
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Edite o arquivo `.env.local` com suas credenciais do Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto no Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do seu projeto no Supabase

5. Configure o banco de dados:
- Acesse o Console do Supabase
- Vá para SQL Editor
- Execute os scripts de migração em `supabase/migrations/`

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
├── app/                    # Rotas e páginas
├── components/            # Componentes React
├── lib/                   # Utilitários e configurações
│   ├── contexts/         # Contextos React
│   ├── services/         # Serviços de API
│   └── supabase/         # Configuração do Supabase
├── public/               # Arquivos estáticos
├── styles/              # Estilos globais
├── supabase/            # Migrações e tipos do Supabase
└── types/               # Definições de tipos TypeScript
```

## Contribuindo

1. Crie uma branch para sua feature:
```bash
git checkout -b feature/nome-da-feature
```

2. Faça commit das suas alterações:
```bash
git commit -m 'feat: Adiciona nova feature'
```

3. Faça push para a branch:
```bash
git push origin feature/nome-da-feature
```

4. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes. 