export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <div className="logo">PMPilot</div>

        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#pricing">Pricing</a>
          <a href="/login">Login</a>
        </nav>

        <a href="/signup" className="btn btn-primary">
          Get Started
        </a>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">AI-powered project management</p>
          <h1>
            From project setup
            <br />
            to AI-driven insights
          </h1>
          <p className="hero-description">
            PMPilot lets you organize your projects, upload key documents, and
            instantly generate risk analyses, budget reports, stakeholder maps,
            and presentations — all powered by AI.
          </p>

          <div className="hero-actions">
            <a href="/signup" className="btn btn-primary">
              Start for Free
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="mock-top">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          <div className="mock-body">
            <div className="mock-panel">
              <h3>Website Redesign</h3>
              <p>Acme Corp · In Progress · 3 docs uploaded</p>
            </div>
            <div className="mock-grid">
              <div className="mock-box">
                <strong>Risk Analysis</strong>
                <span>AI ready</span>
              </div>
              <div className="mock-box">
                <strong>Budget</strong>
                <span>AI ready</span>
              </div>
              <div className="mock-box">
                <strong>Stakeholders</strong>
                <span>AI ready</span>
              </div>
              <div className="mock-box">
                <strong>Kickoff Deck</strong>
                <span>AI ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <div className="section-heading">
          <p className="eyebrow">Features</p>
          <h2>Everything you need to run a project</h2>
          <p className="section-description">
            One workspace to capture project data, manage documents, and let AI
            do the heavy analytical work.
          </p>
        </div>

        <div className="cards">
          <article className="card">
            <div className="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <h3>Project Hub</h3>
            <p>
              Keep all project essentials in one place — organization, baseline
              schedule, status, and team context. No spreadsheets, no scattered
              notes.
            </p>
          </article>

          <article className="card">
            <div className="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h3>Document Management</h3>
            <p>
              Upload and organize your project charter, plan, risk register,
              budget, stakeholder list, and org chart — all linked to the right
              project.
            </p>
          </article>

          <article className="card">
            <div className="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3>AI-Powered Analysis</h3>
            <p>
              Turn uploaded documents into actionable outputs: risk analysis,
              budget breakdowns, stakeholder impact maps, and auto-generated
              kickoff or closing presentations.
            </p>
          </article>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section alt-section">
        <div className="section-heading">
          <p className="eyebrow">How it Works</p>
          <h2>Three steps from setup to insight</h2>
        </div>

        <div className="steps">
          <article className="step">
            <div className="step-number">1</div>
            <h3>Create your project</h3>
            <p>
              Enter the project name, organization, baseline start and end
              dates, and status. Your project hub is ready in seconds.
            </p>
          </article>

          <article className="step">
            <div className="step-number">2</div>
            <h3>Upload your documents</h3>
            <p>
              Add your project charter, plan, risk register, budget, stakeholder
              list, or org chart. PMPilot keeps them organized and accessible.
            </p>
          </article>

          <article className="step">
            <div className="step-number">3</div>
            <h3>Analyze with AI</h3>
            <p>
              Trigger AI analysis to get risk assessments, budget insights,
              stakeholder maps, and ready-to-use presentations — generated from
              your own documents.
            </p>
          </article>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="mid-cta">
        <p>Built for project managers who want AI leverage without the learning curve.</p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section pricing-cta">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>Start free, scale when you need to</h2>
          <p className="section-description">
            Every plan includes the core project hub and document management.
            AI features unlock on Pro and above.
          </p>
        </div>

        <div className="lp-pricing-grid">
          <div className="lp-pricing-card">
            <h3>Free</h3>
            <p className="lp-pricing-price">$0<span>/mo</span></p>
            <ul className="lp-pricing-features">
              <li>Up to 3 projects</li>
              <li>Document management</li>
              <li>Project hub &amp; tracking</li>
            </ul>
            <a href="/signup" className="btn btn-secondary lp-pricing-btn">Get Started</a>
          </div>

          <div className="lp-pricing-card lp-pricing-card-featured">
            <div className="lp-pricing-badge">Most Popular</div>
            <h3>Pro</h3>
            <p className="lp-pricing-price">$19<span>/mo</span></p>
            <ul className="lp-pricing-features">
              <li>Up to 20 projects</li>
              <li>Everything in Free</li>
              <li>AI Risk Analysis</li>
              <li>AI Budget Analysis</li>
              <li>Stakeholder Map</li>
              <li>Kickoff &amp; Closing Decks</li>
            </ul>
            <a href="/signup" className="btn btn-primary lp-pricing-btn">Start Pro</a>
          </div>

          <div className="lp-pricing-card">
            <h3>Business</h3>
            <p className="lp-pricing-price">$49<span>/mo</span></p>
            <ul className="lp-pricing-features">
              <li>Up to 100 projects</li>
              <li>Everything in Pro</li>
              <li>Notifications &amp; alerts</li>
              <li>Priority support</li>
            </ul>
            <a href="/signup" className="btn btn-secondary lp-pricing-btn">Start Business</a>
          </div>

          <div className="lp-pricing-card lp-pricing-card-custom">
            <h3>Custom</h3>
            <p className="lp-pricing-price lp-pricing-price-custom">Custom<span> pricing</span></p>
            <ul className="lp-pricing-features">
              <li>Unlimited projects</li>
              <li>Everything in Business</li>
              <li>Tailored limits &amp; SLA</li>
              <li>Dedicated support</li>
              <li>Enterprise security</li>
            </ul>
            <a href="mailto:hello@pmpilot.org" className="btn btn-secondary lp-pricing-btn">Contact Sales</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">© 2026 PMPilot. All rights reserved.</div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="mailto:hello@pmpilot.org">Contact</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
        <div className="footer-company">PMPilot is developed and operated by Twino Digital.</div>
        <div className="footer-contact">
          Contact: <a href="mailto:hello@pmpilot.org">hello@pmpilot.org</a>
        </div>
      </footer>
    </main>
  )
}
