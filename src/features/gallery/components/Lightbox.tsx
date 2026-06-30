import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import type { GalleryImage } from '@/features/gallery/types/gallery.types'

interface LightboxProps {
  image: GalleryImage
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ image, index, total, onClose, onPrev, onNext }: LightboxProps) {
  const { t } = useTranslation()
  const touchStartX = useRef<number | null>(null)

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) delta < 0 ? onNext() : onPrev()
    touchStartX.current = null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[var(--z-modal)] glass-dialog flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 border-b border-[var(--border)]">
        <span className="text-[var(--muted)] text-sm tabular-nums">{index + 1} / {total}</span>
        <button
          onClick={onClose}
          aria-label={t.gallery.close}
          className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-[var(--transition-base)] p-2 rounded-[var(--radius-full)] hover:bg-[var(--surface-secondary)] cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative px-16 min-h-0">
        <button
          onClick={onPrev}
          aria-label={t.gallery.previous}
          className="absolute left-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-[var(--transition-base)] p-3 rounded-[var(--radius-full)] hover:bg-[var(--surface-secondary)] cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={image.id}
            src={image.src}
            alt={image.alt}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="max-h-full max-w-full object-contain rounded-[var(--radius-lg)] select-none shadow-[var(--shadow-lg)]"
            draggable={false}
          />
        </AnimatePresence>

        <button
          onClick={onNext}
          aria-label={t.gallery.next}
          className="absolute right-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-[var(--transition-base)] p-3 rounded-[var(--radius-full)] hover:bg-[var(--surface-secondary)] cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="px-6 pb-6 pt-4 flex-shrink-0 text-center border-t border-[var(--border)]">
        <p className="text-[var(--text-secondary)] text-sm">{image.alt}</p>
      </div>
    </motion.div>
  )
}
