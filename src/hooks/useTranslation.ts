import { createContext, useContext } from 'react'
import type { en } from '@/locales/en'
import type { Locale } from '@/lib/i18n'

export type Translations = typeof en

export interface I18nContext {
  t: Translations
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const I18nCtx = createContext<I18nContext | null>(null)

export function useTranslation(): I18nContext {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useTranslation must be used inside I18nProvider')
  return ctx
}
