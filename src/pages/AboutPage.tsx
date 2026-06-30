import { motion } from 'framer-motion'
import { appConfig } from '@/config/app.config'
import { featuresConfig } from '@/config/features.config'
import { OwnerSection } from '@/features/owner'
import { useSEO } from '@/hooks/useSEO'
import { easeOut } from '@/lib/motion'
import { useTranslation } from '@/hooks/useTranslation'
import { themeConfig } from '@/config/theme.config'

const STATS = [
  { value: '6+',    key: 'statsYears' as const },
  { value: '50+',   key: 'statsDishes' as const },
  { value: '1000+', key: 'statsCustomers' as const },
  { value: '100%',  key: 'statsFresh' as const },
]

export function AboutPage() {
  const { t } = useTranslation()
  useSEO({ title: t.about.label, description: `The story behind ${appConfig.name}.` })

  return (
    <div className="pt-16 bg-[var(--bg-primary)]">
      <section className="py-20 bg-[var(--bg-primary)] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: themeConfig.gradients.aboutHero }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-5 block"
            >
              {t.about.label}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
              className="font-display text-5xl sm:text-6xl font-semibold text-[var(--primary)] leading-tight mb-7"
            >
              {t.about.heading1}
              <span className="block italic text-[var(--accent)]">{t.about.heading2}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              className="text-[var(--text-secondary)] text-xl leading-relaxed"
            >
              {appConfig.description}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: easeOut }}
                className="text-center p-7 rounded-[var(--radius-xl)] bg-[var(--bg-primary)] border border-[var(--border)] shadow-[var(--shadow-card)]"
              >
                <p className="font-display text-4xl font-semibold text-[var(--accent)] mb-1">{stat.value}</p>
                <p className="text-sm text-[var(--text-secondary)]">{t.about[stat.key]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mb-14"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3 block">{t.about.timelineLabel}</span>
            <h2 className="font-display text-3xl font-semibold text-[var(--primary)]">{t.about.timelineHeading}</h2>
          </motion.div>

          <div className="relative">
            <div aria-hidden="true" className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-px" />
            <div className="flex flex-col gap-10">
              {t.about.milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: 0.1, duration: 0.55, ease: easeOut }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div className={`sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-14 sm:text-right' : 'sm:pl-14'} pl-10 sm:pl-0`}>
                    <div className="bg-[var(--surface)] p-6 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)] transition-shadow duration-[var(--transition-slow)]">
                      <p className="text-[var(--accent)] font-semibold text-sm mb-1">{m.year}</p>
                      <h3 className="font-display font-semibold text-[var(--primary)] mb-2">{m.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute left-0 sm:left-1/2 top-6 w-4 h-4 rounded-[var(--radius-full)] bg-[var(--accent)] border-4 border-[var(--bg-primary)] sm:-translate-x-1/2 shadow-[var(--shadow-accent)]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featuresConfig.ownerSection && <OwnerSection />}
    </div>
  )
}
