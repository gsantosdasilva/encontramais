"use client"

import { useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export default function FadeIn({ children, className, delay = 0, duration = 500, direction = "up" }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translate3d(0, 20px, 0)"
      case "down":
        return "translate3d(0, -20px, 0)"
      case "left":
        return "translate3d(20px, 0, 0)"
      case "right":
        return "translate3d(-20px, 0, 0)"
      default:
        return "translate3d(0, 0, 0)"
    }
  }

  return (
    <div
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : getTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

