import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold gradient-text">Encontra+</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Conectando você aos melhores profissionais para seus serviços.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicos" className="text-muted-foreground hover:text-primary">
                  Todos os Serviços
                </Link>
              </li>
              <li>
                <Link href="/servico/encanadores" className="text-muted-foreground hover:text-primary">
                  Encanadores
                </Link>
              </li>
              <li>
                <Link href="/servico/eletricistas" className="text-muted-foreground hover:text-primary">
                  Eletricistas
                </Link>
              </li>
              <li>
                <Link href="/servico/pintores" className="text-muted-foreground hover:text-primary">
                  Pintores
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-muted-foreground hover:text-primary">
                  Ver mais...
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-primary">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/precos" className="text-muted-foreground hover:text-primary">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/termos" className="text-muted-foreground hover:text-primary">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-muted-foreground hover:text-primary">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Encontra+. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

