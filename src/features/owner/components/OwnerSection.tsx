import { motion } from 'framer-motion'
import { ownerConfig } from '@/config/owner.config'
import { LazyImage } from '@/components/ui/LazyImage'
import { easeOut, slideLeftVariants, slideRightVariants } from '@/lib/motion'
import { useTranslation } from '@/hooks/useTranslation'
import { themeConfig } from '@/config/theme.config'

export function OwnerSection() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="owner-heading" className="py-20 bg-[var(--surface-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={slideLeftVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4 block">
              {t.owner.label}
            </span>
            <h2 id="owner-heading" className="font-display text-3xl sm:text-4xl font-semibold text-[var(--primary)] mb-5 leading-tight">
              {t.owner.heading}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">{ownerConfig.bio}</p>
            <div className="flex items-center gap-6 pt-6 border-t border-[var(--border)]">
              <div>
                <p className="font-display text-lg font-semibold text-[var(--primary)]">{ownerConfig.name}</p>
                <p className="text-[var(--accent)] text-sm">{ownerConfig.role}</p>
              </div>
              <div className="h-10 w-px bg-[var(--border)]" />
              <div>
                <p className="font-display text-2xl font-semibold text-[var(--primary)]">{ownerConfig.since}</p>
                <p className="text-[var(--muted)] text-xs">{t.owner.founded}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideRightVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[var(--radius-2xl)]"
              style={{ background: themeConfig.gradients.ownerGlow }}
            />
            <div className="relative aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)]">
              <LazyImage
                src={`/images/${ownerConfig.image}`}
                alt={ownerConfig.name}
                containerClassName="w-full h-full"
                className="hover:scale-105 transition-transform duration-[var(--transition-slower)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
