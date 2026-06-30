import { useState, useCallback, useMemo, type ReactNode } from 'react'
import { I18nCtx } from '@/hooks/useTranslation'
import { getLocale, getTranslations, setLocale as persistLocale } from '@/lib/i18n'
import { en } from '@/locales/en'
import type { Locale } from '@/lib/i18n'

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(getLocale)
  const [translations, setTranslations] = useState<typeof en>(() => getTranslations(getLocale()))

  const handleSetLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    setTranslations(getTranslations(next))
    persistLocale(next)
  }, [])

  const contextValue = useMemo(() => ({
    t: translations,
    locale,
    setLocale: handleSetLocale
  }), [translations, locale, handleSetLocale])

  return (
    <I18nCtx.Provider value={contextValue}>
      {children}
    </I18nCtx.Provider>
  )
}
