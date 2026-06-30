import { useState, useCallback, useMemo } from 'react'
import type { MenuCategory } from '@/types'

export function useSearch(categories: MenuCategory[]) {
  const [query, setQuery] = useState('')

  const updateQuery = useCallback((value: string) => {
    setQuery(value)
  }, [])

  const filteredCategories = useMemo<MenuCategory[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories

    return categories
      .map(category => ({
        ...category,
        items: category.items.filter(
          item =>
            item.name.toLowerCase().includes(q) ||
            item.tags.some(tag => tag.toLowerCase().includes(q))
        ),
      }))
      .filter(category => category.items.length > 0)
  }, [query, categories])

  return { query, updateQuery, filteredCategories, isSearching: query.trim().length > 0 }
}
