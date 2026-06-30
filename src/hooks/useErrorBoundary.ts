import { useRouteError, useNavigate } from 'react-router-dom'
import { useEffect, useCallback } from 'react'

export function useErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage = 'An unexpected error occurred.'
  let errorStack = ''
  let isChunkError = false

  if (error instanceof Error) {
    errorMessage = error.message
    errorStack = error.stack || ''
  } else if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      errorMessage = error.message
    }
    if ('statusText' in error && typeof error.statusText === 'string') {
      errorMessage = error.statusText
    }
  }

  isChunkError = /failed to fetch dynamically imported module|loading chunk|failed to load chunk/i.test(errorMessage)

  useEffect(() => {
    if (isChunkError) {
      const lastReload = sessionStorage.getItem('chunk-error-reload')
      const now = Date.now()
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('chunk-error-reload', now.toString())
        window.location.reload()
      }
    }
  }, [isChunkError])

  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])

  const handleGoHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  return {
    errorMessage,
    errorStack,
    isChunkError,
    handleReload,
    handleGoHome,
  }
}
