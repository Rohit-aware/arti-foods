import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

interface EmptySearchProps {
  query: string
}

export function EmptySearch({ query }: EmptySearchProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-[var(--radius-full)] bg-[var(--accent-warm)] flex items-center justify-center mb-5">
        <svg className="w-7 h-7 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="font-display text-lg font-semibold text-[var(--primary)] mb-2">
        {t.menu.notFoundTitle.replace('{query}', query)}
      </p>
      <p className="text-sm text-[var(--text-secondary)]">{t.menu.notFoundBody}</p>
    </motion.div>
  )
}
