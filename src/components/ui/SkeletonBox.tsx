import { cn } from '@/lib/cn'

interface SkeletonBoxProps {
  className?: string
}

export function SkeletonBox({ className }: SkeletonBoxProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-gradient-to-r from-[var(--surface-secondary)] via-[var(--bg-primary)] to-[var(--surface-secondary)] bg-[length:200%_100%]',
        'animate-[shimmer_1.8s_ease-in-out_infinite] rounded-[var(--radius-md)]',
        className
      )}
    />
  )
}
