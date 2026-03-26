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
  const {
    data: { user },
  } = await supabase.auth.getUser()

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

  if (dbError) {
    console.error('Error saving document record', dbError)
  }

  revalidatePath(`/dashboard/projects/${projectId}`)
}

async function removeDocument(formData: FormData) {
  'use server'

  const documentId = formData.get('documentId') as string
  const storagePath = formData.get('storagePath') as string
  const projectId = formData.get('projectId') as string

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  await supabase.storage.from('project-documents').remove([storagePath])

  await supabase
    .from('project_documents')
    .delete()
    .eq('id', documentId)
    .eq('owner_id', user.id)

  revalidatePath(`/dashboard/projects/${projectId}`)
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getStatusLabel(status: string) {
  if (status === 'in_progress') return 'In progress'
  if (status === 'done') return 'Done'
  return 'Planned'
}

type ProjectPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: project } = await supabase
    .from('projects')
    .select('id, name, status, created_at')
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
        <Link href="/" className="logo">
          PMPilot
        </Link>
        <div className="dashboard-header-right">
          <Link href="/dashboard" className="btn btn-secondary project-back-btn">
            ← Dashboard
          </Link>
          <LogoutButton />
        </div>
      </header>

      <section className="dashboard-hero">
        <p className="eyebrow">Project</p>
        <h1 className="dashboard-title">{project.name}</h1>
        <p className="dashboard-subtitle">
          Status:{' '}
          <span className={`dashboard-status dashboard-status-${project.status}`}>
            {getStatusLabel(project.status)}
          </span>
        </p>
      </section>

      <section className="project-documents-section">
        <div className="project-documents-header">
          <h2 className="project-documents-title">Documents</h2>
          <form action={uploadDocument} className="upload-form">
            <input type="hidden" name="projectId" value={id} />
            <select name="documentType" className="dashboard-select upload-type-select" required>
              <option value="">Select type…</option>
              {DOCUMENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <input type="file" name="file" className="upload-input" required />
            <button type="submit" className="btn btn-primary upload-btn">
              Upload
            </button>
          </form>
        </div>

        {documentsWithUrls.length === 0 ? (
          <p className="project-documents-empty">
            No documents yet. Upload the first one above.
          </p>
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
                      <span className="document-type-badge">
                        {getDocumentTypeLabel(doc.document_type)}
                      </span>
                    </td>
                    <td className="document-name">{doc.name}</td>
                    <td className="document-meta">{formatBytes(doc.size)}</td>
                    <td className="document-meta">
                      {new Date(doc.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div className="document-actions">
                        <button type="button" className="btn document-btn document-ai-btn">
                          ✦ Analyze with AI
                        </button>
                        {doc.signedUrl && (
                          <a
                            href={doc.signedUrl}
                            download={doc.name}
                            className="btn document-btn document-download-btn"
                          >
                            ↓ Download
                          </a>
                        )}
                        <form action={removeDocument}>
                          <input type="hidden" name="documentId" value={doc.id} />
                          <input type="hidden" name="storagePath" value={doc.storage_path} />
                          <input type="hidden" name="projectId" value={id} />
                          <button type="submit" className="btn document-btn document-delete-btn">
                            Delete
                          </button>
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
