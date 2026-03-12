import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '../components/logout-button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>PMPilot kullanıcı paneli</p>

	<LogoutButton />

      <hr style={{ margin: '24px 0' }} />

      <p><strong>User ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  )
}