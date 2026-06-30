import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { menuConfig } from '@/config/menu.config'
import { Button } from '@/components/ui/Button'
import { fadeUpVariants, staggerContainer, easeOut } from '@/lib/motion'
import { useTranslation } from '@/hooks/useTranslation'
import { themeConfig } from '@/config/theme.config'

export function HeroSection() {
  const { t } = useTranslation()

  const popularCount = useMemo(
    () => menuConfig.categories.flatMap(c => c.items).filter(i => i.isPopular).length,
    []
  )

  const stats = useMemo(() => [
    { value: '50+', label: t.hero.statDishes },
    { value: '6+', label: t.hero.statYears },
    { value: '100%', label: t.hero.statHomemade },
  ], [t.hero])

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: themeConfig.gradients.heroBg }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[70vw] h-[70vw] max-w-2xl max-h-2xl rounded-[var(--radius-full)]"
          style={{ background: themeConfig.gradients.blobA }} />
        <div className="absolute -bottom-24 -left-24 w-[55vw] h-[55vw] max-w-xl max-h-xl rounded-[var(--radius-full)]"
          style={{ background: themeConfig.gradients.blobB }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-3xl max-h-3xl rounded-[var(--radius-full)] opacity-25"
          style={{ background: themeConfig.gradients.blobC }} />
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 80 Q360 20 720 50 Q1080 80 1440 30 L1440 80 Z" fill="var(--surface-secondary)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.span
              variants={fadeUpVariants}
              transition={{ duration: 0.55, ease: easeOut }}
              className="inline-flex items-center gap-2.5 text-[var(--accent)] text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <span className="w-6 h-px bg-[var(--accent)]" aria-hidden="true" />
              {t.hero.tagline}
              <span className="w-6 h-px bg-[var(--accent)]" aria-hidden="true" />
            </motion.span>

            <motion.h1
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: easeOut }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[var(--primary)] leading-[1.08] mb-6"
            >
              {t.hero.heading1}
              <span className="block italic text-[var(--accent)]">{t.hero.heading2}</span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: easeOut }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10 max-w-md"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: easeOut }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Link to="/menu"><Button variant="primary" size="lg">{t.hero.exploreMenu} →</Button></Link>
              <Link to="/about"><Button variant="ghost" size="lg">{t.hero.ourStory}</Button></Link>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              transition={{ duration: 0.6, ease: easeOut }}
              className="flex gap-8 pt-8 border-t border-[var(--border)]"
            >
              {stats.map(stat => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold text-[var(--primary)]">{stat.value}</p>
                  <p className="text-[var(--muted)] text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
              {popularCount > 0 && (
                <div>
                  <p className="font-display text-2xl font-semibold text-[var(--primary)]">{popularCount}</p>
                  <p className="text-[var(--muted)] text-xs mt-0.5">{t.hero.statPopular}</p>
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-[var(--radius-full)]"
                style={{ background: themeConfig.gradients.blobC }} />
              <div className="absolute inset-6 rounded-[var(--radius-full)] glass-warm flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-5xl font-semibold text-[var(--primary)] mb-1">₹30</p>
                  <p className="text-[var(--text-secondary)] text-sm">{t.hero.startingFrom}</p>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none animate-spin-slow">
                <div className="absolute -top-4 -right-4 pointer-events-auto animate-spin-slow-reverse">
                  <motion.div
                    className="w-16 h-16 rounded-[var(--radius-full)] glass-warm flex items-center justify-center text-2xl cursor-pointer"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ☕
                  </motion.div>
                </div>

                <div className="absolute -bottom-4 -left-4 pointer-events-auto animate-spin-slow-reverse">
                  <motion.div
                    className="w-14 h-14 rounded-[var(--radius-full)] glass-warm flex items-center justify-center text-xl cursor-pointer"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🌿
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[var(--muted-light)] text-[10px] uppercase tracking-widest">{t.hero.scrollLabel}</span>
          <div className="w-px h-6 bg-gradient-to-b from-[var(--latte)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
