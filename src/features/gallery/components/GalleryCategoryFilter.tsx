import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { useTranslation } from '@/hooks/useTranslation'
import type { GalleryCategory } from '@/features/gallery/types/gallery.types'

interface GalleryCategoryFilterProps {
  active: GalleryCategory
  onSelect: (category: GalleryCategory) => void
}

export function GalleryCategoryFilter({ active, onSelect }: GalleryCategoryFilterProps) {
  const { t } = useTranslation()

  const filters: { id: GalleryCategory; label: string }[] = [
    { id: 'all',      label: t.gallery.filterAll },
    { id: 'food',     label: t.gallery.filterFood },
    { id: 'ambience', label: t.gallery.filterAmbience },
    { id: 'team',     label: t.gallery.filterTeam },
  ]

  return (
    <div
      role="group"
      aria-label={t.gallery.filterLabel}
      className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
    >
      {filters.map(f => {
        const isActive = active === f.id
        return (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            aria-pressed={isActive}
            className={cn(
              'relative flex-shrink-0 px-5 py-2.5 rounded-[var(--radius-full)] text-sm font-medium transition-all duration-300 cursor-pointer select-none',
              isActive
                ? 'text-[var(--primary)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:-translate-y-px hover:glass-warm-subtle'
            )}
          >
            {f.label}
            {isActive && (
              <motion.span
                layoutId="gallery-pill"
                className="absolute inset-0 glass-warm rounded-[var(--radius-full)] -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
