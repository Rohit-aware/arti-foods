import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60dvh]">
      <span className="text-[var(--color-muted)] text-sm animate-pulse">Loading…</span>
    </div>
  )
}

export function RootLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--bg-primary)]">
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Suspense key={pathname} fallback={<PageLoader />}>
          <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
