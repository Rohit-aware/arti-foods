import { useErrorBoundary } from '@/hooks/useErrorBoundary'
import { ErrorFallbackView } from '@/components/ui/ErrorFallbackView'
import { featuresConfig } from '@/config/features.config'

export function GlobalErrorBoundary() {
  const { errorMessage, errorStack, isChunkError, handleReload, handleGoHome } = useErrorBoundary()

  if (!featuresConfig.errorBoundary) {
    throw new Error(errorMessage)
  }

  return (
    <ErrorFallbackView
      errorMessage={errorMessage}
      errorStack={errorStack}
      isChunkError={isChunkError}
      onReload={handleReload}
      onGoHome={handleGoHome}
    />
  )
}
