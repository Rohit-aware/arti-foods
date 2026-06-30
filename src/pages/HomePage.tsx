import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HeroSection } from '@/features/hero/components/HeroSection'
import { Button } from '@/components/ui/Button'
import { useSEO } from '@/hooks/useSEO'
import { appConfig } from '@/config/app.config'
import { easeOut } from '@/lib/motion'
import { useTranslation } from '@/hooks/useTranslation'
import { themeConfig } from '@/config/theme.config'

const MenuPreview = lazy(() => import('@/features/menu/components/MenuPreview').then(m => ({ default: m.MenuPreview })));

export function HomePage() {
  const { t } = useTranslation()
  useSEO({})

  const whyItems = [
    { icon: '🌿', title: t.home.fresh, desc: t.home.freshDesc },
    { icon: '🏡', title: t.home.home, desc: t.home.homeDesc },
    { icon: '⚡', title: t.home.quick, desc: t.home.quickDesc },
    { icon: '❤️', title: t.home.love, desc: t.home.loveDesc },
  ]

  return (
    <>
      <HeroSection />

      <Suspense fallback={
        <div className="py-24 flex items-center justify-center bg-[var(--surface-secondary)]">
          <div className="w-6 h-6 rounded-[var(--radius-full)] border-2 border-[var(--accent)] border-t-transparent animate-spin" />
        </div>
      }>
        <MenuPreview />
      </Suspense>

      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3 block">{t.home.whyTitle}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--primary)]">
              {t.home.whyHeading.replace('{name}', appConfig.name)}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: easeOut }}
                whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(92, 64, 51, 0.12)' }}
                style={{ willChange: 'transform' }}
                className="p-7 rounded-[var(--radius-xl)] glass-warm transition-[border-color] duration-300 ease-out hover:border-[rgba(165,120,85,0.30)] cursor-pointer"
              >
                <span className="text-3xl mb-5 block">{item.icon}</span>
                <h3 className="font-display font-semibold text-[var(--primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] glass-warm p-10 sm:p-14">
            <div
              aria-hidden="true"
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
              style={{ background: themeConfig.gradients.blobB }}
            />
            <div
              aria-hidden="true"
              className="absolute -left-20 -top-20 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: themeConfig.gradients.blobA }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--primary)] mb-3">
                  {t.home.ctaHeading}
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
                  {t.home.ctaBody}
                </p>
              </div>
              <div className="flex flex-wrap gap-3.5 justify-center md:justify-start flex-shrink-0">
                <Link to="/menu">
                  <Button variant="primary" size="lg">
                    {t.home.browseMenu}
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" size="lg">
                    {t.home.findUs}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
