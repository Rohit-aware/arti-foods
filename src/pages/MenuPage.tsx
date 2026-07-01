import { motion } from 'framer-motion'
import {
  CategoryTabs, CategorySection, SearchBar, EmptySearch,
  useMenu, useCategoryFilter, useSearch,
} from '@/features/menu'
import { featuresConfig } from '@/config/features.config'
import { useSEO } from '@/hooks/useSEO'
import { useTranslation } from '@/hooks/useTranslation'
import { themeConfig } from '@/config/theme.config'

export function MenuPage() {
  const { t } = useTranslation()
  const { restaurant, categories } = useMenu()
  const { activeCategoryId, selectCategory } = useCategoryFilter(categories[0]?.id ?? '')
  const { query, updateQuery, filteredCategories, isSearching } = useSearch(categories)

  useSEO({ title: t.menu.title, description: `Browse the full menu at ${restaurant.name}.` })

  const displayCategories = isSearching ? filteredCategories : categories
  const activeCategory = displayCategories.find(c => c.id === activeCategoryId) ?? displayCategories[0]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-16">
      <div
        className="pt-12 pb-10"
        style={{ background: themeConfig.gradients.warmHeader }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3 block">
              {t.menu.currencyLabel
                .replace('{name}', restaurant.name)
                .replace('{symbol}', restaurant.currencySymbol)
                .replace('{currency}', restaurant.currency)}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--primary)] mb-6">
              {t.menu.title}
            </h1>
            {featuresConfig.search && (
              <div className="max-w-xl">
                <SearchBar query={query} onChange={updateQuery} />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {!isSearching && featuresConfig.categoryFilter && (
        <CategoryTabs categories={categories} activeCategoryId={activeCategoryId} onSelect={selectCategory} />
      )}

      <div className="max-w-7xl mx-auto pb-24">
        {displayCategories.length === 0 ? (
          <EmptySearch query={query} />
        ) : isSearching ? (
          displayCategories.map(category => (
            <CategorySection key={category.id} category={category} currencySymbol={restaurant.currencySymbol} />
          ))
        ) : (
          activeCategory && (
            <CategorySection key={activeCategory.id} category={activeCategory} currencySymbol={restaurant.currencySymbol} />
          )
        )}
      </div>
    </div>
  )
}
