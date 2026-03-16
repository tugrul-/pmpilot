import type { SupabaseClient } from '@supabase/supabase-js'

export type ProjectStatus = 'planned' | 'in_progress' | 'done' | string

export interface Project {
  id: string
  owner_id: string
  name: string
  status: ProjectStatus
  created_at: string
  updated_at: string
}

export async function getProjectsForCurrentUser(
  supabase: SupabaseClient
): Promise<Project[]> {
  const {
    data,
    error,
  } = await supabase
    .from('projects')
    .select('id, owner_id, name, status, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading projects', error)
    return []
  }

  return data ?? []
}

