"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Edit2, Plus, Trash2, X, Loader2 } from "lucide-react"
import { addService, updateService, deleteService } from "@/services/professional-services"
import type { Service } from "@/types/database"

interface ServicesManagerProps {
  initialServices: Service[]
  onUpdate: () => void
}

export default function ServicesManager({ initialServices, onUpdate }: ServicesManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isAddingService, setIsAddingService] = useState(false)
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null)
  const [newService, setNewService] = useState<{ name: string; price: string }>({ name: "", price: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddService = async () => {
    if (!newService.name || !newService.price) {
      setError("Nome e preço são obrigatórios")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const addedService = await addService(newService.name, newService.price)
      setServices([...services, addedService])
      setNewService({ name: "", price: "" })
      setIsAddingService(false)
      onUpdate()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateService = async (id: number) => {
    const service = services.find((s) => s.id === id)
    if (!service) return

    if (!service.name || !service.price) {
      setError("Nome e preço são obrigatórios")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const updatedService = await updateService(id, service.name, service.price)
      setServices(services.map((service) => (service.id === id ? updatedService : service)))
      setEditingServiceId(null)
      onUpdate()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteService = async (id: number) => {
    setIsLoading(true)
    setError(null)

    try {
      await deleteService(id)
      setServices(services.filter((service) => service.id !== id))
      onUpdate()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateServiceField = (id: number, field: "name" | "price", value: string) => {
    setServices(
      services.map((service) => {
        if (service.id === id) {
          return { ...service, [field]: value }
        }
        return service
      }),
    )
  }

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isAddingService && (
        <div className="border p-4 rounded-md mb-4 bg-muted/30">
          <h3 className="font-medium mb-3">Novo Serviço</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Nome do Serviço</Label>
              <Input
                id="serviceName"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                placeholder="Ex: Instalação de torneira"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicePrice">Preço</Label>
              <Input
                id="servicePrice"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                placeholder="Ex: R$ 120,00"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddingService(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleAddService} disabled={isLoading || !newService.name || !newService.price}>
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

      <div className="space-y-4">
        {services.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">Você ainda não adicionou nenhum serviço.</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="flex justify-between items-center py-2 border-b last:border-0">
              {editingServiceId === service.id ? (
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <Input
                    value={service.name}
                    onChange={(e) => updateServiceField(service.id, "name", e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      value={service.price}
                      onChange={(e) => updateServiceField(service.id, "price", e.target.value)}
                      disabled={isLoading}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateService(service.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setEditingServiceId(null)} disabled={isLoading}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{service.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{service.price}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingServiceId(service.id)}
                      disabled={isLoading}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteService(service.id)}
                      className="text-destructive hover:text-destructive"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {!isAddingService && (
        <Button onClick={() => setIsAddingService(true)} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Adicionar Serviço
        </Button>
      )}
    </div>
  )
}

