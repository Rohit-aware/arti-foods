import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { appConfig } from '@/config/app.config'
import { useTranslation } from '@/hooks/useTranslation'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/menu',    label: t.nav.menu },
    { to: '/about',   label: t.nav.about },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/contact', label: t.nav.contact },
  ] as const

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-[var(--z-nav)] transition-all duration-300',
        (scrolled || menuOpen)
          ? 'bg-[var(--bg-primary)] border-b border-[rgba(165,120,85,0.12)] shadow-[0_4px_24px_rgba(92,64,51,0.06)]'
          : 'glass-navbar'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl font-semibold text-[var(--primary)] tracking-tight hover:text-[var(--accent)] transition-colors duration-300"
        >
          {appConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'relative px-4 py-2 text-sm font-medium rounded-[var(--radius-full)] transition-all duration-300',
                  isActive
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:-translate-y-px'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 glass-warm rounded-[var(--radius-full)] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <LocaleSwitcher className="ml-2" />
          <Link
            to="/menu"
            className="ml-3 px-5 py-2 text-sm font-semibold glass-warm-accent text-[var(--accent)] rounded-[var(--radius-full)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            {t.nav.orderNow}
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <LocaleSwitcher />
          <button
            className="p-2 rounded-[var(--radius-md)] text-[var(--primary)] glass-warm-subtle transition-all duration-300 active:scale-95"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          {/* Backdrop overlay to block page content bleed-through */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-16 bg-[var(--bg-primary)]/95 backdrop-blur-md md:hidden"
            style={{ zIndex: 'calc(var(--z-nav) - 1)' }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[var(--bg-primary)] border-t border-[rgba(165,120,85,0.12)] px-4 pb-4 pt-2 flex flex-col gap-1 shadow-lg relative"
            style={{ zIndex: 'var(--z-nav)' }}
          >
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-3 text-sm font-medium rounded-[var(--radius-lg)] transition-all duration-300',
                    isActive
                      ? 'glass-warm text-[var(--primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:glass-warm-subtle'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="mt-1 px-4 py-3 text-sm font-semibold glass-warm-accent text-[var(--accent)] rounded-[var(--radius-lg)] text-center transition-all duration-300 active:scale-[0.97]"
            >
              {t.nav.orderNow}
            </Link>
          </motion.div>
        </>
      )}
    </header>
  )
}
