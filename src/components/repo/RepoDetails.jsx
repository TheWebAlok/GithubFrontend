import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Sora:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Sora', sans-serif;
    background: #0d1117;
    color: #e6edf3;
    min-height: 100vh;
  }

  .rd-page {
    min-height: 100vh;
    background: #0d1117;
    padding: 0 0 60px;
  }

  /* ── Top bar ── */
  .rd-topbar {
    background: #161b22;
    border-bottom: 1px solid #21262d;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .rd-topbar-logo {
    width: 28px; height: 28px;
    background: #58a6ff;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 600; color: #0d1117;
    flex-shrink: 0;
  }
  .rd-breadcrumb {
    display: flex; align-items: center; gap: 4px;
    font-size: 13px; color: #8b949e;
    overflow: hidden;
  }
  .rd-breadcrumb a {
    color: #58a6ff; text-decoration: none; white-space: nowrap;
    font-family: 'JetBrains Mono', monospace;
  }
  .rd-breadcrumb a:hover { text-decoration: underline; }
  .rd-breadcrumb span { color: #484f58; }
  .rd-breadcrumb .rd-repo-crumb {
    color: #e6edf3; font-family: 'JetBrains Mono', monospace;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ── Main container ── */
  .rd-container {
    max-width: 960px;
    margin: 0 auto;
    padding: 28px 20px 0;
  }

  /* ── Repo header card ── */
  .rd-hero {
    background: #161b22;
    border: 1px solid #21262d;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
  }
  .rd-hero-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .rd-title-group { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .rd-repo-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .rd-title-text h1 {
    font-size: 20px; font-weight: 600;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.3;
  }
  .rd-title-text h1 .owner { color: #8b949e; font-weight: 400; }
  .rd-title-text h1 .slash { color: #484f58; margin: 0 4px; }
  .rd-title-text h1 .name { color: #58a6ff; }
  .rd-visibility-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid;
    margin-top: 4px;
  }
  .rd-visibility-badge.public {
    color: #3fb950; border-color: #238636; background: rgba(35,134,54,0.1);
  }
  .rd-visibility-badge.private {
    color: #f0883e; border-color: #9e6a03; background: rgba(158,106,3,0.1);
  }

  /* ── Action buttons ── */
  .rd-actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
  .rd-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 16px;
    border-radius: 8px;
    font-size: 13px; font-weight: 500;
    font-family: 'Sora', sans-serif;
    border: 1px solid;
    cursor: pointer;
    transition: all 0.15s ease;
    text-decoration: none;
    white-space: nowrap;
  }
  .rd-btn-edit {
    background: #21262d; border-color: #30363d; color: #e6edf3;
  }
  .rd-btn-edit:hover { background: #30363d; border-color: #484f58; }
  .rd-btn-delete {
    background: rgba(248,81,73,0.1); border-color: #da3633; color: #f85149;
  }
  .rd-btn-delete:hover { background: #da3633; color: #fff; }
  .rd-btn-delete.confirming {
    background: #da3633; color: #fff; animation: pulse 0.4s ease;
  }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }

  /* ── Description + stats ── */
  .rd-description {
    margin-top: 16px;
    font-size: 14px; color: #8b949e; line-height: 1.6;
  }
  .rd-stats-row {
    display: flex; flex-wrap: wrap; gap: 16px;
    margin-top: 16px; padding-top: 16px;
    border-top: 1px solid #21262d;
  }
  .rd-stat {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; color: #8b949e;
  }
  .rd-stat-icon { font-size: 14px; }
  .rd-stat strong { color: #e6edf3; font-weight: 500; }

  /* ── Metric cards row ── */
  .rd-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }
  .rd-metric {
    background: #161b22;
    border: 1px solid #21262d;
    border-radius: 10px;
    padding: 14px 16px;
  }
  .rd-metric-label {
    font-size: 11px; color: #8b949e; text-transform: uppercase;
    letter-spacing: 0.04em; margin-bottom: 6px;
  }
  .rd-metric-value {
    font-size: 22px; font-weight: 600;
    font-family: 'JetBrains Mono', monospace;
    color: #e6edf3;
  }
  .rd-metric-sub {
    font-size: 11px; color: #484f58; margin-top: 2px;
  }

  /* ── Sections ── */
  .rd-section {
    background: #161b22;
    border: 1px solid #21262d;
    border-radius: 12px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  .rd-section-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid #21262d;
    cursor: pointer;
    user-select: none;
    transition: background 0.12s;
  }
  .rd-section-header:hover { background: #1c2128; }
  .rd-section-title {
    display: flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 600; color: #e6edf3;
  }
  .rd-section-count {
    background: #21262d; color: #8b949e;
    font-size: 11px; padding: 2px 7px; border-radius: 20px;
    font-family: 'JetBrains Mono', monospace;
  }
  .rd-section-chevron {
    color: #484f58; font-size: 12px;
    transition: transform 0.2s ease;
  }
  .rd-section-chevron.open { transform: rotate(180deg); }
  .rd-section-body { padding: 0; }

  /* ── File list ── */
  .rd-file-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 20px;
    border-bottom: 1px solid #21262d;
    transition: background 0.1s;
  }
  .rd-file-item:last-child { border-bottom: none; }
  .rd-file-item:hover { background: #1c2128; }
  .rd-file-icon { font-size: 15px; flex-shrink: 0; }
  .rd-file-name {
    font-size: 13px; color: #58a6ff;
    font-family: 'JetBrains Mono', monospace;
    flex: 1; min-width: 0;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .rd-file-date { font-size: 12px; color: #484f58; white-space: nowrap; flex-shrink: 0; }

  /* ── Content section ── */
  .rd-content-body { padding: 16px 20px; }
  .rd-content-line {
    font-size: 13px; color: #c9d1d9; line-height: 1.8;
    font-family: 'JetBrains Mono', monospace;
    padding: 2px 0;
  }
  .rd-content-line:nth-child(odd) { color: #8b949e; }

  /* ── Empty state ── */
  .rd-empty {
    padding: 32px 20px;
    text-align: center;
    color: #484f58;
    font-size: 13px;
  }
  .rd-empty-icon { font-size: 28px; margin-bottom: 8px; }

  /* ── Issues section ── */
  .rd-issue-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 20px;
    border-bottom: 1px solid #21262d;
  }
  .rd-issue-item:last-child { border-bottom: none; }
  .rd-issue-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #3fb950; flex-shrink: 0; margin-top: 5px;
  }
  .rd-issue-dot.closed { background: #8957e5; }
  .rd-issue-text { font-size: 13px; color: #e6edf3; }
  .rd-issue-meta { font-size: 11px; color: #484f58; margin-top: 2px; }

  /* ── Delete confirm modal ── */
  .rd-modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeIn 0.15s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .rd-modal {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 14px;
    padding: 28px;
    width: 100%; max-width: 380px;
    animation: slideUp 0.2s ease;
  }
  @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  .rd-modal h3 { font-size: 16px; font-weight: 600; color: #f85149; margin-bottom: 10px; }
  .rd-modal p { font-size: 13px; color: #8b949e; line-height: 1.6; margin-bottom: 20px; }
  .rd-modal p strong { color: #e6edf3; font-family: 'JetBrains Mono', monospace; }
  .rd-modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
  .rd-btn-cancel {
    background: #21262d; border-color: #30363d; color: #e6edf3;
  }
  .rd-btn-cancel:hover { background: #30363d; }
  .rd-btn-confirm-delete {
    background: #da3633; border-color: #f85149; color: #fff;
  }
  .rd-btn-confirm-delete:hover { background: #b91c1c; }

  /* ── Loading skeleton ── */
  .rd-skeleton {
    background: #161b22; border: 1px solid #21262d;
    border-radius: 12px; padding: 24px; margin-bottom: 20px;
  }
  .rd-skel-line {
    background: linear-gradient(90deg, #21262d 25%, #2d333b 50%, #21262d 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px; height: 14px; margin-bottom: 10px;
  }
  @keyframes shimmer {
    0%{background-position:200% 0} 100%{background-position:-200% 0}
  }
  .rd-skel-line.w-60 { width: 60%; }
  .rd-skel-line.w-40 { width: 40%; }
  .rd-skel-line.w-80 { width: 80%; }
  .rd-skel-title { height: 22px; width: 50%; margin-bottom: 16px; }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .rd-topbar { padding: 10px 14px; }
    .rd-container { padding: 16px 14px 0; }
    .rd-hero { padding: 16px; }
    .rd-hero-top { flex-direction: column; }
    .rd-actions { width: 100%; }
    .rd-btn { flex: 1; justify-content: center; }
    .rd-metrics { grid-template-columns: repeat(2, 1fr); }
    .rd-section-header { padding: 12px 14px; }
    .rd-file-item, .rd-issue-item { padding: 10px 14px; }
    .rd-content-body { padding: 12px 14px; }
    .rd-title-text h1 { font-size: 16px; }
  }
  @media (max-width: 380px) {
    .rd-metrics { grid-template-columns: 1fr 1fr; }
    .rd-metric-value { font-size: 18px; }
  }
`;

const CollapseSection = ({ title, icon, count, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rd-section">
      <div className="rd-section-header" onClick={() => setOpen(o => !o)} role="button" aria-expanded={open}>
        <div className="rd-section-title">
          <span>{icon}</span>
          {title}
          {count !== undefined && (
            <span className="rd-section-count">{count}</span>
          )}
        </div>
        <span className={`rd-section-chevron ${open ? "open" : ""}`}>▼</span>
      </div>
      {open && <div className="rd-section-body">{children}</div>}
    </div>
  );
};

const SkeletonLoader = () => (
  <div>
    <div className="rd-skeleton">
      <div className="rd-skel-line rd-skel-title" />
      <div className="rd-skel-line w-80" />
      <div className="rd-skel-line w-60" />
      <div className="rd-skel-line w-40" style={{ marginTop: 20 }} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 12, marginBottom: 20 }}>
      {[1, 2, 3].map(i => (
        <div key={i} className="rd-skeleton" style={{ padding: "14px 16px" }}>
          <div className="rd-skel-line w-60" style={{ height: 10 }} />
          <div className="rd-skel-line w-40" style={{ height: 22, marginTop: 8 }} />
        </div>
      ))}
    </div>
  </div>
);

const RepoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`https://github-backend-clone.onrender.com/repo/${id}`)
      .then(res => res.json())
      .then(data => setRepo(data))
      .catch(() => toast.error("Failed to load repository"));
  }, [id]);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`https://github-backend-clone.onrender.com/repo/delete/${id}`, { method: "DELETE" });
      toast.success("Repository deleted successfully");
      setShowDeleteModal(false);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Delete failed. Please try again.",error);
      setDeleting(false);
    }
  };

  const formatDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="rd-page">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          toastStyle={{ background: "#161b22", border: "1px solid #30363d", color: "#e6edf3" }}
        />

        {/* Sticky top bar */}
        <div className="rd-topbar">
          <div className="rd-topbar-logo">G</div>
          <div className="rd-breadcrumb">
            <a href="/dashboard" onClick={e => { e.preventDefault(); navigate("/dashboard"); }}>
              {repo?.owner?.username || "home"}
            </a>
            <span>/</span>
            <span className="rd-repo-crumb">{repo?.name || "repository"}</span>
          </div>
        </div>

        <div className="rd-container">
          {!repo ? (
            <SkeletonLoader />
          ) : (
            <>
              {/* Hero card */}
              <div className="rd-hero">
                <div className="rd-hero-top">
                  <div className="rd-title-group">
                    <div className="rd-repo-icon">📦</div>
                    <div className="rd-title-text">
                      <h1>
                        <span className="owner">{repo.owner?.username}</span>
                        <span className="slash">/</span>
                        <span className="name">{repo.name}</span>
                      </h1>
                      <span className={`rd-visibility-badge ${repo.visibility ? "public" : "private"}`}>
                        {repo.visibility ? "🌐 Public" : "🔒 Private"}
                      </span>
                    </div>
                  </div>

                  <div className="rd-actions">
                    <button className="rd-btn rd-btn-edit" onClick={() => navigate(`/repo/edit/${repo._id}`)}>
                      ✏️ Edit
                    </button>
                    <button className="rd-btn rd-btn-delete" onClick={() => setShowDeleteModal(true)}>
                      🗑 Delete
                    </button>
                  </div>
                </div>

                {repo.description && (
                  <p className="rd-description">{repo.description}</p>
                )}

                <div className="rd-stats-row">
                  <div className="rd-stat">
                    <span className="rd-stat-icon">📅</span>
                    Created <strong>{formatDate(repo.createdAt)}</strong>
                  </div>
                  <div className="rd-stat">
                    <span className="rd-stat-icon">📂</span>
                    <strong>{repo.files?.length || 0}</strong> files
                  </div>
                  <div className="rd-stat">
                    <span className="rd-stat-icon">🐛</span>
                    <strong>{repo.issues?.length || 0}</strong> issues
                  </div>
                </div>
              </div>

              {/* Metric cards */}
              <div className="rd-metrics">
                <div className="rd-metric">
                  <div className="rd-metric-label">Files</div>
                  <div className="rd-metric-value">{repo.files?.length || 0}</div>
                  <div className="rd-metric-sub">uploaded</div>
                </div>
                <div className="rd-metric">
                  <div className="rd-metric-label">Issues</div>
                  <div className="rd-metric-value">{repo.issues?.length || 0}</div>
                  <div className="rd-metric-sub">total</div>
                </div>
                <div className="rd-metric">
                  <div className="rd-metric-label">Lines</div>
                  <div className="rd-metric-value">{repo.content?.length || 0}</div>
                  <div className="rd-metric-sub">of content</div>
                </div>
              </div>

              {/* Files Section */}
              <CollapseSection
                title="Files"
                icon="📁"
                count={repo.files?.length || 0}
                defaultOpen
              >
                {!repo.files?.length ? (
                  <div className="rd-empty">
                    <div className="rd-empty-icon">📭</div>
                    No files uploaded yet
                  </div>
                ) : (
                  repo.files.map((file, index) => (
                    <div key={index} className="rd-file-item">
                      <span className="rd-file-icon">📄</span>
                      <span className="rd-file-name">{file.filename}</span>
                      <span className="rd-file-date">{formatDate(file.uploadedAt)}</span>
                    </div>
                  ))
                )}
              </CollapseSection>

              {/* Issues Section */}
              {repo.issues?.length > 0 && (
                <CollapseSection
                  title="Issues"
                  icon="🐛"
                  count={repo.issues.length}
                  defaultOpen={false}
                >
                  {repo.issues.map((issue, idx) => (
                    <div key={idx} className="rd-issue-item">
                      <div className={`rd-issue-dot ${issue.status === "closed" ? "closed" : ""}`} />
                      <div>
                        <div className="rd-issue-text">{typeof issue === "string" ? issue : issue.title || `Issue #${idx + 1}`}</div>
                        {issue.createdAt && <div className="rd-issue-meta">Opened {formatDate(issue.createdAt)}</div>}
                      </div>
                    </div>
                  ))}
                </CollapseSection>
              )}

              {/* Content Section */}
              {repo.content?.length > 0 && (
                <CollapseSection
                  title="Content"
                  icon="📝"
                  count={repo.content.length}
                  defaultOpen={false}
                >
                  <div className="rd-content-body">
                    {repo.content.map((line, index) => (
                      <div key={index} className="rd-content-line">{line}</div>
                    ))}
                  </div>
                </CollapseSection>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <div className="rd-modal-overlay" onClick={() => !deleting && setShowDeleteModal(false)}>
          <div className="rd-modal" onClick={e => e.stopPropagation()}>
            <h3>⚠️ Delete Repository</h3>
            <p>
              This will permanently delete <strong>{repo?.name}</strong> and all its data.
              This action <strong style={{ color: "#f85149" }}>cannot be undone</strong>.
            </p>
            <div className="rd-modal-actions">
              <button
                className="rd-btn rd-btn-cancel"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="rd-btn rd-btn-confirm-delete"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Delete Repository"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RepoDetails;