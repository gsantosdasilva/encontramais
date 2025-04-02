"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import UserNav from "@/components/user-nav"
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/contexts/auth-context'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Serviços", href: "/servicos" },
    { name: "Preços", href: "/precos" },
    { name: "FAQ", href: "/faq" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">Encontra+</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="default"
            asChild
            className="bg-primary hover:bg-primary/90"
          >
            <Link href={user ? "/dashboard" : "/login"}>
              Área do Profissional
            </Link>
          </Button>
        </div>
        <button className="flex items-center space-x-2 md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                variant="default"
                asChild
                className="bg-primary hover:bg-primary/90"
              >
                <Link href={user ? "/dashboard" : "/login"}>
                  Área do Profissional
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

