import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getProjectsForCurrentUser } from '@/lib/projects/queries'
import { ensureProfileForUser } from '@/lib/profiles/queries'
import { DOCUMENT_TYPES } from '@/lib/documents/queries'
import LogoutButton from '../components/logout-button'
import DeleteProjectButton from '../components/delete-project-button'

const DOC_TYPE_SHORT: Record<string, string> = {
  project_charter: 'Charter',
  project_plan: 'Plan',
  project_stakeholder_list: 'Stakeholders',
  project_risks: 'Risks',
  project_budget: 'Budget',
  project_organization_chart: 'Org Chart',
}

function getStatusLabel(status: string) {
  if (status === 'in_progress') return 'In Progress'
  if (status === 'done') return 'Done'
  return 'Planned'
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

async function deleteProject(formData: FormData) {
  'use server'

  const projectId = String(formData.get('projectId') || '').trim()
  if (!projectId) return

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Delete documents from storage first
  const { data: docs } = await supabase
    .from('project_documents')
    .select('storage_path')
    .eq('project_id', projectId)
    .eq('owner_id', user.id)

  if (docs && docs.length > 0) {
    await supabase.storage
      .from('project-documents')
      .remove(docs.map((d) => d.storage_path))
  }

  // Delete project (DB cascade removes document records)
  await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('owner_id', user.id)

  revalidatePath('/dashboard')
}

async function createProject(formData: FormData) {
  'use server'

  const name = String(formData.get('name') || '').trim()
  const status = (formData.get('status') as string) || 'planned'
  const organization = String(formData.get('organization') || '').trim() || null
  const baseline_start = (formData.get('baseline_start') as string) || null
  const baseline_end = (formData.get('baseline_end') as string) || null

  if (!name) return

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

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
    organization,
    baseline_start: baseline_start || null,
    baseline_end: baseline_end || null,
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

  if (!user) redirect('/login')

  const profile = await ensureProfileForUser(supabase, user.id)
  const projects = await getProjectsForCurrentUser(supabase)
  const projectLimit = profile?.project_limit ?? 3
  const projectCount = projects.length
  const isLimitReached = projectCount >= projectLimit
  const resolvedSearchParams = (await searchParams) ?? {}
  const isLimitError = resolvedSearchParams.error === 'project_limit'

  // Fetch document counts per project per type
  const projectIds = projects.map((p) => p.id)
  const docCountMap: Record<string, Record<string, number>> = {}

  if (projectIds.length > 0) {
    const { data: docData } = await supabase
      .from('project_documents')
      .select('project_id, document_type')
      .in('project_id', projectIds)

    if (docData) {
      for (const doc of docData) {
        if (!docCountMap[doc.project_id]) docCountMap[doc.project_id] = {}
        docCountMap[doc.project_id][doc.document_type] =
          (docCountMap[doc.project_id][doc.document_type] ?? 0) + 1
      }
    }
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
          <div className="dashboard-plan-row">
            <p className="dashboard-plan">
              Plan: <strong>{profile?.plan ?? 'free'}</strong> — Projects:{' '}
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

      {/* New project form */}
      <section className="project-form-card">
        <h2 className="project-form-title">New Project</h2>
        <form action={createProject} className="project-form">
          <div className="project-form-grid">
            <div className="project-form-field project-form-field-wide">
              <label className="project-form-label">Project Name *</label>
              <input
                className="dashboard-input"
                type="text"
                name="name"
                placeholder="e.g. Website Redesign"
                required
              />
            </div>
            <div className="project-form-field project-form-field-wide">
              <label className="project-form-label">Organization</label>
              <input
                className="dashboard-input"
                type="text"
                name="organization"
                placeholder="e.g. Acme Corp"
              />
            </div>
            <div className="project-form-field">
              <label className="project-form-label">Status</label>
              <select className="dashboard-input project-form-select" name="status" defaultValue="planned">
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="project-form-field">
              <label className="project-form-label">Baseline Start</label>
              <input className="dashboard-input" type="date" name="baseline_start" />
            </div>
            <div className="project-form-field">
              <label className="project-form-label">Baseline End</label>
              <input className="dashboard-input" type="date" name="baseline_end" />
            </div>
          </div>
          <div className="project-form-actions">
            <button
              className="btn btn-primary project-form-submit"
              type="submit"
              disabled={isLimitReached}
            >
              Add Project
            </button>
            {isLimitReached && (
              <p className="dashboard-error" style={{ margin: 0 }}>
                Project limit reached.{' '}
                <Link href="/billing" className="dashboard-upgrade-link">
                  Upgrade your plan
                </Link>
              </p>
            )}
          </div>
        </form>
      </section>

      {/* Projects table */}
      <section className="projects-table-section">
        <div className="projects-table-header">
          <h2 className="projects-table-title">Projects</h2>
          <span className="projects-table-count">
            {projectCount} project{projectCount !== 1 ? 's' : ''}
          </span>
        </div>

        {projects.length === 0 ? (
          <p className="projects-table-empty">
            No projects yet. Create your first project above.
          </p>
        ) : (
          <div className="projects-table-wrapper">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Organization</th>
                  <th>Status</th>
                  <th>Baseline Start</th>
                  <th>Baseline End</th>
                  <th>Registered</th>
                  <th>Documents</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  const docs = docCountMap[project.id] ?? {}
                  const totalDocs = Object.values(docs).reduce((a, b) => a + b, 0)
                  return (
                    <tr key={project.id} className="projects-table-row">
                      <td>
                        <Link
                          href={`/dashboard/projects/${project.id}`}
                          className="projects-table-name"
                        >
                          {project.name}
                        </Link>
                      </td>
                      <td className="projects-table-cell">
                        {project.organization ?? '—'}
                      </td>
                      <td>
                        <span
                          className={`dashboard-status dashboard-status-${project.status}`}
                        >
                          {getStatusLabel(project.status)}
                        </span>
                      </td>
                      <td className="projects-table-cell">
                        {formatDate(project.baseline_start)}
                      </td>
                      <td className="projects-table-cell">
                        {formatDate(project.baseline_end)}
                      </td>
                      <td className="projects-table-cell">
                        {formatDate(project.created_at)}
                      </td>
                      <td>
                        {totalDocs === 0 ? (
                          <span className="projects-table-nodocs">—</span>
                        ) : (
                          <div className="doc-type-chips">
                            {DOCUMENT_TYPES.map((dt) => {
                              const count = docs[dt.value]
                              if (!count) return null
                              return (
                                <span
                                  key={dt.value}
                                  className="doc-type-chip"
                                  title={dt.label}
                                >
                                  {DOC_TYPE_SHORT[dt.value] ?? dt.label}: {count}
                                </span>
                              )
                            })}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="project-actions">
                          <div className="project-actions-top">
                            <div className="project-actions-mgmt">
                              <Link
                                href={`/dashboard/projects/${project.id}/edit`}
                                className="project-action-btn project-action-edit"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                              </Link>
                              <form action={deleteProject}>
                                <input type="hidden" name="projectId" value={project.id} />
                                <DeleteProjectButton className="project-action-btn project-action-delete" />
                              </form>
                            </div>
                            <span className="project-action-hint" />
                          </div>
                          <div className="project-actions-row">
                            <Link
                              href={`/dashboard/projects/${project.id}/risks`}
                              className="project-action-btn project-action-feature project-action-risks"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                              </svg>
                            </Link>
                            <Link
                              href={`/dashboard/projects/${project.id}/budget`}
                              className="project-action-btn project-action-feature project-action-budget"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"/>
                                <line x1="12" y1="20" x2="12" y2="4"/>
                                <line x1="6" y1="20" x2="6" y2="14"/>
                                <line x1="2" y1="20" x2="22" y2="20"/>
                              </svg>
                            </Link>
                            <Link
                              href={`/dashboard/projects/${project.id}/stakeholders`}
                              className="project-action-btn project-action-feature project-action-stakeholders"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                              </svg>
                            </Link>
                            <Link
                              href={`/dashboard/projects/${project.id}/kickoff`}
                              className="project-action-btn project-action-feature project-action-kickoff"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                                <line x1="4" y1="22" x2="4" y2="15"/>
                              </svg>
                            </Link>
                            <Link
                              href={`/dashboard/projects/${project.id}/closing`}
                              className="project-action-btn project-action-feature project-action-closing"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                              </svg>
                            </Link>
                            <Link
                              href={`/dashboard/projects/${project.id}/notifications`}
                              className="project-action-btn project-action-feature project-action-notifications"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
