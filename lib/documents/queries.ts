import type { SupabaseClient } from '@supabase/supabase-js'

export const DOCUMENT_TYPES = [
  { value: 'project_charter', label: 'Project Charter' },
  { value: 'project_plan', label: 'Project Plan' },
  { value: 'project_stakeholder_list', label: 'Stakeholder List' },
  { value: 'project_risks', label: 'Project Risks' },
  { value: 'project_budget', label: 'Project Budget' },
  { value: 'project_organization_chart', label: 'Organization Chart' },
] as const

export type DocumentTypeValue = (typeof DOCUMENT_TYPES)[number]['value']

export function getDocumentTypeLabel(value: string): string {
  return DOCUMENT_TYPES.find((t) => t.value === value)?.label ?? value
}

export interface ProjectDocument {
  id: string
  project_id: string
  owner_id: string
  name: string
  storage_path: string
  size: number
  mime_type: string
  document_type: DocumentTypeValue
  created_at: string
}

export async function getDocumentsForProject(
  supabase: SupabaseClient,
  projectId: string
): Promise<ProjectDocument[]> {
  const { data, error } = await supabase
    .from('project_documents')
    .select('id, project_id, owner_id, name, storage_path, size, mime_type, document_type, created_at')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading documents', error)
    return []
  }

  return data ?? []
}

export async function deleteDocument(
  supabase: SupabaseClient,
  documentId: string,
  storagePath: string
): Promise<boolean> {
  const { error: storageError } = await supabase.storage
    .from('project-documents')
    .remove([storagePath])

  if (storageError) {
    console.error('Error deleting from storage', storageError)
    return false
  }

  const { error: dbError } = await supabase
    .from('project_documents')
    .delete()
    .eq('id', documentId)

  if (dbError) {
    console.error('Error deleting document record', dbError)
    return false
  }

  return true
}

export async function getSignedUrl(
  supabase: SupabaseClient,
  storagePath: string,
  expiresIn = 3600
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('project-documents')
    .createSignedUrl(storagePath, expiresIn)

  if (error) {
    console.error('Error creating signed URL', error)
    return null
  }

  return data.signedUrl
}
