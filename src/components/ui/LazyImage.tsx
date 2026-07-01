import { useState, memo } from 'react'
import { cn } from '@/lib/cn'
import { SkeletonBox } from './SkeletonBox'
import { useTranslation } from '@/hooks/useTranslation'
import { useIntersection } from '@/hooks/useIntersection'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  objectFit?: 'cover' | 'contain'
}

export const LazyImage = memo(function LazyImage({ src, alt, className, containerClassName, objectFit = 'cover' }: LazyImageProps) {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const { ref, isVisible } = useIntersection({ rootMargin: '200px' })

  return (
    <div ref={ref as any} className={cn('relative overflow-hidden', containerClassName)}>
      {!loaded && !error && <SkeletonBox className="absolute inset-0 rounded-none" />}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-secondary)]">
          <span className="text-[var(--muted)] text-xs">{t.noImage}</span>
        </div>
      ) : (
        isVisible && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={cn(
              'w-full h-full transition-opacity duration-[var(--transition-slower)]',
              objectFit === 'cover' ? 'object-cover' : 'object-contain',
              loaded ? 'opacity-100' : 'opacity-0',
              className
            )}
          />
        )
      )}
    </div>
  )
})
