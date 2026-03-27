import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '../../../../components/logout-button'

const FEATURE_META: Record<string, { name: string; description: string }> = {
  risks: {
    name: 'Risk Analysis',
    description: 'Identify, assess, and track project risks with AI-powered analysis and mitigation suggestions.',
  },
  budget: {
    name: 'Budget Analysis',
    description: 'Monitor project financials, track actuals vs. baseline, and forecast budget deviations.',
  },
  stakeholders: {
    name: 'Stakeholder Impact Map',
    description: 'Visualize stakeholder influence, interests, and engagement strategies in one place.',
  },
  kickoff: {
    name: 'Kickoff Presentation',
    description: 'Auto-generate a professional project kickoff deck from your project data.',
  },
  closing: {
    name: 'Closing Presentation',
    description: 'Create a polished project closure report and lessons-learned presentation automatically.',
  },
  notifications: {
    name: 'Notifications',
    description: 'Set up automated alerts for deadlines, status changes, and team activity.',
  },
}

type FeaturePageProps = {
  params: Promise<{ id: string; feature: string }>
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { id, feature } = await params

  const meta = FEATURE_META[feature]
  if (!meta) notFound()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

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

      <section className="feature-gate-section">
        <div className="feature-gate-card">
          <div className="feature-gate-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <p className="feature-gate-eyebrow">Feature Locked</p>
          <h1 className="feature-gate-title">{meta.name}</h1>
          <p className="feature-gate-description">{meta.description}</p>
          <p className="feature-gate-notice">
            This feature is not available on your current plan. Upgrade to <strong>Pro</strong> or higher to unlock it.
          </p>
          <div className="feature-gate-actions">
            <Link href="/billing" className="btn btn-primary">
              View Plans
            </Link>
            <Link href={`/dashboard/projects/${id}`} className="btn btn-secondary">
              Back to Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
