import { memo } from 'react'
import { cn } from '@/lib/cn'
import { useTranslation } from '@/hooks/useTranslation'

interface VegBadgeProps {
  isVeg: boolean
  className?: string
}

export const VegBadge = memo(function VegBadge({ isVeg, className }: VegBadgeProps) {
  const { t } = useTranslation()
  return (
    <span
      aria-label={isVeg ? t.veg : t.nonveg}
      title={isVeg ? t.veg : t.nonveg}
      className={cn(
        'inline-flex items-center justify-center w-[18px] h-[18px] border-2 rounded-sm flex-shrink-0',
        isVeg ? 'border-[var(--veg)]' : 'border-[var(--nonveg)]',
        className
      )}
    >
      <span className={cn('w-2 h-2 rounded-full', isVeg ? 'bg-[var(--veg)]' : 'bg-[var(--nonveg)]')} />
    </span>
  )
})
