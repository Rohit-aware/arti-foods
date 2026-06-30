import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/cn'

interface LocaleSwitcherProps {
  className?: string
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const { locale, setLocale } = useTranslation()

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'mr' : 'en')
  }

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'group flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full glass-warm-subtle transition-all duration-300 hover:-translate-y-px active:scale-95 cursor-pointer text-[var(--text-primary)]',
        className
      )}
      aria-label={`Switch language. Current: ${locale === 'en' ? 'English' : 'Marathi'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--primary)] group-hover:rotate-12 transition-transform duration-300"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      <span className="min-w-[18px] text-center select-none text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors duration-300">
        {locale === 'en' ? 'EN' : 'मर'}
      </span>
    </button>
  )
}
