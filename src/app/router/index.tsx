import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import { RootLayout } from '@/app/layouts/RootLayout'
import { GlobalErrorBoundary } from '@/components/ui/GlobalErrorBoundary'

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const MenuPage = lazy(() => import('@/pages/MenuPage').then(m => ({ default: m.MenuPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    ErrorBoundary: GlobalErrorBoundary,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
])
