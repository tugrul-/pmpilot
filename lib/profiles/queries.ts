import type { SupabaseClient } from '@supabase/supabase-js'

export type PlanName = 'free' | 'pro' | 'business' | string

export interface UserProfile {
  user_id: string
  plan: PlanName
  project_limit: number
}

const DEFAULT_FREE_LIMIT = 3

export async function ensureProfileForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<UserProfile | null> {
  const { data: existing, error: selectError } = await supabase
    .from('profiles')
    .select('user_id, plan, project_limit')
    .eq('user_id', userId)
    .maybeSingle()

  if (selectError) {
    console.error('Error loading profile', selectError)
    return null
  }

  if (existing) {
    return existing
  }

  const { error: upsertError } = await supabase
    .from('profiles')
    .upsert({
      user_id: userId,
      plan: 'free',
      project_limit: DEFAULT_FREE_LIMIT,
    })

  if (upsertError) {
    console.error('Error creating profile', {
      code: upsertError.code,
      message: upsertError.message,
      details: upsertError.details,
      hint: upsertError.hint,
    })
    return null
  }

  const { data: createdProfile, error: readAfterUpsertError } = await supabase
    .from('profiles')
    .select('user_id, plan, project_limit')
    .eq('user_id', userId)
    .single()

  if (readAfterUpsertError) {
    console.error('Error loading profile after create', {
      code: readAfterUpsertError.code,
      message: readAfterUpsertError.message,
      details: readAfterUpsertError.details,
      hint: readAfterUpsertError.hint,
    })
    return null
  }

  return createdProfile
}

