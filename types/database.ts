export interface ServiceCategory {
  id: number
  name: string
  slug: string
  icon: string | null
  description: string | null
  professionals_count: number
}

export interface Professional {
  id: string
  name: string
  specialty: string
  category_id: number
  description: string | null
  experience: string | null
  location: string
  availability: string | null
  is_premium: boolean
  is_active: boolean
  avatar_url: string | null
}

export interface Service {
  id: number
  name: string
  price: string
}

export interface PortfolioItem {
  id: number
  title: string
  image_url: string
}

export interface SubscriptionPlan {
  id: string
  title: string
  price: number
  description: string | null
  period: string
  discount: number
}

