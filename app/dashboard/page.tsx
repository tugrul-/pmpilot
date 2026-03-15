import Link from 'next/link'
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
    <main className="page dashboard-page">
      <header className="header dashboard-header">
        <Link href="/" className="logo">
          PMPilot
        </Link>

        <div className="dashboard-header-right">
          <div className="dashboard-user">
            <span className="dashboard-user-label">Signed in as</span>
            <span className="dashboard-user-email">{user.email}</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Workspace overview</p>
          <h1 className="dashboard-title">Keep your projects on track</h1>
          <p className="dashboard-subtitle">
            This is your starting point for organizing projects, tracking
            delivery, and keeping everyone aligned. We&apos;ll grow this
            workspace together.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card dashboard-card-primary">
          <h2>Next steps</h2>
          <p>
            Soon you&apos;ll see your active projects and key milestones here.
            For now, you can use this space to explore the app and verify your
            account setup.
          </p>

          <ul className="dashboard-list">
            <li>Confirm you can sign in and sign out</li>
            <li>Verify your email via the signup link</li>
            <li>Invite teammates when we add collaboration features</li>
          </ul>
        </article>

        <article className="dashboard-card">
          <h3>Account details</h3>
          <dl className="dashboard-meta">
            <div className="dashboard-meta-row">
              <dt>User ID</dt>
              <dd>{user.id}</dd>
            </div>
            <div className="dashboard-meta-row">
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
        </article>

        <article className="dashboard-card">
          <h3>Coming soon</h3>
          <p className="dashboard-coming">
            We&apos;ll extend this dashboard with:
          </p>
          <ul className="dashboard-list">
            <li>Project portfolio overview</li>
            <li>Key milestones and risks</li>
            <li>Delivery and capacity insights</li>
          </ul>
        </article>
      </section>
    </main>
  )
}