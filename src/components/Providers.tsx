'use client'

import { ReactQueryProvider } from './ReactQueryProvider'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import type { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionContextProvider>
  )
}
