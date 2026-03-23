import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ensureProfileForUser } from '@/lib/profiles/queries'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await ensureProfileForUser(supabase, user.id)
    }
  }

  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}