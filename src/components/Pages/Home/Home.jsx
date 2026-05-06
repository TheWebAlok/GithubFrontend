import React, { useState, useRef } from 'react'
import styles from './HomeStyles'
import { motion, AnimatePresence, useInView } from "framer-motion"

// ─── Icons ───────────────────────────────────────────────────────────────────

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427z"/>
  </svg>
)

const HamburgerIcon = ({ open }) => (
  <button className={`hamburger${open ? ' open' : ''}`} aria-label="Toggle menu">
    <span /><span /><span />
  </button>
)

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = (delay = 0.1, childDelay = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay, delayChildren: childDelay } }
})

// ─── Scroll-triggered wrapper ─────────────────────────────────────────────────

const ScrollReveal = ({ children, variants = fadeUp, className, style }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Nav Menu Data ────────────────────────────────────────────────────────────

const NAV_MENUS = {
  Platform: {
    wide: true,
    sections: [
      {
        title: 'Collaborate',
        items: [
          { icon: '🤖', title: 'GitHub Copilot',  desc: 'AI-powered coding assistant' },
          { icon: '📋', title: 'GitHub Issues',   desc: 'Track bugs and feature requests' },
          { icon: '🔀', title: 'Pull Requests',   desc: 'Code review and collaboration' },
          { icon: '💬', title: 'Discussions',     desc: 'Community conversations' },
        ],
      },
      {
        title: 'Build & Ship',
        items: [
          { icon: '⚡', title: 'GitHub Actions',  desc: 'CI/CD automation workflows' },
          { icon: '💻', title: 'Codespaces',      desc: 'Cloud dev environments' },
          { icon: '📦', title: 'Packages',        desc: 'Publish and consume packages' },
          { icon: '🚀', title: 'Pages',           desc: 'Host websites from repos' },
        ],
      },
    ],
  },
  Solutions: {
    wide: false,
    sections: [{
      title: 'By Team Size',
      items: [
        { icon: '👤', title: 'Individual', desc: 'Free for personal projects' },
        { icon: '👥', title: 'Teams',      desc: 'Collaborate with your team' },
        { icon: '🏢', title: 'Enterprise', desc: 'Security at scale' },
      ],
    }],
  },
  Resources: {
    wide: false,
    sections: [{
      title: 'Learn',
      items: [
        { icon: '📚', title: 'Docs',             desc: 'Official documentation' },
        { icon: '🎓', title: 'GitHub Skills',    desc: 'Interactive learning' },
        { icon: '📝', title: 'Blog',             desc: 'News and updates' },
        { icon: '🌟', title: 'Customer Stories', desc: 'See how others use GitHub' },
      ],
    }],
  },
  'Open Source': {
    wide: false,
    sections: [{
      title: 'Explore',
      items: [
        { icon: '🔍', title: 'Explore',  desc: 'Trending repos and topics' },
        { icon: '💝', title: 'Sponsors', desc: 'Fund open source work' },
        { icon: '🗺️', title: 'Roadmap',  desc: "GitHub's public roadmap" },
      ],
    }],
  },
  Enterprise: {
    wide: false,
    sections: [{
      title: 'Enterprise Features',
      items: [
        { icon: '🔒', title: 'Advanced Security', desc: 'Code scanning & secret detection' },
        { icon: '📊', title: 'Insights',          desc: 'Analytics and reporting' },
        { icon: '🏗️', title: 'GitHub AE',         desc: 'Fully managed enterprise' },
      ],
    }],
  },
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const PROD_CARDS = [
  { tag: 'GitHub Actions',    title: 'Automate your workflow',          desc: 'Build, test, and deploy your code right from GitHub. Make code reviews more efficient, manage workflows, and automatically merge when checks pass.' },
  { tag: 'GitHub Codespaces', title: 'Code with full dev environments',  desc: 'Spin up fully configured dev environments from any device in seconds. Work consistently and eliminate "it works on my machine" forever.' },
  { tag: 'GitHub Mobile',     title: 'Manage from anywhere',            desc: 'Stay in the flow with push notifications, review code, merge pull requests, and triage issues — from any device, anywhere.' },
  { tag: 'GitHub CLI',        title: 'Command GitHub from the terminal', desc: 'Bring GitHub to your command line. Create issues, check out pull requests, and manage releases without ever leaving the terminal.' },
]

const SECURITY_ITEMS = [
  { color: '#56d364', title: 'Dependabot alerts fixed',  desc: '3 high severity vulnerabilities resolved • 12 minutes ago' },
  { color: '#e3b341', title: 'Code scanning alert',      desc: 'SQL injection risk detected in auth.ts — auto-fix available' },
  { color: '#388bfd', title: 'Secret scanning enabled',  desc: 'Monitoring 0 exposed secrets across all repositories' },
]

const BOARD_PROTOTYPE = [
  { title: 'Game level and go-no-go',               team: 'badge-blue',   teamLabel: 'Producers', status: 'badge-green',  statusLabel: 'Complete',    assignee: 'lucid-jellybean',  progress: 88 },
  { title: 'Engine prototype (physics, rendering)', team: 'badge-purple', teamLabel: 'Engines',   status: 'badge-green',  statusLabel: 'Complete',    assignee: 'aldengarcia',      progress: 54 },
  { title: 'Initial concept art',                   team: 'badge-orange', teamLabel: 'Art',        status: 'badge-green',  statusLabel: 'Complete',    assignee: 'amerose',          progress: 100 },
]

const BOARD_BETA = [
  { title: 'Integrate with Leaderboard Service', team: 'badge-blue',   teamLabel: 'Game Loop', status: 'badge-orange', statusLabel: 'Not Started', assignee: 'literal-davy',    progress: 34 },
  { title: 'Update collision logic',             team: 'badge-purple', teamLabel: 'Engines',   status: 'badge-blue',   statusLabel: 'Building',    assignee: 'helios-acimoore', progress: 75 },
]

const BEGINNER_STEPS = [
  { step: 1, title: 'Create your first repository', desc: 'A repository is like a folder for your project. Store all your files, track changes, and collaborate with others - all in one place.', link: 'Create a repo' },
  { step: 2, title: 'Make your first commit',        desc: 'A commit is a saved snapshot of your project. Learn how to add files, write a commit message, and push your first code to GitHub.',    link: 'Make a commit' },
  { step: 3, title: 'Open your first Pull Request',  desc: "Pull requests let you propose changes and collaborate with others. This is how the world's best developers review and ship code together.", link: 'Open a PR' },
]

const FOOTER_COLS = [
  { title: 'Platform',  links: ['Developer API', 'Partners', 'Electron', 'GitHub Desktop'] },
  { title: 'Support',   links: ['Docs', 'Community Forum', 'Professional Services', 'Premium Support', 'Skills', 'Status', 'Contact GitHub'] },
  { title: 'Company',   links: ['About', 'Blog', 'Careers', 'Press', 'Inclusion', 'Social Impact', 'Shop'] },
  { title: 'Ecosystem', links: ['GitHub Marketplace', 'GitHub Actions', 'GitHub Copilot', 'GitHub Codespaces', 'GitHub Mobile'] },
]

const CODE_LINES = [
  <><span className="kw">import</span> {'{ '}<span className="fn">Player</span>{' }'} <span className="kw">from</span> <span className="str">'./player'</span>;</>,
  <><span className="kw">import</span> {'{ '}<span className="fn">CollisionDetector</span>{' }'} <span className="kw">from</span> <span className="str">'./utils/collision'</span>;</>,
  <></>,
  <><span className="kw">export class</span> <span className="fn">Game</span> {'{'}</>,
  <>&nbsp;&nbsp;<span className="kw">private</span> player1: <span className="fn">Player</span>;</>,
  <>&nbsp;&nbsp;<span className="kw">private</span> player2: <span className="fn">Player</span>;</>,
  <>&nbsp;&nbsp;<span className="kw">private</span> collision: <span className="fn">CollisionDetector</span>;</>,
  <></>,
  <>&nbsp;&nbsp;<span className="fn">constructor</span>() {'{'}</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.player1 = <span className="kw">new</span> <span className="fn">Player</span>({'{ x: '}<span className="num">0</span>{', y: '}<span className="num">0</span>{' }'});</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.player2 = <span className="kw">new</span> <span className="fn">Player</span>({'{ x: '}<span className="num">800</span>{', y: '}<span className="num">0</span>{' }'});</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.collision = <span className="kw">new</span> <span className="fn">CollisionDetector</span>();</>,
  <>&nbsp;&nbsp;{'}'}</>,
  <></>,
  <>&nbsp;&nbsp;<span className="fn">update</span>(deltaTime: <span className="kw">number</span>): <span className="kw">void</span> {'{'}</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.player1.<span className="fn">update</span>(deltaTime);</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.player2.<span className="fn">update</span>(deltaTime);</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.<span className="fn">checkCollisions</span>();</>,
  <>&nbsp;&nbsp;{'}'}</>,
  <></>,
  <>&nbsp;&nbsp;<span className="kw">private</span> <span className="fn">checkCollisions</span>(): <span className="kw">void</span> {'{'}</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">const</span> hit = <span className="kw">this</span>.collision.<span className="fn">detect</span>(</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.player1, <span className="kw">this</span>.player2</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;);</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">if</span> (hit) {'{'}</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.player1.<span className="fn">onCollision</span>(hit);</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.player2.<span className="fn">onCollision</span>(hit);</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</>,
  <>&nbsp;&nbsp;{'}'}</>,
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const BoardRow = ({ title, team, teamLabel, status, statusLabel, assignee, progress }) => (
  <motion.div
    className="board-row"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
  >
    <span className="issue-title">{title}</span>
    <span><span className={`badge ${team}`}>{teamLabel}</span></span>
    <span><span className={`badge ${status}`}>{statusLabel}</span></span>
    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{assignee}</span>
    <span>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
    </span>
  </motion.div>
)

const DropdownMenu = ({ menu, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={`dropdown-panel${menu.wide ? ' wide' : ''} open`}
        initial={{ opacity: 0, y: -10, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,   scale: 1 }}
        exit={{   opacity: 0, y: -10,  scale: 0.97 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {menu.sections.map((section, si) => (
          <React.Fragment key={si}>
            {si > 0 && <div className="dropdown-divider" />}
            <div className={`dropdown-section-title${menu.wide && si > 0 ? ' no-span' : ''}`}>
              {section.title}
            </div>
            {section.items.map((item, ii) => (
              <motion.a
                href="#"
                className="dropdown-item"
                key={ii}
                onClick={onClose}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ii * 0.045, duration: 0.2 }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)', x: 3 }}
              >
                <div className="dropdown-item-icon">{item.icon}</div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-title">{item.title}</div>
                  <div className="dropdown-item-desc">{item.desc}</div>
                  {item.badge && <span className="dropdown-item-badge">✦ {item.badge}</span>}
                </div>
              </motion.a>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
)

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [email, setEmail]           = useState('')
  const [email2, setEmail2]         = useState('')
  const [openMenu, setOpenMenu]     = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMenu    = (name) => setOpenMenu(prev => prev === name ? null : name)
  const closeAll      = () => setOpenMenu(null)
  const closeMobile   = () => setMobileOpen(false)

  return (
    <>
      <style>{styles}</style>

      {openMenu && <div onClick={closeAll} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />}

      {/* ── NAVBAR — slides down on load ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#" className="nav-logo"><GitHubIcon /></a>

        <div className="nav-links">
          {Object.entries(NAV_MENUS).map(([name, menu]) => (
            <div className="nav-dropdown" key={name}>
              <motion.button
                className={`nav-dropdown-btn${openMenu === name ? ' open' : ''}`}
                onClick={() => toggleMenu(name)}
                whileTap={{ scale: 0.96 }}
              >
                {name}
                <motion.span
                  animate={{ rotate: openMenu === name ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'inline-flex' }}
                >
                  <ChevronIcon />
                </motion.span>
              </motion.button>
              <DropdownMenu menu={menu} isOpen={openMenu === name} onClose={closeAll} />
            </div>
          ))}
          <a href="#" className="nav-plain-link">Pricing</a>
        </div>

        <div className="nav-spacer" />

        <div className="nav-search">
          <SearchIcon />
          <span>Search or jump to...</span>
          <kbd>/</kbd>
        </div>

        <div className="nav-actions">
          <motion.a href="/auth"   className="btn-link"   whileHover={{ background: 'rgba(255,255,255,.06)' }}>Sign in</motion.a>
          <motion.a href="/signup" className="btn-signup" whileHover={{ background: '#d0d7de' }} whileTap={{ scale: 0.97 }}>Sign up</motion.a>
        </div>

        {/* Hamburger — only visible on mobile */}
        <div onClick={() => setMobileOpen(o => !o)}>
          <HamburgerIcon open={mobileOpen} />
        </div>
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {Object.entries(NAV_MENUS).map(([name, menu], mi) => (
              <motion.div
                className="mobile-menu-section"
                key={name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: mi * 0.05, duration: 0.3 }}
              >
                <div className="mobile-menu-label">{name}</div>
                {menu.sections.flatMap(s => s.items).map((item, ii) => (
                  <a
                    href="#"
                    className="mobile-menu-item"
                    key={ii}
                    onClick={closeMobile}
                  >
                    <div className="mobile-menu-item-icon">{item.icon}</div>
                    <div className="mobile-menu-item-text">
                      <div>{item.title}</div>
                      <div className="mobile-menu-item-desc">{item.desc}</div>
                    </div>
                  </a>
                ))}
              </motion.div>
            ))}

            <motion.div
              className="mobile-menu-section"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28, duration: 0.3 }}
            >
              <a href="#" className="mobile-menu-plain" onClick={closeMobile}>Pricing</a>
            </motion.div>

            <motion.div
              className="mobile-menu-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <a href="/auth"   className="mobile-btn-signin"  onClick={closeMobile}>Sign in</a>
              <a href="/signup" className="mobile-btn-signup"  onClick={closeMobile}>Sign up for GitHub</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO — staggered children ── */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="stars" />

        <motion.div
          className="hero-content"
          variants={stagger(0.15, 0.2)}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={fadeUp}>
            The future of building<br />happens together
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp}>
            Tools and trends evolve, but collaboration endures. With GitHub, developers,
            agents, and code come together on one platform.
          </motion.p>
          <motion.div className="hero-cta" variants={fadeUp}>
            <div className="hero-cta-row">
              <div className="hero-cta-inner">
                <div className="hero-email-wrap">
                  <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                  <motion.button className="btn-green" whileHover={{ background: 'var(--green-btn-hover)' }} whileTap={{ scale: 0.97 }}>
                    <a href="/auth">Sign up for GitHub
</a>

                  </motion.button>
                </div>
                <motion.a href="copilot" className="btn-outline" whileHover={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(240,246,252,.5)' }} whileTap={{ scale: 0.97 }}>
                  <a href="/copilot">Try GitHub Copilot free</a>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Editor — floats up with slight delay */}
        <motion.div
          className="hero-illustration"
          initial={{ opacity: 0, y: 70, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="editor-preview">
            <div className="editor-tabs">
              <div className="editor-tab">GITHUB COPILOT CHAT</div>
              <div className="editor-tab active">game.ts ×</div>
              <div className="editor-tab">characters.module.css ×</div>
              <div className="editor-tab">bonus-level.ts ×</div>
            </div>
            <div className="editor-body">
              <div className="editor-sidebar">
                {['📁 src','  game.ts','  characters.module.css','  bonus-level.ts','  player.ts','📁 assets','  sprites.png','📁 utils','  collision.ts'].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`sidebar-item${item === '  game.ts' ? ' active' : ''}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.04, duration: 0.3 }}
                  >
                    {item.startsWith('  ') ? <>&nbsp;&nbsp;{item.trim()}</> : item}
                  </motion.div>
                ))}
              </div>
              <div className="editor-code">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85 + i * 0.022, duration: 0.25 }}
                  >
                    <span className="ln">{i + 1}</span>{line}
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="copilot-panel"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="copilot-label">✦ Copilot Explanation</div>
                <div className="copilot-explanation">
                  <p>The <strong>checkCollisions</strong> function handles collision detection between two player objects.</p>
                  <br />
                  <p><strong>Parameters:</strong> Takes <code>player1</code> and <code>player2</code> objects.</p>
                  <br />
                  <p><strong>Returns:</strong> <code>void</code>. Updates player states on collision.</p>
                </div>
                <input className="copilot-input" placeholder="Ask a question or type / for commands" readOnly />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="glow-line" />

      {/* ── COPILOT SECTION — slide in from sides ── */}
      <motion.div
        className="copilot-section"
        variants={stagger(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="copilot-text" variants={slideLeft}>
          <div className="feature-tag">GitHub Copilot</div>
          <h2><strong>Your AI partner</strong> everywhere.</h2>
          <p>Copilot is ready to work with you at each step of the software development lifecycle. From first idea to shipped code, AI assistance is built right in.</p>
          <a href="#" className="copilot-link">Explore GitHub Copilot</a>
        </motion.div>

        <motion.div variants={slideRight}>
          <motion.div
            style={{ background: '#161b22', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}
            whileHover={{ boxShadow: '0 0 0 1px rgba(56,139,253,0.35)', borderColor: 'rgba(56,139,253,0.35)' }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', background: '#0d1117', fontSize: '12px', color: 'var(--text-muted)' }}>
              ✦ GitHub Copilot
            </div>
            <div style={{ padding: '16px', fontSize: '13px' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '12px', fontSize: '12px', fontStyle: 'italic' }}>
                +page.server.ts &nbsp; src/routes<br />+page.svelte &nbsp;&nbsp;&nbsp; src/routes
              </div>
              <div style={{ background: '#21262d', borderRadius: '6px', padding: '8px 12px', marginBottom: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Add commit message...
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                <select style={{ background: '#21262d', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '12px', borderRadius: '4px', padding: '4px 8px', fontFamily: 'inherit' }}>
                  <option>Agent ▾</option>
                </select>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Claude 3.5 Sonnet ▾</span>
              </div>
            </div>
          </motion.div>
          <div style={{ textAlign: 'right', marginTop: '12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              Duolingo <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>boosts developer speed by 25% with GitHub Copilot</span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <a href="#" style={{ color: 'var(--blue-mid)', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>Read customer story ›</a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="glow-line" />

      {/* ── PRODUCTIVITY — staggered cards ── */}
      <div className="productivity">
        <ScrollReveal>
          <p>Accelerate your workflows with <strong>AI-native development</strong> built into every step.</p>
        </ScrollReveal>

        <motion.div
          className="prod-grid"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PROD_CARDS.map(card => (
            <motion.div
              className="prod-card"
              key={card.tag}
              variants={fadeUp}
              whileHover={{ borderColor: '#388bfd', y: -5, boxShadow: '0 12px 40px rgba(56,139,253,0.15)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="prod-card-header">
                <div className="prod-card-tag">{card.tag}</div>
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="glow-line" />

      {/* ── SECURITY — pulsing shield + staggered items ── */}
      <div className="security-section">
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>

          <ScrollReveal variants={scaleIn}>
            <motion.div
              className="shield-icon"
              animate={{ boxShadow: ['0 0 20px rgba(31,111,235,.25)', '0 0 55px rgba(31,111,235,.65)', '0 0 20px rgba(31,111,235,.25)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ShieldIcon />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal>
            <h2>Built-in application security<br />where found means fixed</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
              Use AI to find and fix vulnerabilities so your team can ship more secure software faster.
            </p>
          </ScrollReveal>

          <motion.div
            style={{ marginTop: '40px' }}
            variants={stagger(0.18)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div style={{ background: '#161b22', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px', textAlign: 'left' }}>
              {SECURITY_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 2 ? '16px' : 0 }}
                >
                  <motion.span
                    style={{ color: item.color, fontSize: '18px' }}
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
                  >●</motion.span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="glow-line" />

      {/* ── PROJECT BOARDS — slide in from sides + animated progress bars ── */}
      <motion.div
        className="project-section"
        variants={stagger(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="project-text" variants={slideLeft}>
          <div className="feature-tag">GitHub Projects</div>
          <h2>Plan with clarity. <strong>Build with focus.</strong></h2>
          <p>Organize everything from high-level roadmaps to everyday tasks. Connect issues, pull requests, and notes to visualize your project's progress in real time.</p>
          <a href="#" className="copilot-link" style={{ color: 'var(--green)' }}>Explore GitHub Projects</a>
        </motion.div>

        <motion.div className="project-board" variants={slideRight}>
          <div className="board-header">🎮 Game Dev Roadmap &nbsp;·&nbsp; <span style={{ color: 'var(--blue-mid)' }}>3 groups</span></div>
          <div className="board-row" style={{ background: '#0d1117', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '.04em' }}>
            <span>TITLE</span><span>TEAM</span><span>STATUS</span><span>ASSIGNEE</span><span>PROGRESS</span>
          </div>
          <div style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(255,255,255,.02)', borderBottom: '1px solid var(--border)' }}>📂 Prototype · 3</div>
          {BOARD_PROTOTYPE.map((row, i) => <BoardRow key={i} {...row} />)}
          <div style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(255,255,255,.02)', borderBottom: '1px solid var(--border)' }}>📂 Beta · 5</div>
          {BOARD_BETA.map((row, i) => <BoardRow key={i} {...row} />)}
        </motion.div>
      </motion.div>

      <div className="glow-line" />

      {/* ── BEGINNER GUIDE — staggered step cards ── */}
      <div className="beginner-section">
        <ScrollReveal variants={fadeUp}>
          <div className="beginner-section-header">
            <h2>New to GitHub? <strong>Start here.</strong></h2>
          </div>
          <p className="sub">
            Coding ke shuruaat mein ho? Koi baat nahi — GitHub ne shuru se hi sab kuch simple banaya hai.
            Yeh teen steps se apna pehla project launch karo.
          </p>
        </ScrollReveal>

        <motion.div
          className="beginner-steps"
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {BEGINNER_STEPS.map(item => (
            <motion.div
              className="beginner-step"
              key={item.step}
              variants={fadeUp}
              whileHover={{ y: -7, borderColor: 'var(--beginner-green)', boxShadow: '0 12px 40px rgba(63,185,80,0.18)' }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="step-number"
                whileHover={{ scale: 1.2, boxShadow: '0 0 20px rgba(63,185,80,0.5)' }}
                transition={{ duration: 0.2 }}
              >
                {item.step}
              </motion.div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href="#" className="beginner-step-link">{item.link}</a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="glow-line" />

      {/* ── SOCIAL PROOF — staggered cards ── */}
      <div className="social-section">
        <ScrollReveal variants={fadeUp}>
          <p>Millions of developers and businesses<br /><strong>call GitHub home</strong></p>
        </ScrollReveal>

        <motion.div
          className="social-grid"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="social-card" variants={fadeUp} whileHover={{ borderColor: 'rgba(56,139,253,0.4)', y: -4 }} transition={{ duration: 0.2 }}>
            <div className="company-logo">Gartner</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>2026 Gartner® Magic Quadrant™ for AI Code Assistants</div>
            <div className="social-stat">Leader</div>
            <div className="social-desc">GitHub named a Leader in the 2026 Gartner® Magic Quadrant™ for AI Code Assistants.</div>
          </motion.div>

          <motion.div className="social-card" variants={fadeUp} whileHover={{ borderColor: 'rgba(56,139,253,0.4)', y: -4 }} transition={{ duration: 0.2 }}>
            <div className="company-logo">100M+</div>
            <div className="social-stat">Developers</div>
            <div className="social-desc">Whether you're scaling your development process or just learning to code, GitHub is where you belong.</div>
          </motion.div>

          <motion.div className="testimonial" variants={fadeUp}>
            <div className="quote-mark">"</div>
            <blockquote>It helps us onboard new software engineers and get them productive right away. We have all our source code in GitHub, so it helps to always have that context — it's like a superpower.</blockquote>
            <cite>- Engineering Lead, Fortune 500 Company</cite>
          </motion.div>
        </motion.div>
      </div>

      <div className="glow-line" />

      {/* ── FINAL CTA — fade up ── */}
      <div className="final-cta">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Millions of developers and<br />businesses call GitHub home
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: '1.6', marginBottom: '40px' }}
        >
          Whether you're scaling your development process or just learning to code, GitHub is where you belong. Join the world's most widely adopted developer platform to build the technologies that shape what's next.
        </motion.p>

        <motion.div
          className="final-cta-btns"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <div className="hero-email-wrap">
            <input type="email" placeholder="Enter your email" value={email2} onChange={e => setEmail2(e.target.value)} />
            <motion.button className="btn-green" whileHover={{ background: 'var(--green-btn-hover)' }} whileTap={{ scale: 0.97 }}>
              Sign up for GitHub
            </motion.button>
          </div>
          <motion.a href="#" className="btn-outline" whileHover={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(240,246,252,.5)' }} whileTap={{ scale: 0.97 }}>
            Try GitHub Copilot free
          </motion.a>
        </motion.div>

        <p className="citation">1. GitHub internal customer data, 2026. <a href="#">↗</a></p>
      </div>

      {/* ── FOOTER — staggered columns ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-inner">
          <motion.div
            className="footer-grid"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div className="footer-col" variants={fadeUp}>
              <div className="footer-logo"><GitHubIcon /><strong>GitHub</strong></div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                The complete developer platform to build, scale, and deliver secure software.
              </p>
            </motion.div>
            {FOOTER_COLS.map(col => (
              <motion.div className="footer-col" key={col.title} variants={fadeUp}>
                <h4>{col.title}</h4>
                <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p>© 2026 GitHub, Inc.</p>
            <div className="footer-bottom-links">
              {['Terms', 'Privacy', 'Sitemap', 'What is Git?', 'Manage cookies', 'Do not share my personal information'].map(l => (
                <a href="#" key={l}>{l}</a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  )
}
