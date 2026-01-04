import React, { useState, useEffect } from 'react'

function Nav() {
  return (
    <header className="site-header">
      <div className="container flex between center">
        <div className="logo">ERIS Technology</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact" className="btn btn-primary">Enquire Now</a>
          <a href="#enquiries">Enquiries</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container grid-2">
        <div>
          <h1>Modern Solutions for Your Digital Growth</h1>
          <p>Professional, responsive, and lead‑generation focused corporate website built on the MERN stack.</p>
          <div className="cta-group">
            <a href="#services" className="btn btn-primary">Explore Services</a>
            <a href="#contact" className="btn btn-outline">Get a Quote</a>
          </div>
          <ul className="badges">
            <li>Fast Loading</li>
            <li>Secure (SSL)</li>
            <li>Scalable</li>
          </ul>
        </div>
        <div className="hero-card">
          <div className="card">
            <h3>Quick Snapshot</h3>
            <ul>
              <li>Responsive UI (Mobile, Tablet, Desktop)</li>
              <li>Enquiry Module with Email Notifications</li>
              <li>Admin Dashboard (view/filter/export)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ title, description }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#contact" className="btn btn-primary">Enquire Now</a>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <h2>Our Services</h2>
        <p className="section-sub">Technology & solution‑focused offerings with clear CTAs for rapid engagement.</p>
        <div className="cards">
          <ServiceCard
            title="Web Development"
            description="Custom websites built with React, Node.js, and MongoDB for speed, security, and scalability."
          />
          <ServiceCard
            title="API & Integrations"
            description="Reliable REST APIs, authentication (JWT), and third‑party integrations like email & maps."
          />
          <ServiceCard
            title="Performance & SEO"
            description="Optimized delivery, semantic HTML, and accessibility aligned to WCAG 2.1 standards."
          />
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section className="section muted">
      <div className="container grid-3">
        <div className="feature">
          <h4>Secure by Design</h4>
          <p>HTTPS, input validation, CAPTCHA, and role‑based admin access.</p>
        </div>
        <div className="feature">
          <h4>Lead‑Focused</h4>
          <p>Clear CTAs on every service card with streamlined enquiry flow.</p>
        </div>
        <div className="feature">
          <h4>Future‑Ready</h4>
          <p>Modular architecture for content management and easy scaling.</p>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container grid-2">
        <div>
          <h2>About ERIS Technology</h2>
          <p>We deliver results‑driven digital solutions combining engineering excellence with practical business outcomes.</p>
          <ul className="list">
            <li>Vision & Mission aligned to client growth</li>
            <li>Core values: Quality, Transparency, On‑time Delivery</li>
            <li>Experience across multiple industries</li>
          </ul>
        </div>
        <div className="card">
          <h3>Highlights</h3>
          <ul>
            <li>MERN Stack expertise</li>
            <li>Admin reporting & exports</li>
            <li>Cloud hosting & monitoring</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact({ onSubmit }) {
  const [form, setForm] = useState({ name:'', mobile:'', email:'', service:'', message:'' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      timestamp: new Date().toISOString(),
    }
    onSubmit?.(payload)
    // Reset & feedback
    setForm({ name:'', mobile:'', email:'', service:'', message:'' })
    alert('Thanks! Your enquiry has been recorded in the demo.')
    // Scroll to enquiries section so client can see it appear
    const el = document.getElementById('enquiries')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="contact" className="section">
      <div className="container grid-2">
        <div>
          <h2>Contact & Enquiry</h2>
          <p>Tell us what you need—our team will get back within 24 hours.</p>
          <form className="form" onSubmit={submit}>
            <div className="form-row">
              <label>Name</label>
              <input name="name" value={form.name} onChange={update} type="text" placeholder="Your name" required />
            </div>
            <div className="form-row">
              <label>Mobile</label>
              <input name="mobile" value={form.mobile} onChange={update} type="tel" placeholder="98765 43210" required />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input name="email" value={form.email} onChange={update} type="email" placeholder="you@example.com" required />
            </div>
            <div className="form-row">
              <label>Service</label>
              <select name="service" value={form.service} onChange={update} required>
                <option value="">Select a service</option>
                <option>Web Development</option>
                <option>API & Integrations</option>
                <option>Performance & SEO</option>
              </select>
            </div>
            <div className="form-row">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={update} rows="4" placeholder="Describe your requirement" required />
            </div>
            <button className="btn btn-primary" type="submit">Submit Enquiry</button>
          </form>
        </div>
        <div>
          <div className="map-placeholder card">
            <h3>Company Location</h3>
            <p>Google Map embed will appear here in the live version.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Enquiries table with search, filter, clear & CSV export */
function Enquiries({ items = [], onClear }) {
  const [q, setQ] = useState('')
  const [service, setService] = useState('')

  const filtered = items.filter(it => {
    const matchesService = service ? it.service === service : true
    const hay = `${it.name} ${it.email} ${it.mobile} ${it.service} ${it.message}`.toLowerCase()
    const matchesText = q ? hay.includes(q.toLowerCase()) : true
    return matchesService && matchesText
  })

  const exportCSV = () => {
    const header = ['Name','Email','Mobile','Service','Message','Timestamp']
    const rows = filtered.map(it => [it.name, it.email, it.mobile, it.service, it.message, it.timestamp])
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `enquiries_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section id="enquiries" className="section">
      <div className="container">
        <h2>Enquiries</h2>
        <p className="section-sub">Live list of submitted enquiries (demo, saved in your browser).</p>

        {/* Controls */}
        <div className="card" style={{ marginTop: 12 }}>
          <div className="flex between center" style={{ gap: 12, flexWrap: 'wrap' }}>
            <input
              type="search"
              placeholder="Search name, email, mobile…"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              style={{ flex: '1 1 260px', padding: '10px', border: '1px solid var(--border)', borderRadius: '8px' }}
            />
            <select
              value={service}
              onChange={(e)=>setService(e.target.value)}
              style={{ flex: '0 0 220px', padding: '10px', border: '1px solid var(--border)', borderRadius: '8px' }}
            >
              <option value="">All services</option>
              <option>Web Development</option>
              <option>API & Integrations</option>
              <option>Performance & SEO</option>
            </select>
            <div className="cta-group">
              <button className="btn btn-outline" onClick={()=>{ setQ(''); setService(''); }}>Reset</button>
              <button className="btn btn-primary" onClick={exportCSV}>Export CSV</button>
              <button className="btn btn-outline" onClick={onClear}>Clear All</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ marginTop: 16 }}>
          {filtered.length === 0 ? (
            <p style={{ color: 'var(--muted-text)' }}>No enquiries yet. Submit one in the Contact section.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Name','Email','Mobile','Service','Message','Timestamp'].map(h => (
                      <th key={h} style={{ textAlign:'left', padding:'10px', borderBottom:'1px solid var(--border)', fontSize:14 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((it, idx) => (
                    <tr key={idx}>
                      <td style={{ padding:'10px', borderBottom:'1px solid var(--border)' }}>{it.name}</td>
                      <td style={{ padding:'10px', borderBottom:'1px solid var(--border)' }}>{it.email}</td>
                      <td style={{ padding:'10px', borderBottom:'1px solid var(--border)' }}>{it.mobile}</td>
                      <td style={{ padding:'10px', borderBottom:'1px solid var(--border)' }}>{it.service}</td>
                      <td style={{ padding:'10px', borderBottom:'1px solid var(--border)' }}>{it.message}</td>
                      <td style={{ padding:'10px', borderBottom:'1px solid var(--border)', whiteSpace:'nowrap' }}>
                        {new Date(it.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container flex between center">
        <p>© ERIS Technology</p>
        <p>Contact: hello@eris-tech.example • +91 91234 56789</p>
      </div>
    </footer>
  )
}

export default function App() {
  // Persist enquiries in localStorage (demo only)
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const raw = localStorage.getItem('enquiries')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('enquiries', JSON.stringify(enquiries))
    } catch {
      // ignore quota errors in demo
    }
  }, [enquiries])

  const addEnquiry = (payload) => {
    setEnquiries(prev => [payload, ...prev])
  }

  const clearAll = () => {
    if (confirm('Clear all enquiries from this browser?')) {
      setEnquiries([])
      localStorage.removeItem('enquiries')
    }
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <About />
        <Contact onSubmit={addEnquiry} />
        <Enquiries items={enquiries} onClear={clearAll} />
      </main>
      <Footer />
    </>
  )
}
