import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getProjectsForCurrentUser } from '@/lib/projects/queries'
import LogoutButton from '../components/logout-button'

async function createProject(formData: FormData) {
  'use server'

  const name = String(formData.get('name') || '').trim()
  const status = (formData.get('status') as string) || 'planned'

  if (!name) {
    return
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase.from('projects').insert({
    owner_id: user.id,
    name,
    status,
  })

  if (error) {
    console.error('Error creating project', error)
  }

  revalidatePath('/dashboard')
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const projects = await getProjectsForCurrentUser(supabase)

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

          <form className="dashboard-form" action={createProject}>
            <div className="dashboard-form-row">
              <input
                className="dashboard-input"
                type="text"
                name="name"
                placeholder="New project name"
                required
              />

              <select
                className="dashboard-select"
                name="status"
                defaultValue="planned"
              >
                <option value="planned">Planned</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <button className="btn btn-primary dashboard-form-submit" type="submit">
              Add project
            </button>
          </form>
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
          <h3>My projects</h3>

          {projects.length === 0 ? (
            <p className="dashboard-coming">
              You don&apos;t have any projects yet. We&apos;ll add creation and
              management tools here next.
            </p>
          ) : (
            <ul className="dashboard-list">
              {projects.map((project) => (
                <li key={project.id}>
                  <strong>{project.name}</strong>{' '}
                  <span style={{ color: '#6b7280', fontSize: 12 }}>
                    ({project.status})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </main>
  )
}