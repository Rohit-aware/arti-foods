import { memo } from 'react'
import { MenuItemCard } from './MenuItemCard'
import { useTranslation } from '@/hooks/useTranslation'
import type { MenuCategory } from '@/types'

interface CategorySectionProps {
  category: MenuCategory
  currencySymbol: string
}

export const CategorySection = memo(function CategorySection({ category, currencySymbol }: CategorySectionProps) {
  const { t } = useTranslation()

  return (
    <section id={`category-${category.id}`} aria-labelledby={`heading-${category.id}`} className="py-2">
      <div className="flex items-baseline gap-3 px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <h2 id={`heading-${category.id}`} className="font-display text-xl font-semibold text-[var(--primary)]">
          {category.title}
        </h2>
        <span className="text-xs text-[var(--muted)] font-medium bg-[var(--surface-secondary)] px-2.5 py-0.5 rounded-[var(--radius-full)] border border-[var(--border)]">
          {category.items.length} {t.menu.items}
        </span>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {category.items.map((item, i) => (
          <MenuItemCard key={item.id} item={item} currencySymbol={currencySymbol} index={i} />
        ))}
      </div>
    </section>
  )
})
