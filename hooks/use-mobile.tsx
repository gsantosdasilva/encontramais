"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Verificar inicialmente
    setIsMobile(window.innerWidth < breakpoint)

    // Adicionar listener para redimensionamento
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    window.addEventListener("resize", handleResize)

    // Limpar listener ao desmontar
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [breakpoint])

  return isMobile
}

