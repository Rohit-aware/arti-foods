import { useMemo } from 'react'
import { menuConfig } from '@/config/menu.config'
import type { MenuCategory } from '@/types'

export function useMenu() {
  const { restaurant, categories } = menuConfig

  const activeCategories = useMemo<MenuCategory[]>(
    () =>
      [...categories]
        .filter(c => c.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map(c => ({
          ...c,
          items: [...c.items].sort((a, b) => a.displayOrder - b.displayOrder),
        })),
    []
  )

  return { restaurant, categories: activeCategories }
}
