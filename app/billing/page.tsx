import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ensureProfileForUser } from '@/lib/profiles/queries'

const PLANS = [
  {
    key: 'free',
    name: 'Free',
    price: '$0',
    description: 'Best for trying PMPilot and running small projects.',
    projectLimit: 3,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$19/mo',
    description: 'For growing teams that need higher project capacity.',
    projectLimit: 20,
  },
  {
    key: 'business',
    name: 'Business',
    price: '$49/mo',
    description: 'For organizations with larger portfolios and governance.',
    projectLimit: 100,
  },
]

export default async function BillingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await ensureProfileForUser(supabase, user.id)
  const currentPlan = profile?.plan ?? 'free'

  return (
    <main className="page billing-page">
      <header className="header billing-header">
        <Link href="/" className="logo">
          PMPilot
        </Link>
        <Link href="/dashboard" className="btn btn-secondary">
          Back to dashboard
        </Link>
      </header>

      <section className="billing-hero">
        <p className="eyebrow">Billing</p>
        <h1 className="billing-title">Choose the right plan for your team</h1>
        <p className="billing-subtitle">
          Your current plan is <strong>{currentPlan}</strong>. Payment and
          checkout integration will be connected in the next step.
        </p>
      </section>

      <section className="billing-grid">
        {PLANS.map((plan) => {
          const isCurrent = plan.key === currentPlan

          return (
            <article
              key={plan.key}
              className={`billing-card ${isCurrent ? 'billing-card-active' : ''}`}
            >
              <h2>{plan.name}</h2>
              <p className="billing-price">{plan.price}</p>
              <p className="billing-description">{plan.description}</p>
              <p className="billing-limit">
                Project limit: <strong>{plan.projectLimit}</strong>
              </p>

              {isCurrent ? (
                <button className="btn btn-secondary" type="button" disabled>
                  Current plan
                </button>
              ) : (
                <button className="btn btn-primary" type="button">
                  Upgrade (coming soon)
                </button>
              )}
            </article>
          )
        })}
      </section>
    </main>
  )
}

