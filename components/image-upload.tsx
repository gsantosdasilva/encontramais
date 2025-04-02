"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  currentImage?: string | null
  className?: string
  loading?: boolean
}

export default function ImageUpload({ onImageUpload, currentImage, className, loading = false }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Criar URL de preview
    const fileUrl = URL.createObjectURL(file)
    setPreviewUrl(fileUrl)

    // Chamar callback
    onImageUpload(file)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={loading}
      />

      {previewUrl ? (
        <div className="relative w-full h-full min-h-[200px] rounded-md overflow-hidden">
          <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleButtonClick}
              className="text-white border-white hover:bg-white/20"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
              {loading ? "Enviando..." : "Alterar imagem"}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full min-h-[200px] border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 hover:bg-muted/50 cursor-pointer"
          onClick={handleButtonClick}
        >
          {loading ? (
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin mb-2" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          )}
          <span className="text-sm text-muted-foreground">{loading ? "Enviando..." : "Clique para fazer upload"}</span>
        </div>
      )}
    </div>
  )
}

