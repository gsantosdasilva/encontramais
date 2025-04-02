import Link from "next/link"

export default function PrivacidadePage() {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-6">Última atualização: 01 de Abril de 2023</p>

        <div className="prose prose-slate max-w-none">
          <p>
            A Encontra+ está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como
            coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você utiliza nossa plataforma.
          </p>

          <h2>1. Informações que Coletamos</h2>
          <p>Podemos coletar os seguintes tipos de informações:</p>

          <h3>1.1. Informações de Cadastro</h3>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>CPF ou CNPJ (para profissionais)</li>
            <li>Endereço</li>
            <li>Dados profissionais (para profissionais)</li>
          </ul>

          <h3>1.2. Informações de Uso</h3>
          <ul>
            <li>Dados de acesso e navegação na plataforma</li>
            <li>Interações com outros usuários</li>
            <li>Avaliações e comentários</li>
            <li>Histórico de serviços</li>
          </ul>

          <h3>1.3. Informações de Pagamento</h3>
          <ul>
            <li>Dados de transações</li>
            <li>Histórico de assinaturas</li>
          </ul>

          <h2>2. Como Usamos Suas Informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul>
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Processar transações e gerenciar assinaturas</li>
            <li>Conectar profissionais e clientes</li>
            <li>Enviar comunicações relacionadas ao serviço</li>
            <li>Enviar materiais de marketing (com seu consentimento)</li>
            <li>Prevenir fraudes e garantir a segurança da plataforma</li>
            <li>Cumprir obrigações legais</li>
          </ul>

          <h2>3. Base Legal para o Tratamento</h2>
          <p>Tratamos seus dados pessoais com base nas seguintes bases legais:</p>
          <ul>
            <li>Execução de contrato: para fornecer nossos serviços</li>
            <li>Consentimento: quando você concorda expressamente com determinado tratamento</li>
            <li>Interesse legítimo: quando o tratamento é necessário para nossos interesses legítimos</li>
            <li>Obrigação legal: quando o tratamento é necessário para cumprir uma obrigação legal</li>
          </ul>

          <h2>4. Compartilhamento de Informações</h2>
          <p>Podemos compartilhar suas informações com:</p>
          <ul>
            <li>
              Outros usuários da plataforma (apenas as informações necessárias para a conexão entre profissionais e
              clientes)
            </li>
            <li>Prestadores de serviços que nos auxiliam na operação da plataforma</li>
            <li>Parceiros de pagamento para processar transações</li>
            <li>Autoridades governamentais, quando exigido por lei</li>
          </ul>

          <h2>5. Seus Direitos</h2>
          <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:</p>
          <ul>
            <li>Confirmação da existência de tratamento de seus dados</li>
            <li>Acesso aos seus dados</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
            <li>Portabilidade dos dados</li>
            <li>Eliminação dos dados tratados com seu consentimento</li>
            <li>Informação sobre entidades públicas e privadas com as quais compartilhamos seus dados</li>
            <li>Revogação do consentimento</li>
          </ul>

          <h2>6. Segurança de Dados</h2>
          <p>
            Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais contra
            acesso não autorizado, perda acidental, divulgação ou destruição. No entanto, nenhum sistema é completamente
            seguro, e não podemos garantir a segurança absoluta de suas informações.
          </p>

          <h2>7. Retenção de Dados</h2>
          <p>
            Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta
            Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
          </p>

          <h2>8. Transferências Internacionais</h2>
          <p>
            Seus dados pessoais podem ser transferidos para servidores localizados fora do Brasil. Nestes casos,
            garantimos que a transferência seja realizada de acordo com as exigências da LGPD e que sejam adotadas
            medidas de segurança adequadas.
          </p>

          <h2>9. Crianças e Adolescentes</h2>
          <p>
            Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações
            pessoais de crianças e adolescentes. Se tomarmos conhecimento de que coletamos informações pessoais de um
            menor de 18 anos sem a devida autorização parental, tomaremos medidas para remover essas informações.
          </p>

          <h2>10. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre
            disponível em nossa plataforma, com a data da última atualização. Recomendamos que você revise esta política
            regularmente.
          </p>

          <h2>11. Contato</h2>
          <p>
            Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos seus dados
            pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail:{" "}
            <a href="mailto:privacidade@encontramais.com.br" className="text-primary hover:underline">
              privacidade@encontramais.com.br
            </a>
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/termos">
            <span className="text-primary hover:underline">Termos de Uso</span>
          </Link>
          <Link href="/cookies">
            <span className="text-primary hover:underline">Política de Cookies</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

