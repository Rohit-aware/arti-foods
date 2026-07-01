import { Outlet } from 'react-router-dom'
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
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--bg-primary)]">
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <main className="flex-1">
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </div>
  )
}
