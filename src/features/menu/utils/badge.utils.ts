import type { MenuItem, BadgeType } from '@/types'

export function resolveBadge(item: MenuItem): BadgeType {
  if (item.isPopular) return 'popular'
  if (item.isRecommended) return 'recommended'
  if (item.isNew) return 'new'
  return null
}
