import { appConfig } from '@/config/app.config'
import { socialConfig } from '@/config/social.config'
import { useTranslation } from '@/hooks/useTranslation'

function getSocialIcon(id: string) {
  switch (id) {
    case 'instagram':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    case 'facebook':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    default:
      return null
  }
}

export function Footer() {
  const { t } = useTranslation()

  // const quickLinks = [
  //   { to: '/menu', label: t.footer.links.menu },
  //   { to: '/about', label: t.footer.links.about },
  //   { to: '/gallery', label: t.footer.links.gallery },
  //   { to: '/contact', label: t.footer.links.contact },
  // ]

  return (
    <footer
      className="border-t border-[var(--border)]"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-secondary) 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8 md:items-center md:justify-between pb-8 border-b border-[var(--border)]">
          <div className="max-w-xs">
            <p className="font-display text-xl font-semibold text-[var(--primary)] mb-1.5">{appConfig.name}</p>
            <p className="text-sm text-[var(--text-secondary)]">{t.footer.tagline}</p>
          </div>

          {/* <nav aria-label={t.footer.navigate} className="flex flex-wrap items-center gap-1.5">
            {quickLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-2 text-sm font-medium rounded-[var(--radius-full)] transition-all duration-300 whitespace-nowrap select-none',
                    isActive
                      ? 'glass-warm text-[var(--primary)] font-semibold shadow-[var(--shadow-sm)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:-translate-y-px hover:glass-warm-subtle'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav> */}

          <div className="flex gap-2">
            {socialConfig.map(social => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-[var(--radius-full)] glass-warm-subtle flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {getSocialIcon(social.id)}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <p>{t.footer.rights.replace('{year}', String(new Date().getFullYear())).replace('{name}', appConfig.name)}</p>
          <p>{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
