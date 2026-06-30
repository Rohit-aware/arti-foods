import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary:
    'glass-warm text-[var(--primary)] font-semibold hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]',
  secondary:
    'glass-warm-subtle text-[var(--text-primary)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]',
  ghost:
    'text-[var(--text-secondary)] hover:glass-warm-subtle hover:text-[var(--primary)] active:scale-[0.97]',
  outline:
    'glass-warm-accent text-[var(--accent)] font-semibold hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-[var(--radius-full)] transition-all duration-300 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
