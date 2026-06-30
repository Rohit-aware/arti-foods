import { en } from '@/locales/en'
import { mr } from '@/locales/mr'

export type Locale = 'en' | 'mr'

export function getLocale(): Locale {
  try {
    const stored = localStorage.getItem('locale')
    if (stored === 'en' || stored === 'mr') return stored
  } catch { }
  const browser = navigator.language.split('-')[0]
  if (browser === 'mr') return 'mr'
  return 'en'
}

export function setLocale(locale: Locale): void {
  try {
    localStorage.setItem('locale', locale)
  } catch { }
}

export function getTranslations(locale: Locale): typeof en {
  if (locale === 'mr') return mr as unknown as typeof en
  return en
}
