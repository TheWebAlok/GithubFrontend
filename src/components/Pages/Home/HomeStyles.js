const styles = `

/* ─── CSS Variables ─────────────────────────────────────────────────────────── */
:root {
  --bg:               #0d1117;
  --bg-secondary:     #161b22;
  --bg-tertiary:      #21262d;
  --border:           #21262d;
  --border-muted:     #30363d;
  --text-primary:     #e6edf3;
  --text-secondary:   #c9d1d9;
  --text-muted:       #7d8590;
  --blue-mid:         #388bfd;
  --blue-light:       #58a6ff;
  --green:            #3fb950;
  --green-btn:        #238636;
  --green-btn-hover:  #2ea043;
  --beginner-green:   #3fb950;
  --purple:           #bc8cff;
}

/* ─── Reset ─────────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  overflow-x: hidden;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; }
button { cursor: pointer; font-family: inherit; }
input, select { font-family: inherit; }

/* ─── Glow line ─────────────────────────────────────────────────────────────── */
.glow-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-muted) 30%, var(--border-muted) 70%, transparent);
  margin: 0 auto;
  max-width: 1200px;
}

/* ════════════════════════════════════════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════════════════════════════════════════ */
nav {
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 24px;
  height: 62px;
  background: rgba(13,17,23,0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-logo svg {
  width: 32px;
  height: 32px;
  fill: var(--text-primary);
  display: block;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 12px;
}

.nav-dropdown { position: relative; }

.nav-dropdown-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  transition: color .2s, background .2s;
  white-space: nowrap;
}
.nav-dropdown-btn:hover,
.nav-dropdown-btn.open { color: var(--text-primary); background: rgba(255,255,255,.06); }
.nav-dropdown-btn svg { width: 14px; height: 14px; }

.nav-plain-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 6px 10px;
  border-radius: 6px;
  transition: color .2s, background .2s;
  white-space: nowrap;
}
.nav-plain-link:hover { color: var(--text-primary); background: rgba(255,255,255,.06); }

.nav-spacer { flex: 1; }

.nav-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;
  transition: border-color .2s;
  white-space: nowrap;
}
.nav-search:hover { border-color: var(--blue-mid); }
.nav-search kbd {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-muted);
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 12px;
  font-family: inherit;
}

.nav-actions { display: flex; align-items: center; gap: 8px; margin-left: 8px; }

.btn-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 5px 12px;
  border-radius: 6px;
  transition: background .2s, color .2s;
  white-space: nowrap;
}
.btn-link:hover { color: var(--text-primary); }

.btn-signup {
  font-size: 14px;
  font-weight: 600;
  color: #1f2328;
  background: var(--text-primary);
  padding: 5px 14px;
  border-radius: 6px;
  transition: background .2s;
  white-space: nowrap;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--border-muted);
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  margin-left: 8px;
  flex-shrink: 0;
}
.hamburger span {
  display: block;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 2px;
  transition: transform .3s, opacity .3s;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ─── Dropdown Panel ─────────────────────────────────────────────────────────── */
.dropdown-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
  border-radius: 10px;
  padding: 8px;
  z-index: 1000;
  box-shadow: 0 16px 40px rgba(0,0,0,0.5);
}
.dropdown-panel.wide {
  min-width: 440px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}
.dropdown-section-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .06em;
  color: var(--text-muted);
  text-transform: uppercase;
  padding: 6px 10px 4px;
  grid-column: 1 / -1;
}
.dropdown-divider { height: 1px; background: var(--border); margin: 6px 0; grid-column: 1 / -1; }
.dropdown-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  transition: background .15s;
}
.dropdown-item:hover { background: rgba(255,255,255,.06); }
.dropdown-item-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
.dropdown-item-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.dropdown-item-desc  { font-size: 12px; color: var(--text-muted); margin-top: 1px; line-height: 1.4; }
.dropdown-item-badge { display: inline-block; margin-top: 4px; font-size: 11px; color: var(--purple); font-weight: 600; }

/* ─── Mobile Drawer ──────────────────────────────────────────────────────────── */
.mobile-menu {
  position: fixed;
  inset: 62px 0 0;
  background: var(--bg);
  z-index: 998;
  overflow-y: auto;
  padding: 16px;
  border-top: 1px solid var(--border);
}
.mobile-menu-section { margin-bottom: 20px; }
.mobile-menu-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0 8px 8px;
}
.mobile-menu-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 8px;
  transition: background .15s;
}
.mobile-menu-item:hover { background: var(--bg-secondary); }
.mobile-menu-item-icon { font-size: 20px; flex-shrink: 0; }
.mobile-menu-item-text { font-size: 14px; font-weight: 500; color: var(--text-primary); }
.mobile-menu-item-desc { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.mobile-menu-plain {
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 10px 8px;
  border-radius: 8px;
}
.mobile-menu-plain:hover { background: var(--bg-secondary); color: var(--text-primary); }
.mobile-menu-actions { display: flex; flex-direction: column; gap: 10px; padding: 16px 0; }
.mobile-btn-signin {
  display: block;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-muted);
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: background .2s;
}
.mobile-btn-signin:hover { background: var(--bg-secondary); }
.mobile-btn-signup {
  display: block;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  background: var(--green-btn);
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  transition: background .2s;
}
.mobile-btn-signup:hover { background: var(--green-btn-hover); }

/* ════════════════════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════════════════════ */
.hero {
  position: relative;
  text-align: center;
  padding: 80px 24px 0;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,139,253,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.5) 0%, transparent 100%),
    radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,.2) 0%, transparent 100%);
}

.hero-content { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }

.hero-content h1 {
  font-size: clamp(32px, 6vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -.02em;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.hero-sub {
  font-size: clamp(16px, 2vw, 20px);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.hero-cta { margin-bottom: 40px; }
.hero-cta-row { display: flex; justify-content: center; }
.hero-cta-inner { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; max-width: 520px; }

.hero-email-wrap {
  display: flex;
  width: 100%;
  gap: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
  border-radius: 8px;
  padding: 6px;
}
.hero-email-wrap input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: var(--text-primary);
  padding: 4px 8px;
}
.hero-email-wrap input::placeholder { color: var(--text-muted); }

.btn-green {
  background: var(--green-btn);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  transition: background .2s;
  flex-shrink: 0;
}
.btn-green:hover { background: var(--green-btn-hover); }

.btn-outline {
  display: inline-block;
  border: 1px solid rgba(240,246,252,.25);
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  transition: background .2s, border-color .2s;
  width: 100%;
  text-align: center;
}

/* ─── Hero Illustration ──────────────────────────────────────────────────────── */
.hero-illustration {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 0 0;
}

.editor-preview {
  background: #161b22;
  border: 1px solid var(--border-muted);
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  text-align: left;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 12px;
}

.editor-tabs {
  display: flex;
  background: #0d1117;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
  scrollbar-width: none;
}
.editor-tabs::-webkit-scrollbar { display: none; }
.editor-tab {
  padding: 8px 16px;
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
  border-right: 1px solid var(--border);
  flex-shrink: 0;
}
.editor-tab.active { color: var(--text-primary); background: #161b22; border-bottom: 2px solid var(--blue-mid); }

.editor-body {
  display: flex;
  height: 320px;
  overflow: hidden;
}

.editor-sidebar {
  width: 180px;
  min-width: 180px;
  background: #0d1117;
  border-right: 1px solid var(--border);
  padding: 8px 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.sidebar-item {
  padding: 3px 16px;
  font-size: 12px;
  color: var(--text-muted);
  cursor: pointer;
  transition: background .15s, color .15s;
  white-space: nowrap;
}
.sidebar-item:hover { background: rgba(255,255,255,.04); color: var(--text-secondary); }
.sidebar-item.active { background: rgba(56,139,253,.12); color: var(--text-primary); }

.editor-code {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  overflow-x: auto;
  line-height: 1.7;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.ln { display: inline-block; width: 28px; color: var(--text-muted); user-select: none; flex-shrink: 0; }
.kw  { color: #ff7b72; }
.fn  { color: #d2a8ff; }
.str { color: #a5d6ff; }
.num { color: #79c0ff; }

.copilot-panel {
  width: 260px;
  min-width: 260px;
  background: #0d1117;
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 10px;
  overflow-y: auto;
}
.copilot-label { font-size: 12px; font-weight: 600; color: var(--blue-light); }
.copilot-explanation { font-size: 12px; color: var(--text-secondary); line-height: 1.6; font-family: inherit; }
.copilot-explanation code { background: var(--bg-tertiary); padding: 1px 5px; border-radius: 4px; color: var(--blue-light); }
.copilot-input {
  margin-top: auto;
  background: #161b22;
  border: 1px solid var(--border-muted);
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 12px;
  color: var(--text-muted);
  outline: none;
  width: 100%;
}

/* ════════════════════════════════════════════════════════════════════════════
   COPILOT SECTION
   ════════════════════════════════════════════════════════════════════════════ */
.copilot-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px;
}
.copilot-text .feature-tag {
  display: inline-block;
  background: rgba(56,139,253,.15);
  color: var(--blue-light);
  border: 1px solid rgba(56,139,253,.3);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}
.copilot-text h2 { font-size: clamp(24px, 3.5vw, 40px); font-weight: 400; margin-bottom: 16px; line-height: 1.25; }
.copilot-text p  { font-size: 16px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px; }
.copilot-link { color: var(--blue-light); font-size: 15px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; transition: gap .2s; }
.copilot-link:hover { gap: 8px; }

/* ════════════════════════════════════════════════════════════════════════════
   PRODUCTIVITY
   ════════════════════════════════════════════════════════════════════════════ */
.productivity {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px;
  text-align: center;
}
.productivity > div > p { font-size: clamp(20px, 3vw, 32px); color: var(--text-secondary); margin-bottom: 48px; }
.productivity > div > p strong { color: var(--text-primary); }

.prod-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  text-align: left;
}
.prod-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px;
  transition: border-color .2s, transform .2s, box-shadow .2s;
}
.prod-card-header { margin-bottom: 12px; }
.prod-card-tag {
  display: inline-block;
  background: rgba(56,139,253,.1);
  color: var(--blue-light);
  border: 1px solid rgba(56,139,253,.25);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
}
.prod-card h3 { font-size: 16px; margin-bottom: 10px; color: var(--text-primary); }
.prod-card p  { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

/* ════════════════════════════════════════════════════════════════════════════
   SECURITY
   ════════════════════════════════════════════════════════════════════════════ */
.security-section {
  padding: 80px 24px;
  text-align: center;
}
.shield-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(31,111,235,.15);
  border: 1px solid rgba(31,111,235,.4);
  margin-bottom: 24px;
}
.shield-icon svg { width: 32px; height: 32px; fill: var(--blue-light); }
.security-section h2 { font-size: clamp(24px, 3.5vw, 40px); margin-bottom: 16px; line-height: 1.25; }

/* ════════════════════════════════════════════════════════════════════════════
   PROJECT BOARDS
   ════════════════════════════════════════════════════════════════════════════ */
.project-section {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  align-items: start;
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px;
}
.project-text { position: sticky; top: 80px; }
.project-text .feature-tag {
  display: inline-block;
  background: rgba(63,185,80,.12);
  color: var(--green);
  border: 1px solid rgba(63,185,80,.25);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}
.project-text h2 { font-size: clamp(24px, 3vw, 36px); margin-bottom: 16px; line-height: 1.25; }
.project-text p  { font-size: 16px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px; }

.project-board {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  overflow-x: auto;
}
.board-header {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
.board-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 8px;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
  min-width: 480px;
  transition: background .15s;
}
.board-row:last-child { border-bottom: none; }
.issue-title { color: var(--text-secondary); font-size: 12px; }
.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
}
.badge-blue   { background: rgba(56,139,253,.15);  color: #58a6ff; border: 1px solid rgba(56,139,253,.3); }
.badge-purple { background: rgba(188,140,255,.12); color: #d2a8ff; border: 1px solid rgba(188,140,255,.25); }
.badge-orange { background: rgba(210,153,34,.15);  color: #e3b341; border: 1px solid rgba(210,153,34,.3); }
.badge-green  { background: rgba(63,185,80,.12);   color: #3fb950; border: 1px solid rgba(63,185,80,.25); }
.progress-bar { height: 4px; background: var(--bg-tertiary); border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--green); border-radius: 4px; }

/* ════════════════════════════════════════════════════════════════════════════
   BEGINNER SECTION
   ════════════════════════════════════════════════════════════════════════════ */
.beginner-section { max-width: 1100px; margin: 0 auto; padding: 80px 24px; }
.beginner-section-header h2 { font-size: clamp(24px, 3.5vw, 40px); margin-bottom: 12px; }
.beginner-section .sub { font-size: 16px; color: var(--text-secondary); margin-bottom: 48px; max-width: 600px; line-height: 1.7; }

.beginner-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
.beginner-step {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform .2s, border-color .2s, box-shadow .2s;
}
.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(63,185,80,.15);
  border: 1px solid rgba(63,185,80,.35);
  color: var(--green);
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.beginner-step h3 { font-size: 17px; font-weight: 600; color: var(--text-primary); }
.beginner-step p  { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
.beginner-step-link {
  margin-top: auto;
  font-size: 14px;
  font-weight: 600;
  color: var(--blue-light);
  transition: gap .2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.beginner-step-link:hover { gap: 8px; }
.beginner-step-link::after { content: " →"; }

/* ════════════════════════════════════════════════════════════════════════════
   SOCIAL PROOF
   ════════════════════════════════════════════════════════════════════════════ */
.social-section { max-width: 1100px; margin: 0 auto; padding: 80px 24px; text-align: center; }
.social-section > div > p { font-size: clamp(24px, 3.5vw, 42px); margin-bottom: 48px; color: var(--text-secondary); line-height: 1.3; }
.social-section > div > p strong { color: var(--text-primary); }

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  text-align: left;
}
.social-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  transition: border-color .2s, transform .2s;
}
.company-logo { font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }
.social-stat  { font-size: 36px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
.social-desc  { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

.testimonial {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  position: relative;
}
.quote-mark { font-size: 60px; line-height: 1; color: var(--border-muted); font-family: Georgia, serif; position: absolute; top: 12px; left: 20px; }
blockquote { font-size: 15px; color: var(--text-secondary); line-height: 1.7; padding-top: 24px; }
cite { display: block; margin-top: 16px; font-size: 13px; color: var(--text-muted); font-style: normal; }

/* ════════════════════════════════════════════════════════════════════════════
   FINAL CTA
   ════════════════════════════════════════════════════════════════════════════ */
.final-cta {
  max-width: 700px;
  margin: 0 auto;
  padding: 80px 24px;
  text-align: center;
}
.final-cta h2 { font-size: clamp(28px, 4vw, 48px); line-height: 1.2; margin-bottom: 24px; }
.final-cta-btns { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.citation { font-size: 12px; color: var(--text-muted); margin-top: 24px; }
.citation a { color: var(--blue-light); }

/* ════════════════════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════════════════════ */
footer { border-top: 1px solid var(--border); }
.footer-inner { max-width: 1200px; margin: 0 auto; padding: 48px 24px 32px; }
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 40px;
}
.footer-logo { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.footer-logo svg { width: 22px; height: 22px; fill: var(--text-primary); }
.footer-logo strong { font-size: 15px; }
.footer-col h4 { font-size: 12px; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 12px; }
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer-col ul li a { font-size: 13px; color: var(--text-muted); transition: color .15s; }
.footer-col ul li a:hover { color: var(--text-primary); }
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  font-size: 12px;
  color: var(--text-muted);
}
.footer-bottom-links { display: flex; flex-wrap: wrap; gap: 8px 16px; }
.footer-bottom-links a { color: var(--text-muted); font-size: 12px; transition: color .15s; }
.footer-bottom-links a:hover { color: var(--text-primary); }

/* ════════════════════════════════════════════════════════════════════════════
   RESPONSIVE BREAKPOINTS
   ════════════════════════════════════════════════════════════════════════════ */

/* ── Tablet: 1024px ── */
@media (max-width: 1024px) {
  .nav-search { display: none; }

  .copilot-section {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 60px 24px;
  }

  .project-section {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 60px 24px;
  }
  .project-text { position: static; }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .editor-sidebar {
    width: 150px;
    min-width: 150px;
  }
  .copilot-panel {
    width: 220px;
    min-width: 220px;
  }
}

/* ── Small Tablet: 768px ── */
@media (max-width: 768px) {
  /* Navbar */
  .nav-links    { display: none; }
  .nav-search   { display: none; }
  .nav-actions  { display: none; }
  .hamburger    { display: flex; }

  /* Hero */
  .hero { padding: 60px 20px 0; }
  .hero-email-wrap {
    flex-direction: column;
    background: transparent;
    border: none;
    padding: 0;
    gap: 10px;
  }
  .hero-email-wrap input {
    width: 100%;
    background: var(--bg-secondary);
    border: 1px solid var(--border-muted);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 15px;
  }
  .btn-green {
    width: 100%;
    padding: 12px 16px;
    font-size: 15px;
    border-radius: 8px;
  }

  /* Editor: hide sidebar and copilot panel */
  .editor-sidebar { display: none; }
  .copilot-panel  { display: none; }
  .editor-body    { height: 260px; }

  /* Sections */
  .copilot-section  { padding: 48px 20px; gap: 32px; }
  .productivity     { padding: 48px 20px; }
  .security-section { padding: 48px 20px; }
  .project-section  { padding: 48px 20px; gap: 32px; }
  .beginner-section { padding: 48px 20px; }
  .social-section   { padding: 48px 20px; }
  .final-cta        { padding: 48px 20px; }

  .social-grid { grid-template-columns: 1fr; }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .footer-bottom { flex-direction: column; align-items: flex-start; }

  /* Dropdown menus — fix for mobile */
  .dropdown-panel { display: none; }
  .dropdown-panel.wide { display: none; }
}

/* ── Mobile: 480px ── */
@media (max-width: 480px) {
  nav { padding: 0 16px; gap: 8px; }

  .hero { padding: 48px 16px 0; }

  .editor-preview { border-radius: 8px 8px 0 0; }
  .editor-body    { height: 220px; }
  .editor-tabs    { font-size: 11px; }
  .editor-tab     { padding: 6px 12px; }
  .editor-code    { font-size: 11px; padding: 8px 10px; }

  .productivity     { padding: 40px 16px; }
  .prod-grid        { grid-template-columns: 1fr; }
  .copilot-section  { padding: 40px 16px; }
  .security-section { padding: 40px 16px; }
  .project-section  { padding: 40px 16px; }
  .beginner-section { padding: 40px 16px; }
  .beginner-steps   { grid-template-columns: 1fr; }
  .social-section   { padding: 40px 16px; }
  .final-cta        { padding: 40px 16px; }

  footer .footer-inner { padding: 40px 16px 24px; }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .footer-bottom-links { flex-direction: column; gap: 6px; }

  .board-row { min-width: 360px; font-size: 11px; padding: 8px 12px; }
  .project-board { font-size: 11px; }
}

/* ── Very small: 360px ── */
@media (max-width: 360px) {
  .hero-content h1 { font-size: 28px; }
  .hero-sub        { font-size: 14px; }
  .editor-body     { height: 180px; }
  .social-stat     { font-size: 28px; }
}
`

export default styles