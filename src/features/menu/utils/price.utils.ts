import type { PricingOption } from '@/types'

export function formatPrice(symbol: string, price: number): string {
  return `${symbol}${price}`
}

export function getPriceDisplay(symbol: string, pricing: PricingOption[]): string {
  if (pricing.length === 1) return formatPrice(symbol, pricing[0].price)
  const min = Math.min(...pricing.map(p => p.price))
  const max = Math.max(...pricing.map(p => p.price))
  return `${formatPrice(symbol, min)} – ${formatPrice(symbol, max)}`
}
