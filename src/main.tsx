import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MotionProvider } from '@/app/providers/MotionProvider'
import { I18nProvider } from '@/app/providers/I18nProvider'
import { router } from '@/app/router'
import '@/styles/globals.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

createRoot(rootEl).render(
  <StrictMode>
    <I18nProvider>
      <MotionProvider>
        <RouterProvider router={router} />
      </MotionProvider>
    </I18nProvider>
  </StrictMode>
)
