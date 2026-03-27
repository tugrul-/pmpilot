import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '../../../../components/logout-button'

function toDateInput(value: string | null): string {
  if (!value) return ''
  return value.split('T')[0]
}

async function updateProject(formData: FormData) {
  'use server'

  const projectId = String(formData.get('projectId') || '').trim()
  const name = String(formData.get('name') || '').trim()
  const status = (formData.get('status') as string) || 'planned'
  const organization = String(formData.get('organization') || '').trim() || null
  const baseline_start = (formData.get('baseline_start') as string) || null
  const baseline_end = (formData.get('baseline_end') as string) || null

  if (!name || !projectId) return

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { error } = await supabase
    .from('projects')
    .update({
      name,
      status,
      organization,
      baseline_start: baseline_start || null,
      baseline_end: baseline_end || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId)
    .eq('owner_id', user.id)

  if (error) {
    console.error('Error updating project', error)
    return
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

type EditProjectPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: project } = await supabase
    .from('projects')
    .select('id, name, status, organization, baseline_start, baseline_end')
    .eq('id', id)
    .eq('owner_id', user.id)
    .single()

  if (!project) notFound()

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
          <p className="eyebrow">Project Settings</p>
          <h1 className="dashboard-title">Edit Project</h1>
          <p className="dashboard-subtitle">Update the details for this project.</p>
        </div>
      </section>

      <section className="project-form-card">
        <div className="edit-page-nav">
          <Link href="/dashboard" className="btn btn-secondary project-back-btn">
            ← Back to Dashboard
          </Link>
        </div>

        <form action={updateProject} className="project-form" style={{ marginTop: '20px' }}>
          <input type="hidden" name="projectId" value={project.id} />
          <div className="project-form-grid">
            <div className="project-form-field project-form-field-wide">
              <label className="project-form-label">Project Name *</label>
              <input
                className="dashboard-input"
                type="text"
                name="name"
                defaultValue={project.name}
                required
              />
            </div>
            <div className="project-form-field project-form-field-wide">
              <label className="project-form-label">Organization</label>
              <input
                className="dashboard-input"
                type="text"
                name="organization"
                defaultValue={project.organization ?? ''}
                placeholder="e.g. Acme Corp"
              />
            </div>
            <div className="project-form-field">
              <label className="project-form-label">Status</label>
              <select
                className="dashboard-input project-form-select"
                name="status"
                defaultValue={project.status}
              >
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="project-form-field">
              <label className="project-form-label">Baseline Start</label>
              <input
                className="dashboard-input"
                type="date"
                name="baseline_start"
                defaultValue={toDateInput(project.baseline_start)}
              />
            </div>
            <div className="project-form-field">
              <label className="project-form-label">Baseline End</label>
              <input
                className="dashboard-input"
                type="date"
                name="baseline_end"
                defaultValue={toDateInput(project.baseline_end)}
              />
            </div>
          </div>
          <div className="project-form-actions">
            <button className="btn btn-primary project-form-submit" type="submit">
              Save Changes
            </button>
            <Link href="/dashboard" className="btn btn-secondary project-form-submit">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}
