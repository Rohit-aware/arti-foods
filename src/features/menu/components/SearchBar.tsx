import { cn } from '@/lib/cn'
import { useTranslation } from '@/hooks/useTranslation'

interface SearchBarProps {
  query: string
  onChange: (value: string) => void
  className?: string
}

export function SearchBar({ query, onChange, className }: SearchBarProps) {
  const { t } = useTranslation()

  return (
    <div className={cn('relative group', className)}>
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-light)] group-focus-within:text-[var(--accent)] transition-colors duration-[var(--transition-base)]"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={e => onChange(e.target.value)}
        placeholder={t.menu.searchPlaceholder}
        aria-label={t.menu.searchLabel}
        className="w-full pl-11 pr-4 py-3.5 rounded-[var(--radius-xl)] glass-warm text-sm text-[var(--text-primary)] placeholder:text-[var(--muted-light)] focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 transition-all duration-300"
      />
      {query && (
        <button
          onClick={() => onChange('')}
          aria-label={t.menu.clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
