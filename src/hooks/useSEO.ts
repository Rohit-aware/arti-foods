import { useEffect } from 'react'
import { appConfig } from '@/config/app.config'

interface SEOProps {
  title?: string
  description?: string
  image?: string
}

export function useSEO({ title, description, image }: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${appConfig.name}` : appConfig.name
    const desc = description ?? appConfig.description

    document.title = fullTitle

    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        const attr = selector.includes('property') ? 'property' : 'name'
        const val = selector.match(/["']([^"']+)["']/)?.[1] ?? ''
        el.setAttribute(attr, val)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('meta[name="description"]', desc)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', desc)
    setMeta('meta[property="og:type"]', 'website')
    setMeta('meta[property="og:url"]', appConfig.website)
    if (image) setMeta('meta[property="og:image"]', image)
    setMeta('meta[name="twitter:card"]', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', fullTitle)
    setMeta('meta[name="twitter:description"]', desc)

    return () => {
      document.title = appConfig.name
    }
  }, [title, description, image])
}
