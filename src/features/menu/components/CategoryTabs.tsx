import { useRef, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { useTranslation } from '@/hooks/useTranslation'
import type { MenuCategory } from '@/types'

interface CategoryTabsProps {
  categories: MenuCategory[]
  activeCategoryId: string
  onSelect: (id: string) => void
}

export const CategoryTabs = memo(function CategoryTabs({ categories, activeCategoryId, onSelect }: CategoryTabsProps) {
  const { t } = useTranslation()
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeCategoryId])

  return (
    <div className="sticky top-16 z-[var(--z-sticky)] bg-[var(--bg-primary)] border-b border-[var(--border)]">
      <nav
        aria-label={t.menu.categories}
        className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 py-4"
      >
        {categories.map(category => {
          const isActive = category.id === activeCategoryId
          return (
            <button
              key={category.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(category.id)}
              aria-pressed={isActive}
              className={cn(
                'relative flex-shrink-0 px-4 py-2 rounded-[var(--radius-full)] text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer select-none',
                isActive
                  ? 'text-[var(--primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:-translate-y-px hover:glass-warm-subtle'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 glass-warm rounded-[var(--radius-full)] -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              {category.title}
            </button>
          )
        })}
      </nav>
    </div>
  )
})
