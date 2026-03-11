export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <div className="logo">PMPilot</div>

        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#login">Login</a>
        </nav>

        <a href="#get-started" className="btn btn-primary">
          Get Started
        </a>
      </header>

      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Project management, simplified</p>
          <h1>Keep your projects visible, aligned, and under control.</h1>
          <p className="hero-description">
            PMPilot gives project teams a clear and practical workspace to
            plan, monitor, and manage delivery with confidence.
          </p>

          <div className="hero-actions">
            <a href="#get-started" className="btn btn-primary">
              Get Started
            </a>
            <a href="#pricing" className="btn btn-secondary">
              See Pricing
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
              <h3>Portfolio Overview</h3>
              <p>12 active projects</p>
            </div>

            <div className="mock-grid">
              <div className="mock-box">
                <strong>Milestones</strong>
                <span>8 on track</span>
              </div>
              <div className="mock-box">
                <strong>Risks</strong>
                <span>3 under review</span>
              </div>
              <div className="mock-box">
                <strong>Resources</strong>
                <span>24 assigned</span>
              </div>
              <div className="mock-box">
                <strong>Delivery</strong>
                <span>92% visibility</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-heading">
          <p className="eyebrow">Features</p>
          <h2>Everything teams need to stay coordinated</h2>
        </div>

        <div className="cards">
          <article className="card">
            <h3>Project Visibility</h3>
            <p>
              Get a clear view of ongoing work, priorities, and progress in one
              place.
            </p>
          </article>

          <article className="card">
            <h3>Team Alignment</h3>
            <p>
              Keep stakeholders and team members aligned around timelines,
              responsibilities, and next steps.
            </p>
          </article>

          <article className="card">
            <h3>Simple Control</h3>
            <p>
              Manage project flow through a clean and focused workspace without
              unnecessary complexity.
            </p>
          </article>
        </div>
      </section>

      <section id="how-it-works" className="section alt-section">
        <div className="section-heading">
          <p className="eyebrow">How it Works</p>
          <h2>A simple flow from setup to delivery</h2>
        </div>

        <div className="steps">
          <article className="step">
            <div className="step-number">1</div>
            <h3>Set up your workspace</h3>
            <p>
              Create your project space and organize core information in
              minutes.
            </p>
          </article>

          <article className="step">
            <div className="step-number">2</div>
            <h3>Track progress clearly</h3>
            <p>
              Follow project updates, milestones, and priorities from a single
              view.
            </p>
          </article>

          <article className="step">
            <div className="step-number">3</div>
            <h3>Keep everyone aligned</h3>
            <p>
              Share a consistent view of work so teams can move faster with less
              confusion.
            </p>
          </article>
        </div>
      </section>

      <section className="mid-cta">
        <p>Designed for project teams that want structure without heavy complexity.</p>
      </section>

      <section id="pricing" className="section pricing-cta">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>Choose the plan that fits your team</h2>
          <p className="section-description">
            Start simple and scale as your project needs grow.
          </p>
        </div>

        <div className="pricing-tags">
          <span>Starter</span>
          <span>Team</span>
          <span>Business</span>
        </div>

        <a href="#get-started" className="btn btn-primary">
          See Pricing
        </a>
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

  <div className="footer-company">
    PMPilot is developed and operated by Twino Digital.
  </div>

  <div className="footer-contact">
    Contact:{" "}
    <a href="mailto:hello@pmpilot.org">hello@pmpilot.org</a>
  </div>
</footer>
    </main>
  );
}