"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit2, Plus, Check, X, Loader2 } from "lucide-react"
import Image from "next/image"
import ImageUpload from "@/components/image-upload"
import { addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from "@/services/portfolio"
import type { PortfolioItem } from "@/types/database"

interface PortfolioManagerProps {
  initialItems: PortfolioItem[]
  onUpdate: () => void
}

export default function PortfolioManager({ initialItems, onUpdate }: PortfolioManagerProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItemId, setEditingItemId] = useState<number | null>(null)
  const [newItem, setNewItem] = useState<{ title: string; imageFile?: File }>({ title: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.imageFile) {
      setError("Título e imagem são obrigatórios")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const addedItem = await addPortfolioItem(newItem.title, newItem.imageFile)
      setItems([...items, addedItem])
      setNewItem({ title: "" })
      setIsAddingItem(false)
      onUpdate()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateItem = async (id: number) => {
    const item = items.find((i) => i.id === id)
    if (!item) return

    const editedItem = items.find((i) => i.id === editingItemId)
    if (!editedItem || !editedItem.title) {
      setError("Título é obrigatório")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const updatedItem = await updatePortfolioItem(id, editedItem.title, newItem.imageFile, editedItem.image_url)

      setItems(items.map((item) => (item.id === id ? updatedItem : item)))
      setEditingItemId(null)
      setNewItem({ title: "" })
      onUpdate()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteItem = async (id: number, imageUrl: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await deletePortfolioItem(id, imageUrl)
      setItems(items.filter((item) => item.id !== id))
      onUpdate()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (file: File) => {
    setNewItem({ ...newItem, imageFile: file })
  }

  const updateItemTitle = (id: number, title: string) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, title }
        }
        return item
      }),
    )
  }

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isAddingItem && (
        <div className="border p-4 rounded-md mb-4 bg-muted/30">
          <h3 className="font-medium mb-3">Nova Foto</h3>
          <div className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="portfolioTitle">Título</Label>
              <Input
                id="portfolioTitle"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Ex: Instalação de pia"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>Imagem</Label>
              <ImageUpload onImageUpload={handleImageUpload} loading={isLoading} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddingItem(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleAddItem} disabled={isLoading || !newItem.title || !newItem.imageFile}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Adicionando...
                </>
              ) : (
                "Adicionar"
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative aspect-square rounded-md overflow-hidden group">
            <Image src={item.image_url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
              <div className="text-white text-center p-4">
                {editingItemId === item.id ? (
                  <div className="space-y-2">
                    <Input
                      value={item.title}
                      onChange={(e) => updateItemTitle(item.id, e.target.value)}
                      className="bg-transparent text-white border-white/50"
                      disabled={isLoading}
                    />
                    <div className="flex justify-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white hover:bg-white/20"
                        onClick={() => handleUpdateItem(item.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3 mr-1" />}
                        {isLoading ? "Salvando..." : "Salvar"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white hover:bg-white/20"
                        onClick={() => setEditingItemId(null)}
                        disabled={isLoading}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-medium mb-2">{item.title}</p>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white hover:bg-white/20"
                        onClick={() => setEditingItemId(item.id)}
                        disabled={isLoading}
                      >
                        <Edit2 className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white hover:bg-white/20"
                        onClick={() => handleDeleteItem(item.id, item.image_url)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        ) : (
                          <Trash2 className="h-3 w-3 mr-1" />
                        )}
                        Remover
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {!isAddingItem && (
          <div
            className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 hover:bg-muted/50 cursor-pointer"
            onClick={() => setIsAddingItem(true)}
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Adicionar foto</span>
          </div>
        )}
      </div>
    </div>
  )
}

