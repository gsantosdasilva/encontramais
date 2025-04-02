import Link from "next/link"

export default function CookiesPage() {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>
        <p className="text-muted-foreground mb-6">Última atualização: 01 de Abril de 2023</p>

        <div className="prose prose-slate max-w-none">
          <p>
            Esta Política de Cookies explica como a Encontra+ utiliza cookies e tecnologias semelhantes para
            reconhecê-lo quando você visita nossa plataforma. Ela explica o que são essas tecnologias e por que as
            usamos, bem como seus direitos de controlar nosso uso delas.
          </p>

          <h2>1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos arquivos de dados que são armazenados no seu dispositivo (computador ou dispositivo
            móvel) quando você visita um site. Os cookies são amplamente utilizados pelos proprietários de sites para
            fazer seus sites funcionarem, ou funcionarem de maneira mais eficiente, bem como para fornecer informações
            de relatórios.
          </p>

          <h2>2. Por que Usamos Cookies?</h2>
          <p>Utilizamos cookies pelos seguintes motivos:</p>

          <h3>2.1. Cookies Estritamente Necessários</h3>
          <p>
            Estes cookies são essenciais para que você possa navegar pelo site e usar seus recursos. Sem estes cookies,
            serviços como autenticação de usuário não podem ser fornecidos.
          </p>

          <h3>2.2. Cookies de Desempenho</h3>
          <p>
            Estes cookies coletam informações sobre como os visitantes usam um site, por exemplo, quais páginas os
            visitantes acessam com mais frequência. Eles não coletam informações que identificam um visitante e são
            usados apenas para melhorar o funcionamento do site.
          </p>

          <h3>2.3. Cookies de Funcionalidade</h3>
          <p>
            Estes cookies permitem que o site lembre as escolhas que você faz (como seu nome de usuário, idioma ou
            região) e forneça recursos aprimorados e mais personalizados.
          </p>

          <h3>2.4. Cookies de Publicidade</h3>
          <p>
            Estes cookies são usados para entregar anúncios mais relevantes para você e seus interesses. Eles também são
            usados para limitar o número de vezes que você vê um anúncio, bem como ajudar a medir a eficácia de
            campanhas publicitárias.
          </p>

          <h2>3. Cookies de Terceiros</h2>
          <p>
            Além dos nossos próprios cookies (cookies primários), podemos também utilizar vários cookies de terceiros
            para relatar estatísticas de uso, entregar anúncios e assim por diante. Estes cookies podem incluir:
          </p>
          <ul>
            <li>Google Analytics</li>
            <li>Google Ads</li>
            <li>Facebook Pixel</li>
            <li>Hotjar</li>
          </ul>

          <h2>4. Como Controlar e Excluir Cookies</h2>
          <p>
            Você tem o direito de decidir se aceita ou rejeita cookies. Você pode exercer suas preferências de cookies
            clicando nos links de configuração de preferências apropriados em nosso banner de cookies.
          </p>
          <p>
            Você também pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie
            está sendo enviado. No entanto, se você não aceitar cookies, talvez não consiga usar algumas partes de nosso
            serviço.
          </p>
          <p>Você pode excluir os cookies já armazenados em seu computador através das configurações do navegador.</p>

          <h3>4.1. Como Desativar Cookies nos Principais Navegadores</h3>
          <ul>
            <li>
              <strong>Google Chrome</strong>: Menu &gt; Configurações &gt; Avançado &gt; Privacidade e segurança &gt;
              Configurações de conteúdo &gt; Cookies
            </li>
            <li>
              <strong>Mozilla Firefox</strong>: Menu &gt; Opções &gt; Privacidade e Segurança &gt; Cookies e dados do
              site
            </li>
            <li>
              <strong>Safari</strong>: Preferências &gt; Privacidade &gt; Cookies e dados do site
            </li>
            <li>
              <strong>Microsoft Edge</strong>: Menu &gt; Configurações &gt; Cookies e permissões do site &gt; Cookies
            </li>
          </ul>

          <h2>5. Cookies que Utilizamos</h2>
          <p>A seguir, detalhamos os cookies específicos que utilizamos em nossa plataforma:</p>

          <h3>5.1. Cookies Estritamente Necessários</h3>
          <table className="w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Nome</th>
                <th className="border border-gray-300 p-2">Finalidade</th>
                <th className="border border-gray-300 p-2">Duração</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">session</td>
                <td className="border border-gray-300 p-2">Mantém o estado da sessão do usuário</td>
                <td className="border border-gray-300 p-2">2 horas</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">auth-token</td>
                <td className="border border-gray-300 p-2">Autenticação do usuário</td>
                <td className="border border-gray-300 p-2">30 dias</td>
              </tr>
            </tbody>
          </table>

          <h3>5.2. Cookies de Desempenho</h3>
          <table className="w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Nome</th>
                <th className="border border-gray-300 p-2">Finalidade</th>
                <th className="border border-gray-300 p-2">Duração</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">_ga</td>
                <td className="border border-gray-300 p-2">Google Analytics - Distingue usuários</td>
                <td className="border border-gray-300 p-2">2 anos</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">_gid</td>
                <td className="border border-gray-300 p-2">Google Analytics - Distingue usuários</td>
                <td className="border border-gray-300 p-2">24 horas</td>
              </tr>
            </tbody>
          </table>

          <h2>6. Alterações nesta Política de Cookies</h2>
          <p>
            Podemos atualizar esta Política de Cookies periodicamente para refletir, por exemplo, mudanças nos cookies
            que usamos ou por outros motivos operacionais, legais ou regulatórios. Recomendamos que você visite
            regularmente esta página para se manter informado sobre o uso de cookies e tecnologias relacionadas.
          </p>
          <p>A data no topo desta Política de Cookies indica quando ela foi atualizada pela última vez.</p>

          <h2>7. Contato</h2>
          <p>
            Se você tiver dúvidas sobre como usamos cookies ou outras tecnologias, entre em contato conosco pelo e-mail:{" "}
            <a href="mailto:privacidade@encontramais.com.br" className="text-primary hover:underline">
              privacidade@encontramais.com.br
            </a>
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/termos">
            <span className="text-primary hover:underline">Termos de Uso</span>
          </Link>
          <Link href="/privacidade">
            <span className="text-primary hover:underline">Política de Privacidade</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

