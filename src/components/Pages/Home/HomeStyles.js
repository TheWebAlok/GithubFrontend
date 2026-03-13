const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Mona+Sans:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-dark: #010409;
    --bg-navy: #0d1117;
    --blue-glow: #1f6feb;
    --blue-mid: #388bfd;
    --green: #3fb950;
    --green-btn: #238636;
    --green-btn-hover: #2ea043;
    --border: rgba(48,54,61,1);
    --text-primary: #e6edf3;
    --text-secondary: #8b949e;
    --text-muted: #6e7681;
    --white: #ffffff;
    --beginner-green: #3fb950;
    --beginner-green-bg: rgba(63,185,80,0.15);
    --beginner-green-border: rgba(63,185,80,0.4);
    --dropdown-bg: #161b22;
    --dropdown-border: rgba(48,54,61,1);
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
    background: var(--bg-dark); color: var(--text-primary);
    overflow-x: hidden; line-height: 1.5;
  }

  /* BEGINNER BADGE */
  .beginner-badge {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--beginner-green-bg); border: 1px solid var(--beginner-green-border);
    color: var(--beginner-green); font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 20px; letter-spacing: .08em;
    text-transform: uppercase; white-space: nowrap;
    animation: badgePulse 2.5s ease-in-out infinite;
  }
  .beginner-badge::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: var(--beginner-green); box-shadow: 0 0 6px var(--beginner-green); flex-shrink: 0;
  }
  @keyframes badgePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(63,185,80,0); }
    50% { box-shadow: 0 0 0 4px rgba(63,185,80,0.12); }
  }

  /* NAVBAR */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(1,4,9,0.95); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border); height: 62px;
    display: flex; align-items: center; padding: 0 24px; gap: 16px;
  }
  .nav-logo { display:flex; align-items:center; color:var(--white); flex-shrink:0; text-decoration:none; }
  .nav-logo svg { width:32px; height:32px; fill:var(--white); }
  .nav-links { display:flex; gap:2px; margin-left:8px; align-items:center; position:relative; }
  .nav-spacer { flex:1; }

  /* DROPDOWN TRIGGER */
  .nav-dropdown { position: relative; }
  .nav-dropdown-btn {
    display: flex; align-items: center; gap: 4px;
    color: var(--text-secondary); background: none; border: none;
    font-size: 14px; font-weight: 500; padding: 6px 12px; border-radius: 6px;
    cursor: pointer; font-family: inherit; white-space: nowrap;
    transition: color .15s, background .15s;
  }
  .nav-dropdown-btn:hover, .nav-dropdown-btn.open { color: var(--white); background: rgba(255,255,255,.06); }
  .nav-dropdown-btn svg {
    width: 12px; height: 12px; fill: currentColor;
    transition: transform .2s ease; flex-shrink: 0;
  }
  .nav-dropdown-btn.open svg { transform: rotate(180deg); }

  /* DROPDOWN PANEL */
  .dropdown-panel {
    position: absolute; top: calc(100% + 10px); left: 0;
    background: var(--dropdown-bg);
    border: 1px solid var(--dropdown-border);
    border-radius: 12px; padding: 8px;
    box-shadow: 0 16px 48px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04);
    min-width: 280px; z-index: 999;
    opacity: 0; transform: translateY(-8px) scale(.98);
    pointer-events: none;
    transition: opacity .18s ease, transform .18s ease;
  }
  .dropdown-panel.open {
    opacity: 1; transform: translateY(0) scale(1); pointer-events: all;
  }
  .dropdown-panel.wide { min-width: 540px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }

  .dropdown-section-title {
    font-size: 11px; font-weight: 600; color: var(--text-muted);
    letter-spacing: .08em; text-transform: uppercase;
    padding: 8px 12px 4px; grid-column: span 2;
  }
  .dropdown-section-title.no-span { grid-column: span 1; }

  .dropdown-divider {
    height: 1px; background: var(--border); margin: 6px 0; grid-column: span 2;
  }

  .dropdown-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 10px 12px; border-radius: 8px; cursor: pointer; text-decoration: none;
    transition: background .12s;
  }
  .dropdown-item:hover { background: rgba(255,255,255,.06); }
  .dropdown-item-icon {
    width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 16px;
    background: rgba(255,255,255,.06); border: 1px solid var(--border); margin-top: 1px;
  }
  .dropdown-item-content { flex: 1; min-width: 0; }
  .dropdown-item-title { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
  .dropdown-item-desc { font-size: 12px; color: var(--text-muted); line-height: 1.4; }
  .dropdown-item-badge {
    font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
    background: var(--beginner-green-bg); color: var(--beginner-green);
    border: 1px solid var(--beginner-green-border); white-space: nowrap; margin-top: 2px;
    display: inline-block;
  }

  .dropdown-link {
    display: block; padding: 8px 12px; border-radius: 6px;
    font-size: 13px; color: var(--text-secondary); text-decoration: none;
    transition: background .12s, color .12s; white-space: nowrap;
  }
  .dropdown-link:hover { background: rgba(255,255,255,.06); color: var(--text-primary); }

  .nav-plain-link {
    color: var(--text-secondary); text-decoration: none;
    font-size: 14px; font-weight: 500; padding: 6px 12px; border-radius: 6px;
    transition: color .15s, background .15s; white-space: nowrap; display: inline-block;
  }
  .nav-plain-link:hover { color: var(--white); background: rgba(255,255,255,.06); }

  .nav-search {
    display:flex; align-items:center; gap:6px;
    background: var(--bg-navy); border: 1px solid var(--border);
    border-radius: 6px; padding: 5px 12px;
    color: var(--text-muted); font-size: 14px;
    cursor:text; min-width:220px; transition: border-color .15s;
  }
  .nav-search:hover { border-color: var(--blue-glow); }
  .nav-search span { flex:1; }
  .nav-search kbd {
    background: rgba(255,255,255,.08); border: 1px solid var(--border);
    border-radius: 4px; padding: 1px 5px; font-size: 12px; font-family: inherit;
  }
  .nav-actions { display:flex; gap:8px; align-items:center; margin-left:8px; }
  .btn-link {
    background:none; border:none; cursor:pointer; color: var(--text-primary);
    font-size: 14px; font-weight:500; padding: 6px 14px; border-radius: 6px;
    transition: color .15s, background .15s; font-family:inherit; text-decoration:none;
  }
  .btn-link:hover { background:rgba(255,255,255,.06); }
  .btn-signup {
    background: var(--white); color: var(--bg-dark); border: none; cursor:pointer;
    font-size: 14px; font-weight:600; padding: 6px 14px; border-radius: 6px;
    font-family:inherit; transition: background .15s; text-decoration:none; white-space:nowrap;
  }
  .btn-signup:hover { background:#d0d7de; }

  /* HERO */
  .hero {
    min-height: 100vh; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    text-align:center; padding: 120px 24px 80px; position:relative; overflow:hidden;
  }
  .hero-bg {
    position:absolute; inset:0; z-index:0;
    background: radial-gradient(ellipse 80% 60% at 50% 30%, #0c2d5e 0%, #06101f 55%, #010409 100%);
  }
  .hero-bg::after {
    content:''; position:absolute; inset:0;
    background: radial-gradient(ellipse 50% 40% at 50% 60%, rgba(31,111,235,.12) 0%, transparent 70%);
  }
  .stars {
    position:absolute; inset:0; z-index:1;
    background-image:
      radial-gradient(1px 1px at 20% 15%, rgba(255,255,255,.6) 0%, transparent 100%),
      radial-gradient(1px 1px at 80% 25%, rgba(255,255,255,.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 45% 55%, rgba(255,255,255,.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 15% 70%, rgba(255,255,255,.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,.6) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 55% 35%, rgba(255,255,255,.7) 0%, transparent 100%);
  }
  .hero-content { position:relative; z-index:2; max-width:720px; animation: fadeUp .8s ease both; }
  .hero h1 {
    font-size: clamp(40px, 6vw, 64px); font-weight: 800;
    line-height: 1.15; letter-spacing: -1.5px; color: var(--white); margin-bottom: 24px;
  }
  .hero-sub {
    font-size: clamp(16px, 2vw, 20px); color: var(--text-secondary);
    max-width: 520px; margin: 0 auto 40px; line-height: 1.6;
  }
  .hero-cta { display:flex; align-items:center; gap:8px; justify-content:center; flex-wrap:wrap; }
  .hero-cta-row { display:flex; flex-direction:column; align-items:flex-start; gap:8px; }
  .hero-cta-inner { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
  .hero-email-wrap {
    display:flex; align-items:stretch;
    background:rgba(255,255,255,.06); border: 1px solid var(--border);
    border-radius: 6px; overflow:hidden;
  }
  .hero-email-wrap input {
    background:transparent; border:none; outline:none;
    color: var(--text-primary); font-size:14px; padding:10px 16px;
    width:220px; font-family:inherit;
  }
  .hero-email-wrap input::placeholder { color:var(--text-muted); }
  .btn-green {
    background: var(--green-btn); color: var(--white); border:none; cursor:pointer;
    font-size:14px; font-weight:600; padding: 10px 20px; font-family:inherit;
    white-space:nowrap; transition: background .15s;
  }
  .btn-green:hover { background: var(--green-btn-hover); }
  .btn-outline {
    background:transparent; color: var(--text-primary);
    border: 1px solid rgba(240,246,252,.25); cursor:pointer;
    font-size:14px; font-weight:600; padding: 10px 20px; border-radius: 6px;
    font-family:inherit; white-space:nowrap;
    transition: border-color .15s, background .15s; text-decoration:none; display:inline-block;
  }
  .btn-outline:hover { background:rgba(255,255,255,.06); border-color:rgba(240,246,252,.5); }

  .hero-illustration { position:relative; z-index:2; margin-top: 60px; width:100%; max-width:900px; animation: fadeUp .8s .3s ease both; }
  .editor-preview {
    background: #161b22; border: 1px solid var(--border); border-radius: 12px; overflow:hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(31,111,235,.15);
  }
  .editor-tabs {
    background: #0d1117; border-bottom: 1px solid var(--border);
    display:flex; padding: 8px 12px 0; overflow:hidden;
  }
  .editor-tab {
    background: #161b22; border: 1px solid var(--border); border-bottom: none;
    border-radius: 6px 6px 0 0; padding: 6px 16px;
    font-size:12px; color:var(--text-secondary); cursor:pointer; margin-right:4px;
  }
  .editor-tab.active { color:var(--text-primary); background:#1c2128; }
  .editor-body { display:flex; }
  .editor-sidebar {
    width:160px; flex-shrink:0; background:#161b22;
    border-right: 1px solid var(--border); padding: 12px 0;
  }
  .sidebar-item {
    padding: 5px 16px; font-size:12px; color:var(--text-muted);
    cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  .sidebar-item:hover, .sidebar-item.active { background:rgba(31,111,235,.15); color:var(--text-primary); }
  .editor-code {
    flex:1; padding: 16px; font-family: 'SFMono-Regular', Consolas, monospace;
    font-size:12px; line-height:1.8; min-height: 200px; max-height:300px; overflow-y:auto;
  }
  .editor-code::-webkit-scrollbar { width:6px; }
  .editor-code::-webkit-scrollbar-thumb { background:var(--border); border-radius:3px; }
  .ln { color:var(--text-muted); margin-right:20px; user-select:none; }
  .kw { color:#ff7b72; } .fn { color:#d2a8ff; } .str { color:#a5d6ff; } .num { color:#79c0ff; }
  .copilot-panel {
    width:280px; flex-shrink:0; background:#161b22;
    border-left: 1px solid var(--border); padding:16px; font-size:12px;
  }
  .copilot-label { color:var(--text-muted); font-size:11px; letter-spacing:.08em; text-transform:uppercase; margin-bottom:8px; }
  .copilot-explanation { color:var(--text-secondary); line-height:1.6; font-size:12px; }
  .copilot-explanation strong { color:var(--text-primary); background:rgba(56,139,253,.15); padding:1px 4px; border-radius:3px; }
  .copilot-input {
    margin-top:16px; background:rgba(255,255,255,.04); border:1px solid var(--border);
    border-radius:6px; padding: 8px 12px; color:var(--text-muted);
    font-size:12px; font-family:inherit; width:100%;
  }

  .feature-tag {
    display:inline-block; background:rgba(56,139,253,.15); border:1px solid rgba(56,139,253,.4);
    color:var(--blue-mid); font-size:12px; font-weight:600; padding:4px 12px;
    border-radius:20px; margin-bottom:24px; letter-spacing:.08em; text-transform:uppercase;
  }
  .copilot-section {
    display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;
    padding:80px 60px; max-width:1200px; margin:0 auto;
  }
  .copilot-text h2 { font-size:clamp(24px,3.5vw,40px); font-weight:800; margin-bottom:16px; letter-spacing:-.5px; }
  .copilot-text h2 strong { color:var(--blue-mid); }
  .copilot-text p { color:var(--text-secondary); font-size:16px; line-height:1.7; margin-bottom:20px; }
  .copilot-link {
    color:var(--blue-mid); text-decoration:none; font-size:15px; font-weight:600;
    display:inline-flex; align-items:center; gap:6px;
  }
  .copilot-link:hover { text-decoration:underline; }
  .copilot-link::after { content:'›'; font-size:20px; }

  .productivity { padding: 80px 60px; max-width:1200px; margin:0 auto; }
  .productivity > p {
    font-size:clamp(24px,3vw,36px); font-weight:700; max-width:600px;
    line-height:1.3; margin-bottom:60px; color:var(--text-primary);
  }
  .productivity > p strong { color:var(--blue-mid); font-weight:800; }
  .prod-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  .prod-card {
    background:#161b22; border:1px solid var(--border); border-radius:12px; padding:32px;
    transition: border-color .2s, transform .2s; cursor:pointer; position:relative;
  }
  .prod-card:hover { border-color:#388bfd; transform:translateY(-2px); }
  .prod-card-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
  .prod-card-tag { font-size:12px; color:var(--text-muted); letter-spacing:.08em; text-transform:uppercase; }
  .prod-card h3 { font-size:20px; font-weight:700; margin-bottom:12px; }
  .prod-card p { color:var(--text-secondary); font-size:14px; line-height:1.6; }

  .security-section {
    background: linear-gradient(to bottom, #010409, #0d1117, #010409);
    padding: 120px 24px; text-align:center; position:relative;
  }
  .security-section::before {
    content:''; position:absolute; top:0; left:50%; transform:translateX(-50%);
    width:1px; height:80px; background: linear-gradient(to bottom, transparent, var(--blue-glow));
  }
  .shield-icon {
    width:56px; height:56px; background:linear-gradient(135deg, #388bfd, #1f6feb);
    border-radius:12px; display:inline-flex; align-items:center; justify-content:center;
    margin-bottom:24px; box-shadow: 0 0 40px rgba(31,111,235,.4);
  }
  .shield-icon svg { fill:white; width:28px; height:28px; }
  .security-section h2 {
    font-size:clamp(28px,4vw,48px); font-weight:800; max-width:600px; margin:0 auto 16px;
    letter-spacing:-1px; line-height:1.2;
  }
  .security-section > div > p { color:var(--text-secondary); font-size:18px; max-width:500px; margin:0 auto; }

  .project-section {
    display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;
    padding:80px 60px; max-width:1200px; margin:0 auto;
  }
  .project-text h2 { font-size:clamp(24px,3.5vw,40px); font-weight:800; margin-bottom:16px; }
  .project-text h2 strong { color:var(--green); }
  .project-text p { color:var(--text-secondary); font-size:16px; line-height:1.7; margin-bottom:20px; }
  .project-board { background:#161b22; border:1px solid var(--border); border-radius:10px; overflow:hidden; }
  .board-header {
    background:#0d1117; border-bottom:1px solid var(--border);
    padding:10px 16px; display:flex; align-items:center; gap:8px;
    font-size:13px; color:var(--text-secondary);
  }
  .board-row {
    display:grid; grid-template-columns:3fr 1fr 1fr 1.2fr 1fr;
    padding:8px 16px; border-bottom:1px solid rgba(48,54,61,.5);
    font-size:12px; align-items:center; gap:8px;
  }
  .board-row:last-child { border-bottom:none; }
  .board-row:hover { background:rgba(255,255,255,.02); }
  .issue-title { color:var(--text-primary); }
  .badge { display:inline-block; padding:2px 8px; border-radius:20px; font-size:11px; font-weight:600; }
  .badge-blue { background:rgba(31,111,235,.2); color:#79c0ff; border:1px solid rgba(31,111,235,.4); }
  .badge-green { background:rgba(63,185,80,.2); color:#56d364; border:1px solid rgba(63,185,80,.4); }
  .badge-orange { background:rgba(210,153,34,.2); color:#e3b341; border:1px solid rgba(210,153,34,.4); }
  .badge-purple { background:rgba(163,113,247,.2); color:#bc8cff; border:1px solid rgba(163,113,247,.4); }
  .progress-bar { width:80px; height:4px; background:#21262d; border-radius:2px; overflow:hidden; }
  .progress-fill { height:100%; border-radius:2px; background:var(--green); }

  .social-section { padding:80px 60px; max-width:1200px; margin:0 auto; }
  .social-section > p {
    font-size:clamp(24px,3vw,36px); font-weight:700; max-width:620px; line-height:1.3; margin-bottom:60px;
  }
  .social-section > p strong { color:var(--text-primary); }
  .social-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  .social-card { background:#161b22; border:1px solid var(--border); border-radius:12px; padding:32px; }
  .company-logo { font-size:22px; font-weight:800; margin-bottom:16px; color:var(--text-primary); }
  .social-stat { font-size:40px; font-weight:800; color:var(--white); margin-bottom:8px; }
  .social-desc { color:var(--text-secondary); font-size:15px; line-height:1.6; }
  .testimonial {
    background:#161b22; border:1px solid var(--border);
    border-radius:12px; padding:32px; grid-column: span 2;
  }
  .quote-mark { font-size:48px; color:var(--blue-glow); line-height:1; margin-bottom:8px; }
  .testimonial blockquote { font-size:18px; line-height:1.7; color:var(--text-primary); font-style:italic; margin-bottom:24px; }
  .testimonial cite { color:var(--text-muted); font-size:14px; font-style:normal; }

  /* BEGINNER SECTION */
  .beginner-section { padding: 100px 60px; max-width:1200px; margin:0 auto; }
  .beginner-section-header { display:flex; align-items:center; gap:16px; margin-bottom:16px; }
  .beginner-section-header h2 { font-size:clamp(24px,3.5vw,40px); font-weight:800; letter-spacing:-.5px; }
  .beginner-section-header h2 strong { color:var(--beginner-green); }
  .beginner-section > .sub { color:var(--text-secondary); font-size:16px; max-width:560px; line-height:1.7; margin-bottom:48px; }
  .beginner-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .beginner-step {
    background:#161b22; border:1px solid var(--beginner-green-border);
    border-radius:12px; padding:28px; position:relative; overflow:hidden;
    transition: transform .2s, border-color .2s;
  }
  .beginner-step:hover { transform:translateY(-3px); border-color:var(--beginner-green); }
  .beginner-step::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background: linear-gradient(to right, var(--beginner-green), transparent);
  }
  .step-number {
    width:32px; height:32px; border-radius:50%;
    background: var(--beginner-green-bg); border:1px solid var(--beginner-green-border);
    color:var(--beginner-green); font-size:13px; font-weight:800;
    display:flex; align-items:center; justify-content:center; margin-bottom:16px;
  }
  .beginner-step h3 { font-size:16px; font-weight:700; margin-bottom:10px; color:var(--text-primary); }
  .beginner-step p { font-size:13px; color:var(--text-secondary); line-height:1.6; }
  .beginner-step-link {
    display:inline-flex; align-items:center; gap:4px; margin-top:14px;
    color:var(--beginner-green); font-size:13px; font-weight:600; text-decoration:none;
  }
  .beginner-step-link:hover { text-decoration:underline; }
  .beginner-step-link::after { content:'›'; font-size:16px; }

  /* FINAL CTA */
  .final-cta { text-align:center; padding:120px 24px; max-width:800px; margin:0 auto; }
  .final-cta h2 { font-size:clamp(28px,4vw,48px); font-weight:800; margin-bottom:20px; letter-spacing:-1px; line-height:1.2; }
  .final-cta > p { color:var(--text-secondary); font-size:18px; line-height:1.6; margin-bottom:40px; }
  .final-cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
  .citation { font-size:12px; color:var(--text-muted); margin-top:40px; }
  .citation a { color:var(--text-muted); text-decoration:underline; }

  /* FOOTER */
  footer { background:#010409; border-top:1px solid var(--border); padding:40px 60px; }
  .footer-inner { max-width:1200px; margin:0 auto; }
  .footer-grid { display:grid; grid-template-columns: repeat(5, 1fr); gap:32px; margin-bottom:40px; }
  .footer-logo { display:flex; align-items:center; gap:8px; margin-bottom:16px; }
  .footer-logo svg { width:28px; height:28px; fill:var(--text-secondary); }
  .footer-col h4 { font-size:12px; font-weight:600; color:var(--text-primary); margin-bottom:12px; letter-spacing:.04em; }
  .footer-col ul { list-style:none; }
  .footer-col li { margin-bottom:8px; }
  .footer-col a { color:var(--text-secondary); text-decoration:none; font-size:13px; }
  .footer-col a:hover { color:var(--text-primary); text-decoration:underline; }
  .footer-bottom {
    border-top:1px solid var(--border); padding-top:24px;
    display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;
  }
  .footer-bottom p { font-size:12px; color:var(--text-muted); }
  .footer-bottom-links { display:flex; gap:20px; }
  .footer-bottom-links a { color:var(--text-muted); text-decoration:none; font-size:12px; }
  .footer-bottom-links a:hover { color:var(--text-primary); }

  .glow-line { height:1px; background: linear-gradient(to right, transparent, var(--blue-glow), transparent); opacity:.4; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(30px); }
    to { opacity:1; transform:translateY(0); }
  }

  /* HAMBURGER BUTTON */
  .hamburger {
    display: none;
    flex-direction: column; justify-content: center; align-items: center;
    gap: 5px; width: 36px; height: 36px; background: none; border: none;
    cursor: pointer; padding: 4px; border-radius: 6px;
    transition: background .15s;
  }
  .hamburger:hover { background: rgba(255,255,255,.06); }
  .hamburger span {
    display: block; width: 20px; height: 2px;
    background: var(--text-primary); border-radius: 2px;
    transition: transform .25s ease, opacity .25s ease, width .25s ease;
    transform-origin: center;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* MOBILE DRAWER */
  .mobile-menu {
    position: fixed; top: 62px; left: 0; right: 0; bottom: 0;
    background: rgba(1,4,9,0.98); backdrop-filter: blur(16px);
    z-index: 999; overflow-y: auto; padding: 16px 0 40px;
    border-top: 1px solid var(--border);
  }
  .mobile-menu-section {
    padding: 8px 0;
    border-bottom: 1px solid rgba(48,54,61,0.5);
  }
  .mobile-menu-section:last-child { border-bottom: none; }
  .mobile-menu-label {
    font-size: 11px; font-weight: 600; color: var(--text-muted);
    letter-spacing: .08em; text-transform: uppercase;
    padding: 8px 24px 4px;
  }
  .mobile-menu-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 24px; text-decoration: none;
    color: var(--text-primary); font-size: 15px; font-weight: 500;
    transition: background .12s;
  }
  .mobile-menu-item:hover { background: rgba(255,255,255,.04); }
  .mobile-menu-item-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(255,255,255,.06); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
  }
  .mobile-menu-item-text { flex: 1; }
  .mobile-menu-item-desc { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .mobile-menu-plain {
    display: block; padding: 13px 24px;
    color: var(--text-primary); font-size: 15px; font-weight: 500;
    text-decoration: none; transition: background .12s;
  }
  .mobile-menu-plain:hover { background: rgba(255,255,255,.04); }
  .mobile-menu-actions {
    display: flex; flex-direction: column; gap: 10px; padding: 20px 24px 0;
  }
  .mobile-btn-signin {
    display: block; text-align: center; padding: 11px; border-radius: 6px;
    border: 1px solid var(--border); color: var(--text-primary);
    font-size: 14px; font-weight: 600; text-decoration: none;
    transition: background .15s;
  }
  .mobile-btn-signin:hover { background: rgba(255,255,255,.06); }
  .mobile-btn-signup {
    display: block; text-align: center; padding: 11px; border-radius: 6px;
    background: var(--white); color: var(--bg-dark);
    font-size: 14px; font-weight: 700; text-decoration: none;
    transition: background .15s;
  }
  .mobile-btn-signup:hover { background: #d0d7de; }

  @media(max-width:768px) {
    .nav-links { display:none; }
    .nav-search { display: none; }
    .hamburger { display: flex; }
    .copilot-section, .project-section { grid-template-columns:1fr; padding:60px 24px; gap:40px; }
    .prod-grid, .social-grid { grid-template-columns:1fr; }
    .productivity, .social-section, .beginner-section { padding:60px 24px; }
    .footer-grid { grid-template-columns:1fr 1fr; }
    footer { padding:40px 24px; }
    .testimonial { grid-column:span 1; }
    .beginner-steps { grid-template-columns:1fr; }
  }
`

export default styles
