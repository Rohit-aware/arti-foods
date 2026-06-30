import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ErrorFallbackViewProps {
  errorMessage: string
  errorStack: string
  isChunkError: boolean
  onReload: () => void
  onGoHome: () => void
}

export function ErrorFallbackView({
  errorMessage,
  errorStack,
  isChunkError,
  onReload,
  onGoHome,
}: ErrorFallbackViewProps) {
  const isReduced = useReducedMotion()

  return (
    <div className="flex flex-col items-center justify-center min-h-[80svh] px-4 py-12 md:py-24 text-center">
      <motion.div
        initial={isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
        animate={isReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        transition={isReduced ? undefined : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="max-w-md w-full glass-warm p-8 md:p-10 rounded-[var(--radius-xl)] border border-[var(--border)]"
      >
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[var(--accent-pale)] text-[var(--accent)] text-3xl select-none">
          {isChunkError ? '📡' : '⚠️'}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 text-[var(--primary)]">
          {isChunkError ? 'Connection Issue' : 'Something Went Wrong'}
        </h2>

        <p className="text-sm md:text-base text-[var(--text-secondary)] mb-8 leading-relaxed">
          {isChunkError
            ? "We couldn't load this page. This typically happens when the app is updated or when your network drops."
            : 'An unexpected application error has occurred. Please try reloading the page or returning home.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Button variant="primary" size="md" onClick={onReload} className="w-full sm:w-auto">
            Try Again
          </Button>
          <Button variant="secondary" size="md" onClick={onGoHome} className="w-full sm:w-auto">
            Go Home
          </Button>
        </div>

        {errorStack && (
          <details className="text-left border-t border-[var(--border-light)] pt-6 group">
            <summary className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider cursor-pointer list-none flex items-center justify-between select-none group-open:text-[var(--accent)]">
              <span>Developer Details</span>
              <span className="text-[10px] transition-transform duration-300 group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-3 bg-[var(--surface-secondary)] rounded-[var(--radius-sm)] p-4 overflow-auto max-h-40 border border-[var(--border-light)]">
              <p className="text-xs font-mono font-bold text-[var(--danger)] mb-1 leading-normal break-all">
                {errorMessage}
              </p>
              <pre className="text-[10px] font-mono text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap break-all">
                {errorStack}
              </pre>
            </div>
          </details>
        )}
      </motion.div>
    </div>
  )
}
