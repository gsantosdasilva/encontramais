import Link from "next/link"

export default function TermosPage() {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
        <p className="text-muted-foreground mb-6">Última atualização: 01 de Abril de 2023</p>

        <div className="prose prose-slate max-w-none">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar a plataforma Encontra+, você concorda com estes Termos de Uso e com nossa Política de
            Privacidade. Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nossos
            serviços.
          </p>

          <h2>2. Descrição do Serviço</h2>
          <p>
            O Encontra+ é uma plataforma que conecta profissionais de diversas áreas a clientes que buscam seus
            serviços. Atuamos como intermediários, facilitando o contato entre as partes, mas não somos responsáveis
            pela prestação dos serviços em si.
          </p>

          <h2>3. Cadastro e Conta</h2>
          <p>
            3.1. Para utilizar nossos serviços como profissional, é necessário criar uma conta, fornecendo informações
            precisas e completas.
          </p>
          <p>
            3.2. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades realizadas em
            sua conta.
          </p>
          <p>
            3.3. Reservamo-nos o direito de recusar, suspender ou cancelar contas que violem estes termos ou que
            apresentem informações falsas.
          </p>

          <h2>4. Responsabilidades do Usuário</h2>
          <p>4.1. Como profissional cadastrado, você concorda em:</p>
          <ul>
            <li>Fornecer informações verdadeiras sobre sua identidade e qualificações profissionais;</li>
            <li>Prestar serviços com qualidade e profissionalismo;</li>
            <li>Respeitar os acordos firmados com os clientes;</li>
            <li>Não utilizar a plataforma para fins ilegais ou não autorizados.</li>
          </ul>

          <p>4.2. Como cliente, você concorda em:</p>
          <ul>
            <li>Fornecer informações precisas sobre o serviço desejado;</li>
            <li>Respeitar os acordos firmados com os profissionais;</li>
            <li>Não utilizar a plataforma para fins ilegais ou não autorizados.</li>
          </ul>

          <h2>5. Pagamentos e Assinaturas</h2>
          <p>
            5.1. Os profissionais podem escolher entre diferentes planos de assinatura para utilizar nossos serviços.
          </p>
          <p>
            5.2. Os pagamentos são processados por gateways de pagamento seguros e estão sujeitos aos termos e condições
            desses serviços.
          </p>
          <p>
            5.3. Não oferecemos reembolsos para assinaturas já utilizadas, exceto em casos específicos previstos na
            legislação brasileira.
          </p>

          <h2>6. Limitação de Responsabilidade</h2>
          <p>
            6.1. O Encontra+ não é responsável pela qualidade dos serviços prestados pelos profissionais cadastrados.
          </p>
          <p>
            6.2. Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais resultantes do
            uso ou incapacidade de usar nossos serviços.
          </p>
          <p>6.3. Não garantimos que nossos serviços serão ininterruptos, seguros ou livres de erros.</p>

          <h2>7. Propriedade Intelectual</h2>
          <p>
            7.1. Todo o conteúdo disponibilizado na plataforma Encontra+, incluindo textos, gráficos, logotipos, ícones
            e imagens, é de nossa propriedade ou de nossos licenciadores e está protegido por leis de propriedade
            intelectual.
          </p>
          <p>
            7.2. É proibido reproduzir, distribuir, modificar ou criar obras derivadas de qualquer conteúdo da
            plataforma sem nossa autorização prévia por escrito.
          </p>

          <h2>8. Modificações dos Termos</h2>
          <p>
            8.1. Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento, publicando a versão
            atualizada em nossa plataforma.
          </p>
          <p>
            8.2. O uso continuado de nossos serviços após a publicação de alterações constitui aceitação dessas
            alterações.
          </p>

          <h2>9. Lei Aplicável</h2>
          <p>
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa relacionada a
            estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
          </p>

          <h2>10. Contato</h2>
          <p>
            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail:{" "}
            <a href="mailto:contato@encontramais.com.br" className="text-primary hover:underline">
              contato@encontramais.com.br
            </a>
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/privacidade">
            <span className="text-primary hover:underline">Política de Privacidade</span>
          </Link>
          <Link href="/cookies">
            <span className="text-primary hover:underline">Política de Cookies</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

