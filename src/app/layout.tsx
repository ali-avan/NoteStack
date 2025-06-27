// app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'
import Providers from '@/components/Providers'
export const metadata = {
  title: 'My Supabase Notes App',
  description: 'Create, edit, and manage notes securely with Supabase.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
