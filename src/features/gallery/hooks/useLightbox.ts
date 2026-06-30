import { useState, useCallback, useEffect } from 'react'
import type { GalleryImage } from '@/features/gallery/types/gallery.types'

export function useLightbox(images: GalleryImage[]) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const open = useCallback((index: number) => setActiveIndex(index), [])
  const close = useCallback(() => setActiveIndex(null), [])

  const prev = useCallback(() => {
    setActiveIndex(i => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  const next = useCallback(() => {
    setActiveIndex(i => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (activeIndex === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeIndex, close, prev, next])

  const activeImage = activeIndex !== null ? images[activeIndex] : null

  return { activeIndex, activeImage, open, close, prev, next }
}
