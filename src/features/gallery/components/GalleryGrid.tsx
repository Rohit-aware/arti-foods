import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'
import { LazyImage } from '@/components/ui/LazyImage'
import type { GalleryImage } from '@/features/gallery/types/gallery.types'

interface GalleryGridProps {
  images: GalleryImage[]
  onImageClick: (index: number) => void
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
      <AnimatePresence mode="popLayout">
        {images.map((img, idx) => (
          <motion.button
            key={img.id}
            layout
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28, delay: idx * 0.025 }}
            onClick={() => onImageClick(idx)}
            aria-label={`${img.alt}`}
            className={cn(
              'break-inside-avoid w-full block rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface-secondary)] cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
              'group shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300 ease-out'
            )}
          >
            <LazyImage
              src={img.src}
              alt={img.alt}
              containerClassName={`w-full ${idx % 3 === 0 ? 'aspect-square' : idx % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}
              className="group-hover:scale-[1.03] transition-transform duration-300 ease-out"
            />
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}
