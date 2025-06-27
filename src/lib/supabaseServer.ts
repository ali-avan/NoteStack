// lib/supabaseServer.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export function createSupabaseServerClient() {
  const cookieStore = cookies()

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })

  return supabase
}
