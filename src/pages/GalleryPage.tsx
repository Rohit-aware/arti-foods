import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { featuresConfig } from '@/config/features.config'
import { GalleryGrid, GalleryCategoryFilter, Lightbox, useGallery, useLightbox } from '@/features/gallery'
import type { GalleryCategory } from '@/features/gallery'
import { useSEO } from '@/hooks/useSEO'
import { useTranslation } from '@/hooks/useTranslation'
import { themeConfig } from '@/config/theme.config'

export function GalleryPage() {
  const { t } = useTranslation()
  useSEO({ title: t.gallery.title, description: t.gallery.label })

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const { images } = useGallery(activeCategory)
  const { activeIndex, activeImage, open, close, prev, next } = useLightbox(images)

  if (!featuresConfig.gallery) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen bg-[var(--bg-primary)]">
        <p className="text-[var(--muted)]">{t.comingSoon}</p>
      </div>
    )
  }

  return (
    <div className="pt-16 bg-[var(--bg-primary)] min-h-screen">
      <div className="py-16" style={{ background: themeConfig.gradients.warmHeader }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4 block">{t.gallery.label}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--primary)] mb-7">{t.gallery.title}</h1>
            <GalleryCategoryFilter active={activeCategory} onSelect={setActiveCategory} />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        {images.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-[var(--muted)]">{t.gallery.empty}</p>
          </div>
        ) : (
          <GalleryGrid images={images} onImageClick={open} />
        )}
      </div>

      <AnimatePresence>
        {activeImage !== null && activeIndex !== null && (
          <Lightbox image={activeImage} index={activeIndex} total={images.length} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </div>
  )
}
