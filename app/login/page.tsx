'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="page auth-page">
      <header className="header auth-header">
        <div className="logo">PMPilot</div>
      </header>

      <section className="auth-section">
        <div className="auth-card">
          <p className="eyebrow">Welcome back</p>
          <h1 className="auth-title">Sign in to your workspace</h1>
          <p className="auth-subtitle">
            Enter your email and password to access your projects and keep work
            on track.
          </p>

          <form className="auth-form" onSubmit={handleLogin}>
            <label className="auth-label">
              <span>Email</span>
              <input
                className="auth-input"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="auth-label">
              <span>Password</span>
              <input
                className="auth-input"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {message && <p className="auth-message">{message}</p>}

            <button
              className="btn btn-primary auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing you in…' : 'Sign in'}
            </button>
          </form>

          <p className="auth-footer-text">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}