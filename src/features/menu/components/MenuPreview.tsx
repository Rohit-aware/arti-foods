import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMenu } from '../hooks/useMenu'
import { MenuItemCard } from './MenuItemCard'
import { Button } from '@/components/ui/Button'
import { easeOut } from '@/lib/motion'
import { useTranslation } from '@/hooks/useTranslation'

export function MenuPreview() {
  const { t } = useTranslation()
  const { restaurant, categories } = useMenu()

  const popularItems = useMemo(() => {
    return categories
      .flatMap(c => c.items)
      .filter(item => item.isPopular && item.isAvailable)
      .slice(0, 6)
  }, [categories])

  if (popularItems.length === 0) return null

  return (
    <section className="py-24 bg-[var(--surface-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3 block">{t.home.menuHighlights}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--primary)]">{t.home.popularPicks}</h2>
          </div>
          <Link to="/menu" className="hidden sm:block">
            <Button variant="secondary" size="sm">{t.home.viewAll}</Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {popularItems.map((item, i) => (
            <MenuItemCard key={item.id} item={item} currencySymbol={restaurant.currencySymbol} index={i} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link to="/menu"><Button variant="secondary">{t.home.seeFullMenu}</Button></Link>
        </div>
      </div>
    </section>
  )
}
