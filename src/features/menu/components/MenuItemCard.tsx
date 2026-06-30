import { memo } from 'react'
import { motion } from 'framer-motion'
import { LazyImage } from '@/components/ui/LazyImage'
import { VegBadge } from '@/components/ui/VegBadge'
import { ItemBadge } from '@/components/ui/ItemBadge'
import { cn } from '@/lib/cn'
import { resolveBadge } from '@/features/menu/utils/badge.utils'
import { getPriceDisplay } from '@/features/menu/utils/price.utils'
import { useTranslation } from '@/hooks/useTranslation'
import type { MenuItem } from '@/types'

interface MenuItemCardProps {
  item: MenuItem
  currencySymbol: string
  index?: number
}

export const MenuItemCard = memo(function MenuItemCard({ item, currencySymbol, index = 0 }: MenuItemCardProps) {
  const { t } = useTranslation()
  const badge = resolveBadge(item)
  const priceDisplay = getPriceDisplay(currencySymbol, item.pricing)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
      style={{ willChange: 'transform' }}
      className={cn(
        'group flex gap-4 p-4 bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)]',
        'shadow-[var(--shadow-card)] transition-[border-color] duration-300 ease-out hover:border-[rgba(200,137,43,0.22)]',
        !item.isAvailable && 'opacity-55 grayscale-[30%]'
      )}
      aria-label={item.name}
    >
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <VegBadge isVeg={item.isVeg} className="mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{item.name}</h3>
            {item.description && (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2 leading-relaxed">{item.description}</p>
            )}
          </div>
        </div>

        {item.pricing.length > 1 && (
          <div className="flex gap-1.5 flex-wrap">
            {item.pricing.map(p => (
              <span key={p.label} className="text-[10px] text-[var(--muted)] bg-[var(--surface-secondary)] px-2.5 py-1 rounded-[var(--radius-full)] border border-[var(--border)]">
                {p.label} · {currencySymbol}{p.price}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="font-bold text-[var(--accent)] text-base">{priceDisplay}</span>
          <div className="flex items-center gap-2">
            {badge && <ItemBadge badge={badge} />}
            {!item.isAvailable && (
              <span className="text-[10px] text-[var(--muted)] font-medium bg-[var(--surface-secondary)] px-2 py-0.5 rounded-[var(--radius-full)]">
                {t.menu.unavailable}
              </span>
            )}
          </div>
        </div>
      </div>

      <LazyImage
        src={item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/images/menu/${item.image}`}
        alt={item.name}
        containerClassName="w-24 h-24 flex-shrink-0 rounded-[var(--radius-md)] overflow-hidden bg-[var(--surface-secondary)]"
        className="group-hover:scale-105 transition-transform duration-300 ease-out"
      />
    </motion.article>
  )
})
