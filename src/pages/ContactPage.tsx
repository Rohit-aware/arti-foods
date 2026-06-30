import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { appConfig } from '@/config/app.config'
import { socialConfig } from '@/config/social.config'
import { hoursConfig } from '@/config/hours.config'
import { featuresConfig } from '@/config/features.config'
import { useSEO } from '@/hooks/useSEO'
import { easeOut } from '@/lib/motion'
import { useTranslation } from '@/hooks/useTranslation'
import { themeConfig } from '@/config/theme.config'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

interface ContactCardProps {
  title: string
  icon: ReactNode
  children: ReactNode
  delay: number
}

function ContactCard({ title, icon, children, delay }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: easeOut }}
      className="bg-[var(--surface)] rounded-[var(--radius-xl)] p-8 border border-[var(--border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)] transition-shadow duration-[var(--transition-slow)]"
    >
      <div className="w-10 h-10 rounded-[var(--radius-full)] bg-[var(--accent-warm)] flex items-center justify-center mb-5">
        {icon}
      </div>
      <h2 className="font-display font-semibold text-[var(--primary)] mb-4">{title}</h2>
      {children}
    </motion.div>
  )
}

export function ContactPage() {
  const { t } = useTranslation()
  useSEO({ title: t.contact.heading, description: `Visit or reach ${appConfig.name}.` })
  const today = DAYS[new Date().getDay()]

  return (
    <div className="pt-16 bg-[var(--bg-primary)] min-h-screen">
      <div className="py-16" style={{ background: themeConfig.gradients.warmHeader }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4 block">{t.contact.label}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--primary)]">{t.contact.heading}</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ContactCard
            title={t.contact.touchTitle}
            delay={0}
            icon={
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
          >
            <div className="flex flex-col gap-3">
              <a href={`tel:${appConfig.phone}`} className="text-[var(--accent)] font-medium hover:text-[var(--accent-hover)] transition-colors duration-[var(--transition-base)]">{appConfig.phone}</a>
              <a href={`mailto:${appConfig.email}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors duration-[var(--transition-base)] break-all">{appConfig.email}</a>
              <p className="text-sm text-[var(--text-secondary)]">{appConfig.address}</p>
              <a href={appConfig.mapDirectionsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--accent)] text-sm font-medium hover:gap-2.5 transition-all duration-[var(--transition-base)] mt-1">
                {t.contact.directions}
              </a>
            </div>
          </ContactCard>

          <ContactCard
            title={t.contact.hoursTitle}
            delay={0.08}
            icon={
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <div className="flex flex-col gap-2.5">
              {hoursConfig.map(entry => {
                const isToday = entry.day === today
                return (
                  <div key={entry.day} className={`flex items-center justify-between text-sm gap-3 pb-2.5 border-b border-[var(--border)] last:border-0 last:pb-0 ${isToday ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-secondary)]'}`}>
                    <span className="flex items-center gap-2">
                      {isToday && <span className="w-1.5 h-1.5 rounded-[var(--radius-full)] bg-[var(--accent)] flex-shrink-0" aria-hidden="true" />}
                      {entry.day}{isToday ? ` (${t.contact.today})` : ''}
                    </span>
                    <span className="tabular-nums text-xs">
                      {entry.isOpen ? `${formatTime(entry.open)} – ${formatTime(entry.close)}` : t.contact.closed}
                    </span>
                  </div>
                )
              })}
            </div>
          </ContactCard>

          <ContactCard
            title={t.contact.followTitle}
            delay={0.16}
            icon={
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            }
          >
            <div className="flex flex-col gap-3">
              {socialConfig.map(social => (
                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-[var(--bg-primary)] border border-[var(--border)] hover:bg-[var(--surface-secondary)] hover:border-[var(--accent)] transition-all duration-[var(--transition-base)] group">
                  <span className="font-medium text-sm text-[var(--primary)]">{social.label}</span>
                  <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-[var(--transition-base)]">{social.handle}</span>
                </a>
              ))}
            </div>
          </ContactCard>
        </div>

        {featuresConfig.googleMap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mt-6 rounded-[var(--radius-xl)] overflow-hidden border border-[var(--border)] shadow-[var(--shadow-md)]"
            style={{ height: '400px' }}
          >
            <iframe
              title={t.contact.mapTitle}
              src={appConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 grayscale hover:grayscale-0 transition-all duration-[var(--transition-slower)]"
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
