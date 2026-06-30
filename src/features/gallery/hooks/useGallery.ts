import { useMemo } from 'react'
import { galleryConfig } from '@/config/gallery.config'
import type { GalleryCategory } from '@/features/gallery/types/gallery.types'

export function useGallery(activeCategory: GalleryCategory) {
  const sorted = useMemo(
    () => [...galleryConfig].sort((a, b) => a.displayOrder - b.displayOrder),
    []
  )

  const filtered = useMemo(
    () => (activeCategory === 'all' ? sorted : sorted.filter(img => img.category === activeCategory)),
    [sorted, activeCategory]
  )

  return { images: filtered, total: galleryConfig.length }
}
