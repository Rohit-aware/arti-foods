import { useState, useCallback } from 'react'

export function useCategoryFilter(defaultId: string) {
  const [activeCategoryId, setActiveCategoryId] = useState(defaultId)

  const selectCategory = useCallback((id: string) => {
    setActiveCategoryId(id)
  }, [])

  return { activeCategoryId, selectCategory }
}
