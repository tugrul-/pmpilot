import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getProjectsForCurrentUser } from '@/lib/projects/queries'
import { ensureProfileForUser } from '@/lib/profiles/queries'
import LogoutButton from '../components/logout-button'

function getStatusLabel(status: string) {
  if (status === 'in_progress') {
    return 'In progress'
  }
  if (status === 'done') {
    return 'Done'
  }
  return 'Planned'
}

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

  const profile = await ensureProfileForUser(supabase, user.id)
  const projectLimit = profile?.project_limit ?? 3

  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', user.id)

  if ((projectCount ?? 0) >= projectLimit) {
    redirect('/dashboard?error=project_limit')
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

type DashboardPageProps = {
  searchParams?: Promise<{
    error?: string
  }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await ensureProfileForUser(supabase, user.id)
  const projects = await getProjectsForCurrentUser(supabase)
  const projectLimit = profile?.project_limit ?? 3
  const projectCount = projects.length
  const isLimitReached = projectCount >= projectLimit
  const resolvedSearchParams = (await searchParams) ?? {}
  const isLimitError = resolvedSearchParams.error === 'project_limit'

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
          <div className="dashboard-plan-row">
            <p className="dashboard-plan">
              Plan: <strong>{profile?.plan ?? 'free'}</strong> - Projects used:{' '}
              <strong>
                {projectCount}/{projectLimit}
              </strong>
            </p>
            {isLimitReached && (
              <Link href="/billing" className="dashboard-upgrade-link">
                Upgrade plan
              </Link>
            )}
          </div>
          {isLimitError && (
            <p className="dashboard-error">
              Project limit reached for your current plan.
            </p>
          )}
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

            <button
              className="btn btn-primary dashboard-form-submit"
              type="submit"
              disabled={isLimitReached}
            >
              Add project
            </button>
            {isLimitReached && (
              <p className="dashboard-coming">
                You reached your project limit. Upgrade flow will be added next.
              </p>
            )}
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
                  <Link href={`/dashboard/projects/${project.id}`} className="project-link">
                    <strong>{project.name}</strong>{' '}
                    <span className={`dashboard-status dashboard-status-${project.status}`}>
                      {getStatusLabel(project.status)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </main>
  )
}