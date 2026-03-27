import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getDocumentsForProject, getSignedUrl, getDocumentTypeLabel, DOCUMENT_TYPES } from '@/lib/documents/queries'
import LogoutButton from '../../../components/logout-button'

async function uploadDocument(formData: FormData) {
  'use server'

  const file = formData.get('file') as File
  const projectId = formData.get('projectId') as string
  const documentType = formData.get('documentType') as string

  if (!file || file.size === 0 || !documentType) return

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const storagePath = `${user.id}/${projectId}/${Date.now()}_${file.name}`
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error: uploadError } = await supabase.storage
    .from('project-documents')
    .upload(storagePath, buffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    })

  if (uploadError) {
    console.error('Error uploading file', uploadError)
    return
  }

  const { error: dbError } = await supabase.from('project_documents').insert({
    project_id: projectId,
    owner_id: user.id,
    name: file.name,
    storage_path: storagePath,
    size: file.size,
    mime_type: file.type || 'application/octet-stream',
    document_type: documentType,
  })

  if (dbError) console.error('Error saving document record', dbError)

  revalidatePath(`/dashboard/projects/${projectId}`)
}

async function removeDocument(formData: FormData) {
  'use server'

  const documentId = formData.get('documentId') as string
  const storagePath = formData.get('storagePath') as string
  const projectId = formData.get('projectId') as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase.storage.from('project-documents').remove([storagePath])
  await supabase.from('project_documents').delete().eq('id', documentId).eq('owner_id', user.id)

  revalidatePath(`/dashboard/projects/${projectId}`)
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getStatusLabel(status: string) {
  if (status === 'in_progress') return 'In Progress'
  if (status === 'done') return 'Done'
  return 'Planned'
}

const PROJECT_FEATURES = [
  {
    slug: 'risks',
    name: 'Risk Analysis',
    description: 'Identify and assess project risks with AI-powered mitigation suggestions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    slug: 'budget',
    name: 'Budget Analysis',
    description: 'Track financials, monitor actuals vs. baseline and forecast deviations.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  {
    slug: 'stakeholders',
    name: 'Stakeholder Map',
    description: 'Visualize stakeholder influence, interests, and engagement strategies.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    slug: 'kickoff',
    name: 'Kickoff Presentation',
    description: 'Auto-generate a professional project kickoff deck from your project data.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
  },
  {
    slug: 'closing',
    name: 'Closing Presentation',
    description: 'Create a polished closure report and lessons-learned presentation automatically.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    slug: 'notifications',
    name: 'Notifications',
    description: 'Set up automated alerts for deadlines, status changes, and team activity.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
]

type ProjectPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: project } = await supabase
    .from('projects')
    .select('id, name, status, organization, baseline_start, baseline_end, created_at')
    .eq('id', id)
    .eq('owner_id', user.id)
    .single()

  if (!project) redirect('/dashboard')

  const documents = await getDocumentsForProject(supabase, id)

  const documentsWithUrls = await Promise.all(
    documents.map(async (doc) => ({
      ...doc,
      signedUrl: await getSignedUrl(supabase, doc.storage_path),
    }))
  )

  return (
    <main className="page dashboard-page">
      <header className="header dashboard-header">
        <Link href="/" className="logo">PMPilot</Link>
        <div className="dashboard-header-right">
          <Link href="/dashboard" className="btn btn-secondary project-back-btn">← Dashboard</Link>
          <LogoutButton />
        </div>
      </header>

      {/* Project hero */}
      <section className="dashboard-hero">
        <p className="eyebrow">Project</p>
        <h1 className="dashboard-title">{project.name}</h1>
        <div className="project-detail-meta">
          <span className={`dashboard-status dashboard-status-${project.status}`}>
            {getStatusLabel(project.status)}
          </span>
          {project.organization && (
            <span className="project-detail-meta-item">{project.organization}</span>
          )}
          {(project.baseline_start || project.baseline_end) && (
            <span className="project-detail-meta-item">
              {formatDate(project.baseline_start)} → {formatDate(project.baseline_end)}
            </span>
          )}
          <Link
            href={`/dashboard/projects/${id}/edit`}
            className="project-detail-edit-link"
          >
            Edit project
          </Link>
        </div>
      </section>

      {/* Feature tools grid */}
      <section className="project-tools-section">
        <h2 className="project-tools-title">Project Tools</h2>
        <div className="project-tools-grid">
          {PROJECT_FEATURES.map((feature) => (
            <Link
              key={feature.slug}
              href={`/dashboard/projects/${id}/${feature.slug}`}
              className="project-tool-card"
            >
              <div className="project-tool-card-top">
                <div className="project-tool-icon">{feature.icon}</div>
                <div className="project-tool-lock" title="Upgrade to unlock">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
              <h3 className="project-tool-name">{feature.name}</h3>
              <p className="project-tool-description">{feature.description}</p>
              <span className="project-tool-cta">Open →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section className="project-documents-section">
        <div className="project-documents-header">
          <h2 className="project-documents-title">Documents</h2>
          <form action={uploadDocument} className="upload-form">
            <input type="hidden" name="projectId" value={id} />
            <select name="documentType" className="dashboard-select upload-type-select" required>
              <option value="">Select type…</option>
              {DOCUMENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <input type="file" name="file" className="upload-input" required />
            <button type="submit" className="btn btn-primary upload-btn">Upload</button>
          </form>
        </div>

        {documentsWithUrls.length === 0 ? (
          <p className="project-documents-empty">No documents yet. Upload the first one above.</p>
        ) : (
          <div className="document-table-wrapper">
            <table className="document-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>File name</th>
                  <th>Size</th>
                  <th>Uploaded</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {documentsWithUrls.map((doc) => (
                  <tr key={doc.id} className="document-row">
                    <td>
                      <span className="document-type-badge">{getDocumentTypeLabel(doc.document_type)}</span>
                    </td>
                    <td className="document-name">{doc.name}</td>
                    <td className="document-meta">{formatBytes(doc.size)}</td>
                    <td className="document-meta">
                      {new Date(doc.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div className="document-actions">
                        <button type="button" className="btn document-btn document-ai-btn">
                          ✦ Analyze with AI
                        </button>
                        {doc.signedUrl && (
                          <a href={doc.signedUrl} download={doc.name} className="btn document-btn document-download-btn">
                            ↓ Download
                          </a>
                        )}
                        <form action={removeDocument}>
                          <input type="hidden" name="documentId" value={doc.id} />
                          <input type="hidden" name="storagePath" value={doc.storage_path} />
                          <input type="hidden" name="projectId" value={id} />
                          <button type="submit" className="btn document-btn document-delete-btn">Delete</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
