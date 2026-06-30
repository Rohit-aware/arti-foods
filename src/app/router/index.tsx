import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { RootLayout } from '@/app/layouts/RootLayout'
import { GlobalErrorBoundary } from '@/components/ui/GlobalErrorBoundary'

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const MenuPage = lazy(() => import('@/pages/MenuPage').then(m => ({ default: m.MenuPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60dvh]">
      <span className="text-[var(--color-muted)] text-sm animate-pulse">Loading…</span>
    </div>
  )
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    ErrorBoundary: GlobalErrorBoundary,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'menu', element: withSuspense(MenuPage) },
      { path: 'about', element: withSuspense(AboutPage) },
      { path: 'gallery', element: withSuspense(GalleryPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
    ],
  },
])
