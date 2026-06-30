export interface PricingOption {
  label: string
  price: number
}

export interface MenuItem {
  id: string
  name: string
  description: string
  image: string
  pricing: PricingOption[]
  isVeg: boolean
  isAvailable: boolean
  isPopular: boolean
  isRecommended: boolean
  isNew: boolean
  tags: string[]
  displayOrder: number
}

export interface MenuCategory {
  id: string
  title: string
  description: string
  displayOrder: number
  isActive: boolean
  items: MenuItem[]
}

export interface Restaurant {
  id: string
  name: string
  tagline: string
  currency: string
  currencySymbol: string
}

export interface MenuConfig {
  restaurant: Restaurant
  categories: MenuCategory[]
}

export type BadgeType = 'popular' | 'recommended' | 'new' | null
