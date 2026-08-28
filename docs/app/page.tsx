'use client'

import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  GitBranch,
  Menu,
  Terminal,
  X,
  Zap,
} from 'lucide-react'

const benchmarks = [
  { model: 'RF-DETR Base', baseline: 842, ghost: 168, speed: '5.0×' },
  { model: 'RF-DETR Large', baseline: 1420, ghost: 390, speed: '3.6×' },
  { model: 'Batch 8', baseline: 2840, ghost: 910, speed: '3.1×' },
]

const code = `from rfdetr_ghost import RFDETRBase\n\nmodel = RFDETRBase()\n\nmodel.train(...)\npredictions = model.predict(...)`

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className="copy-button"
      aria-label="Copy code"
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1400)
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

function CodePanel({ after = false }: { after?: boolean }) {
  const text = after ? code : code.replace('rfdetr_ghost', 'rfdetr')
  return (
    <div className="code-panel">
      <div className="code-top">
        <span className="code-label">{after ? 'AFTER' : 'BEFORE'}</span>
        <CopyButton text={text} />
      </div>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  )
}

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [gpu, setGpu] = useState('RTX 4090')
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCount((v) => (v >= 5 ? 5 : v + 0.1)), 30)
    return () => clearInterval(id)
  }, [])
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#overview">
          <span className="brand-mark">G</span>
          <span>
            RFDETR<span className="cyan">_GHOST</span>
          </span>
        </a>
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <a href="#overview" onClick={() => setMobileOpen(false)}>
            Overview
          </a>
          <a href="#benchmarks" onClick={() => setMobileOpen(false)}>
            Benchmarks
          </a>
          <a href="#how" onClick={() => setMobileOpen(false)}>
            How it works
          </a>
          <a href="https://github.com" target="_blank">
            GitHub
          </a>
        </div>
        <a className="nav-cta" href="https://github.com" target="_blank">
          View on GitHub <ArrowUpRight />
        </a>
        <button
          className="menu-button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <section id="overview" className="hero section-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> OPEN SOURCE · CUDA · PYTHON
          </div>
          <h1>
            ENTER
            <br />
            <em>
              <span>Ghost</span> mode.
            </em>
          </h1>
          <p className="hero-lede">
            A drop-in performance layer for RF-DETR. Replace one import. Keep your code. Get
            optimized fused kernels and GPU-level performance improvements automatically.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="https://github.com" target="_blank">
              GitHub <ArrowRight size={16} />
            </a>
            <a className="button text-button" href="#benchmarks">
              See benchmarks <ArrowDownRight size={16} />
            </a>
          </div>
          <div className="hero-proof">
            <span>
              <Zap size={15} /> ZERO CODE CHANGES
            </span>
            <span className="proof-line" />
            <span>DROP-IN COMPATIBLE</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-label">
            LIVE BENCHMARK <span>EXAMPLE DATA</span>
          </div>
          <div className="speed-number">
            <strong>{count.toFixed(1)}</strong>
            <span>×</span>
          </div>
          <div className="speed-caption">FASTER OUT OF THE BOX</div>
          <div className="bar-chart">
            <div className="bar-row">
              <span>RF-DETR</span>
              <div className="bar-track">
                <i className="bar baseline" style={{ width: '93%' }} />
              </div>
              <b>842 ms</b>
            </div>
            <div className="bar-row">
              <span>GHOST</span>
              <div className="bar-track">
                <i className="bar ghost" style={{ width: '19%' }} />
              </div>
              <b>168 ms</b>
            </div>
          </div>
          <p className="disclaimer">
            Illustrative benchmark. Actual speedups vary by GPU, model, batch size and workload.
          </p>
        </div>
      </section>

      <section className="import-strip">
        <div className="section-kicker">01 / THE PROMISE</div>
        <div className="import-content">
          <h2>
            One import change.
            <br />
            <span>Same API. Different engine.</span>
          </h2>
          <div className="import-compare">
            <div>
              <label>BEFORE</label>
              <code>
                <span>from</span> rfdetr <span>import</span> RFDETRBase
              </code>
            </div>
            <ArrowRight className="import-arrow" />
            <div>
              <label>AFTER</label>
              <code>
                <span>from</span> rfdetr_ghost <span>import</span> RFDETRBase
              </code>
            </div>
          </div>
          <p className="that-is">That&apos;s it.</p>
        </div>
      </section>

      <section className="section code-section">
        <div className="section-kicker">02 / COMPATIBILITY</div>
        <div className="section-heading">
          <h2>
            Your code stays
            <br />
            <em>the same.</em>
          </h2>
          <p>
            No rewrite. No new API. No migration project.
            <br />
            Just an optimized implementation underneath.
          </p>
        </div>
        <div className="code-grid">
          <CodePanel />
          <CodePanel after />
        </div>
        <div className="center-note">
          <span>↳</span> Same API. Same model. Same workflow. <strong>Different engine.</strong>
        </div>
      </section>

      <section id="how" className="section pipeline-section">
        <div className="section-kicker">03 / UNDER THE HOOD</div>
        <div className="section-heading">
          <h2>
            The optimization
            <br />
            happens <em>underneath.</em>
          </h2>
          <p>
            Ghost handles the low-level work so you can stay in Python. Expensive paths are swapped
            for implementations built for the GPU.
          </p>
        </div>
        <div className="pipeline">
          <div className="pipe-node">
            RF-DETR
            <br />
            <small>PYTHON API</small>
          </div>
          <ArrowDownRight />
          <div className="pipe-node active">
            GHOST
            <br />
            <small>OPTIMIZATION LAYER</small>
          </div>
          <ArrowDownRight />
          <div className="pipe-node">
            FUSED KERNELS
            <br />
            <small>TRITON · CUDA</small>
          </div>
          <ArrowDownRight />
          <div className="pipe-node">
            GPU
            <br />
            <small>MORE THROUGHPUT</small>
          </div>
        </div>
        <div className="feature-list">
          <span>Custom fused kernels</span>
          <span>Reduced launch overhead</span>
          <span>Better memory movement</span>
          <span>GPU-aware optimization</span>
        </div>
      </section>

      <section id="benchmarks" className="section benchmarks-section">
        <div className="section-kicker">04 / PERFORMANCE</div>
        <div className="benchmark-head">
          <div>
            <h2>
              Less waiting.
              <br />
              <em>More inference.</em>
            </h2>
            <p>Measured on representative workloads. Your mileage may vary.</p>
          </div>
          <div className="gpu-select">
            <span>GPU / DEVICE</span>
            <button
              onClick={() =>
                setGpu(gpu === 'RTX 4090' ? 'A100' : gpu === 'A100' ? 'H100' : 'RTX 4090')
              }
            >
              {gpu} <ChevronDown size={15} />
            </button>
          </div>
        </div>
        <div className="benchmark-table">
          <div className="table-head">
            <span>MODEL / WORKLOAD</span>
            <span>BASELINE</span>
            <span>GHOST</span>
            <span>SPEEDUP</span>
          </div>
          {benchmarks.map((b, i) => (
            <div className="table-row" key={b.model}>
              <span>
                <i className="row-index">0{i + 1}</i>
                {b.model}
              </span>
              <span>{b.baseline} ms</span>
              <span className="cyan-text">{b.ghost} ms</span>
              <span className="speed-tag">{b.speed}</span>
            </div>
          ))}
        </div>
        <div className="example-tag">EXAMPLE DATA · REPLACE WITH YOUR BENCHMARKS</div>
      </section>

      <section className="section architecture-section">
        <div className="architecture-copy">
          <div className="section-kicker">05 / THE GHOST APPROACH</div>
          <h2>
            You shouldn&apos;t need to
            <br />
            rewrite your model to
            <br />
            use <em>better kernels.</em>
          </h2>
          <p>
            RF-DETR users interact with the same familiar Python API. Ghost handles the low-level
            optimization layer underneath.
          </p>
          <a href="#install" className="inline-link">
            See how it works <ArrowRight size={15} />
          </a>
        </div>
        <div className="architecture">
          <div className="arch-box">
            APPLICATION
            <strong>
              Your existing
              <br />
              RF-DETR code
            </strong>
          </div>
          <div className="arch-line" />
          <div className="arch-box highlighted">
            GHOST
            <strong>
              Drop-in compatibility
              <br />+ optimized paths
            </strong>
          </div>
          <div className="arch-line" />
          <div className="arch-box">
            GPU
            <strong>
              CUDA · Triton
              <br />
              fused kernels
            </strong>
          </div>
        </div>
      </section>

      <section id="install" className="section install-section">
        <div className="section-kicker">06 / GET STARTED</div>
        <div className="section-heading">
          <h2>
            Try Ghost in
            <br />
            <em>30 seconds.</em>
          </h2>
          <p>Install it next to your existing project. No migration guide required.</p>
        </div>
        <div className="terminal">
          <div className="terminal-top">
            <span>
              <i /> <i /> <i />
            </span>
            <span>your_existing_rfdetr_script.py</span>
            <CopyButton text="pip install rfdetr-ghost" />
          </div>
          <pre>
            <code>
              <span className="muted">$</span> pip install rfdetr-ghost{`\n\n`}
              <span className="comment"># before</span>
              {`\n`}
              <span className="keyword">from</span> rfdetr <span className="keyword">import</span>{' '}
              RFDETRBase{`\n\n`}
              <span className="comment"># after</span>
              {`\n`}
              <span className="keyword">from</span> rfdetr_ghost{' '}
              <span className="keyword">import</span> RFDETRBase{`\n\n`}
              <span className="muted">$</span> python your_existing_rfdetr_script.py
            </code>
          </pre>
        </div>
      </section>

      <section className="ghost-story">
        <div className="story-glow" />
        <div className="story-content">
          <div className="section-kicker">07 / WHY “GHOST”?</div>
          <h2>
            Invisible to your application.
            <br />
            <em>Very visible on the benchmark.</em>
          </h2>
          <p>
            Ghost operates beneath the API surface, replacing expensive paths with optimized
            implementations while keeping the developer experience familiar.
          </p>
        </div>
      </section>

      <section className="section open-section">
        <div className="section-kicker">08 / OPEN SOURCE</div>
        <div className="open-head">
          <h2>
            Built in
            <br />
            <em>the open.</em>
          </h2>
          <a className="button primary" href="https://github.com" target="_blank">
            Explore the source <ArrowRight size={16} />
          </a>
        </div>
        <div className="stats">
          {[
            ['1,847', 'GitHub stars'],
            ['27', 'Contributors'],
            ['14', 'Releases'],
            ['96', 'Benchmarks'],
          ].map(([n, l]) => (
            <div key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <div className="activity">
          <div className="activity-label">
            CONTRIBUTION ACTIVITY <span>LAST 12 MONTHS</span>
          </div>
          <div className="activity-grid">
            {Array.from({ length: 96 }).map((_, i) => (
              <i key={i} className={`level-${(i * 7 + (i % 5)) % 5}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="section-kicker">READY WHEN YOU ARE</div>
        <h2>
          Your RF-DETR code
          <br />
          already works.
        </h2>
        <h3>Make it faster.</h3>
        <div className="hero-actions">
          <a className="button primary" href="#install">
            Install Ghost <Terminal size={16} />
          </a>
          <a className="button outline-button" href="https://github.com" target="_blank">
            View on GitHub <GitBranch size={16} />
          </a>
        </div>
        <p>Drop-in API · Custom kernels · Open source</p>
      </section>
      <footer>
        <a className="brand" href="#overview">
          <span className="brand-mark">G</span>
          <span>
            RFDETR<span className="cyan">_GHOST</span>
          </span>
        </a>
        <span>Same API. Different engine.</span>
        <div>
          <a href="https://github.com">GitHub</a>
          <a href="#install">Documentation</a>
          <a href="#benchmarks">Benchmarks</a>
          <a href="https://github.com">Issues</a>
        </div>
        <small>Built for GPUs. Designed for zero migration.</small>
      </footer>
    </main>
  )
}

function ArrowUpRight() {
  return <ArrowRight size={15} className="arrow-up" />
}
