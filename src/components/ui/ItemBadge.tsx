import { cn } from '@/lib/cn'
import { useTranslation } from '@/hooks/useTranslation'
import type { BadgeType } from '@/types'

interface ItemBadgeProps {
  badge: BadgeType
  className?: string
}

export function ItemBadge({ badge, className }: ItemBadgeProps) {
  const { t } = useTranslation()
  if (!badge) return null

  const badgeMap: Record<NonNullable<BadgeType>, { label: string; className: string }> = {
    popular:     { label: t.badge.popular,     className: 'bg-[var(--accent-warm)] text-[var(--primary)] border border-[var(--accent-light)]' },
    recommended: { label: t.badge.recommended, className: 'bg-[var(--surface-secondary)] text-[var(--primary-light)] border border-[var(--border)]' },
    new:         { label: t.badge.new,         className: 'bg-[var(--accent-pale)] text-[var(--accent)] border border-[var(--border)]' },
  }

  const { label, className: badgeClass } = badgeMap[badge]
  return (
    <span className={cn('text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-[var(--radius-full)] whitespace-nowrap', badgeClass, className)}>
      {label}
    </span>
  )
}
