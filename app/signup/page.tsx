'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setMessage('Signup successful. Check your email.')
    setLoading(false)
  }

  return (
    <main className="page auth-page">
      <header className="header auth-header">
        <Link href="/" className="logo">
          PMPilot
        </Link>
      </header>

      <section className="auth-section">
        <div className="auth-card">
          <p className="eyebrow">Create your account</p>
          <h1 className="auth-title">Get started with PMPilot</h1>
          <p className="auth-subtitle">
            Set up your workspace in a few seconds and start keeping your
            projects visible and under control.
          </p>

          <form className="auth-form" onSubmit={handleSignup}>
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
                autoComplete="new-password"
                placeholder="Create a password"
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
              {loading ? 'Creating your account…' : 'Create account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link href="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}