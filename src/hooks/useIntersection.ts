import { useEffect, useRef, useState } from 'react'

export function useIntersection(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const root = options?.root
  const rootMargin = options?.rootMargin
  const threshold = options?.threshold

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { root, rootMargin, threshold })

    observer.observe(el)
    return () => observer.disconnect()
  }, [root, rootMargin, threshold])

  return { ref, isVisible }
}
